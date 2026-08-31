import React, { useState, useEffect, useRef } from "react";
import { Send, Users, MessageSquare, Trash2, Reply, X, Check, CheckCheck } from "lucide-react";
import { triggerBrowserNotification } from "../../App"; 
import { toast } from "../../utils/toast";
import { addDocument, updateDocument, deleteDocument, setDocument, COLLECTIONS } from "../../services/firestoreSync";
import { db } from "../../services/firebase";
import { collection, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { UserAvatar } from "../common/ui";

// Helper to sort and create channel IDs (e.g. user1_user2)
function getChannelId(id1, id2) {
  if (!id1 || !id2) return null;
  return [id1, id2].sort().join("_");
}

const Messages = ({ users = [], currentUser, onUnreadCountChange }) => {
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [typingState, setTypingState] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});
  const [replyTo, setReplyTo] = useState(null);
  
  // Fake presence state (we will simulate presence based on lastActive or just randomly for now, ideally this would be real DB presence)
  const [presenceState, setPresenceState] = useState({});

  const chatContainerRef = useRef(null);
  const lastMsgCountRef = useRef(0);

  // Subscribe to ALL messages where current user is a participant
  useEffect(() => {
    if (!currentUser?.identifier) return;

    const q = query(
      collection(db, COLLECTIONS.MESSAGES),
      where('participants', 'array-contains', currentUser.identifier)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = [];
      snapshot.forEach((docSnap) => {
        fetchedMessages.push({ _firestoreId: docSnap.id, ...docSnap.data() });
      });
      
      // Sort by timestamp manually since we can't easily compound order by with array-contains in all DBs without index
      fetchedMessages.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Presence simulation & typing via a unified 'presence' document or just simple timeouts
  // For production, consider using Firebase Realtime Database for presence.
  useEffect(() => {
    if (!currentUser) return;
    
    // Simulate all users as online for demo purposes since presence in Firestore is expensive
    const pState = {};
    users.forEach(u => pState[u.identifier] = { status: 'online' });
    setPresenceState(pState);
    
    // Fake typing listener based on a global typing document
    const typingUnsub = onSnapshot(collection(db, 'typing_indicators'), (snap) => {
      const typingData = {};
      snap.forEach(d => {
        const data = d.data();
        if (data.isTyping && Date.now() - data.timestamp < 3000) {
          typingData[data.fromId] = data.channelId;
        }
      });
      setTypingState(typingData);
    });
    return () => typingUnsub();
  }, [currentUser, users]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, activeUser]);

  // Calculate unread counts
  useEffect(() => {
    if (!currentUser) return;

    const counts = {};
    users.forEach((u) => {
      if (u.identifier === currentUser.identifier) return;
      
      const chan = getChannelId(currentUser.identifier, u.identifier);
      const chanMsgs = messages.filter((m) => m.channelId === chan);
      
      const unread = chanMsgs.filter(
        (m) => m.fromId === u.identifier && !(m.readBy || []).includes(currentUser.identifier)
      ).length;
      
      counts[u.identifier] = unread;
    });

    setUnreadCounts(counts);

    const totalUnread = Object.values(counts).reduce((sum, val) => sum + val, 0);
    if (onUnreadCountChange) {
      onUnreadCountChange(totalUnread);
    }
  }, [messages, currentUser, users, onUnreadCountChange]);

  // Notifications for new incoming messages
  useEffect(() => {
    if (!currentUser || !messages.length) return;

    if (messages.length > lastMsgCountRef.current) {
      const newMsgs = messages.slice(lastMsgCountRef.current);
      newMsgs.forEach((msg) => {
        // If it's sent to me and I didn't send it
        if (msg.fromId !== currentUser.identifier && !(msg.readBy || []).includes(currentUser.identifier)) {
          // If we aren't currently looking at this chat
          if (activeUser?.identifier !== msg.fromId) {
            const sender = users.find(u => u.identifier === msg.fromId);
            const title = `Message from ${sender?.name || msg.fromId}`;
            const body = msg.text ? (msg.text.substring(0, 100) + (msg.text.length > 100 ? "..." : "")) : "Sent an image";
            
            toast.info(title + ": " + body);
            if (triggerBrowserNotification) {
              triggerBrowserNotification(title, { body, tag: "chat-message" });
            }
          }
        }
      });
    }
    lastMsgCountRef.current = messages.length;
  }, [messages, currentUser, activeUser, users]);

  // Mark active chat messages as read
  useEffect(() => {
    if (!currentUser || !activeUser || !messages.length) return;

    const activeChan = getChannelId(currentUser.identifier, activeUser.identifier);
    const unread = messages.filter(
      (m) => m.channelId === activeChan && m.fromId === activeUser.identifier && !(m.readBy || []).includes(currentUser.identifier)
    );

    if (unread.length) {
      unread.forEach(m => {
        const readBy = m.readBy || [];
        updateDocument(COLLECTIONS.MESSAGES, m._firestoreId, {
          readBy: [...readBy, currentUser.identifier]
        });
      });
    }
  }, [messages, currentUser, activeUser]);

  const sendTypingIndicator = (isTyping) => {
    if (!activeUser || !currentUser) return;
    const activeChan = getChannelId(currentUser.identifier, activeUser.identifier);
    // Best effort typing indicator — use setDocument (merge:true) so it creates the doc
    // if it doesn't exist yet (updateDoc would throw on a missing document)
    try {
      setDocument('typing_indicators', currentUser.identifier, {
        fromId: currentUser.identifier,
        channelId: activeChan,
        isTyping,
        timestamp: Date.now()
      }, true);
    } catch(e) {}
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeUser || !currentUser) return;

    const activeChan = getChannelId(currentUser.identifier, activeUser.identifier);
    
    const newMsg = {
      channelId: activeChan,
      participants: [currentUser.identifier, activeUser.identifier],
      fromId: currentUser.identifier,
      toId: activeUser.identifier,
      text: inputText.trim(),
      // IMPORTANT: Keep as Date.now() (plain ms number). The firestore.rules deletion window
      // rule does arithmetic: (request.time.toMillis() - resource.data.timestamp) < 900000.
      // Using serverTimestamp() here would break that rule since it returns a Timestamp object.
      timestamp: Date.now(),
      readBy: [currentUser.identifier], // I've read my own message
      replyTo: replyTo ? {
        id: replyTo._firestoreId,
        text: replyTo.text,
        fromId: replyTo.fromId
      } : null
    };

    setInputText("");
    setReplyTo(null);
    sendTypingIndicator(false);
    
    try {
      await addDocument(COLLECTIONS.MESSAGES, newMsg);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    }
  };

  const handleDeleteMessage = async (msg) => {
    const diffMinutes = (Date.now() - (msg.timestamp || 0)) / 1000 / 60;
    if (msg.fromId !== currentUser.identifier) {
      toast.error("You can only delete your own messages");
      return;
    }
    if (diffMinutes > 15) {
      toast.error("Messages can only be deleted within 15 minutes of sending");
      return;
    }
    
    try {
      await deleteDocument(COLLECTIONS.MESSAGES, msg._firestoreId);
      toast.success("Message deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete message");
    }
  };

  // Active channel messages
  const activeChan = activeUser ? getChannelId(currentUser?.identifier, activeUser?.identifier) : null;
  const activeMessages = messages.filter(m => m.channelId === activeChan);

  return (
    <div className="flex h-[calc(100vh-140px)] border border-outline-variant bg-surface-container rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,218,243,0.05)]">
      {/* Sidebar Employees List */}
      <aside className="w-72 border-r border-outline-variant/50 p-4 bg-surface-container-low/50 flex flex-col">
        <h3 className="font-bold text-on-surface text-sm mb-4 flex items-center">
          <Users size={16} className="mr-2 text-on-surface-variant" />
          Employees
        </h3>
        <ul className="space-y-2 flex-1 overflow-y-auto custom-scrollbar">
          {users
            .filter((u) => u.identifier !== currentUser?.identifier)
            .map((u) => {
              const isSelected = activeUser?.identifier === u.identifier;
              const isOnline = presenceState[u.identifier]?.status === "online";
              const unreadCount = unreadCounts[u.identifier] || 0;

              return (
                <li key={u.identifier}>
                  <button
                    onClick={() => {
                      setActiveUser(u);
                    }}
                    className={`w-full text-left p-3 rounded-2xl flex items-center justify-between transition-all ${
                      isSelected ? "bg-primary text-on-primary shadow-[0_4px_25px_rgba(0,218,243,0.1)] " : "hover:bg-surface-container border border-transparent hover:border-outline-variant/50 text-on-surface"
                    }`}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <UserAvatar 
                        user={u} 
                        size="sm" 
                        showStatus 
                        status={isOnline ? 'active' : null} 
                      />
                      <div className="truncate text-left">
                        <div className={`text-xs font-bold leading-tight ${isSelected ? "text-on-surface" : "text-on-surface"}`}>
                          {u.name || u.identifier}
                        </div>
                        <div className={`text-[9px] mt-0.5 ${isSelected ? "text-primary font-bold" : "text-on-surface-variant font-semibold"}`}>
                          {u.role || "Employee"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      {unreadCount > 0 && (
                        <span className="bg-error text-on-error text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
        </ul>
      </aside>

      {/* Chat Conversation */}
      <section className="flex-1 flex flex-col bg-surface-container h-full justify-between">
        {activeUser ? (
          <>
            {/* Active User Header */}
            <div className="p-4 border-b border-outline-variant/50 flex items-center justify-between bg-surface-container-low/20 shadow-sm z-10">
              <div className="flex items-center space-x-3">
                <UserAvatar 
                  user={activeUser} 
                  size="md" 
                  showStatus 
                  status={presenceState[activeUser.identifier]?.status === "online" ? 'active' : null} 
                />
                <div>
                  <h4 className="font-extrabold text-on-surface text-sm">
                    {activeUser.name || activeUser.identifier}
                  </h4>
                  <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">
                    {activeUser.role || "Employee"}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    presenceState[activeUser.identifier]?.status === "online"
                      ? "bg-secondary text-on-secondary"
                      : "bg-slate-400"
                  }`}
                />
                <span className="text-[10px] text-on-surface-variant font-semibold uppercase">
                  {presenceState[activeUser.identifier]?.status === "online" ? "Online" : "Offline"}
                </span>
              </div>
            </div>

            {/* Messages Pane */}
            <div
              ref={chatContainerRef}
              className="flex-1 p-6 overflow-y-auto space-y-4 bg-surface-container-lowest custom-scrollbar"
            >
              {activeMessages.length > 0 ? (
                activeMessages.map((msg) => {
                  const isMe = msg.fromId === currentUser?.identifier;
                  const msgDate = new Date(msg.timestamp || Date.now());
                  const isRead = (msg.readBy || []).includes(activeUser.identifier);

                  return (
                    <div key={msg._firestoreId} className={`flex flex-col group ${isMe ? "items-end" : "items-start"}`}>
                      
                      {/* Reply Block Preview */}
                      {msg.replyTo && (
                        <div className={`text-[10px] bg-surface-container border-l-2 border-primary/50 text-on-surface-variant p-2 rounded-lg mb-1 opacity-80 flex items-center space-x-2 max-w-sm ${isMe ? "mr-1" : "ml-1"}`}>
                          <Reply size={10} />
                          <span className="truncate">{msg.replyTo.text || "Image"}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        {/* Actions (Delete/Reply) */}
                        {isMe && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                            <button onClick={() => setReplyTo(msg)} className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full" title="Reply">
                              <Reply size={14} />
                            </button>
                            <button onClick={() => handleDeleteMessage(msg)} className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full" title="Delete (within 15m)">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}

                        <div
                          className={`flex flex-col max-w-lg p-3.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border ${
                            isMe
                              ? "bg-primary text-on-primary border-primary rounded-tr-none"
                              : "bg-surface-container border-outline-variant/50 text-on-surface rounded-tl-none"
                          }`}
                        >
                          {msg.text && (
                            <div className="text-xs font-medium leading-relaxed break-words whitespace-pre-wrap">
                              {msg.text}
                            </div>
                          )}

                          <div
                            className={`flex items-center justify-end mt-1.5 text-[9px] font-bold space-x-1 ${
                              isMe ? "text-primary-container/80" : "text-on-surface-variant"
                            }`}
                          >
                            <span>
                              {msgDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                            
                            {/* Read Receipts (WhatsApp Style) */}
                            {isMe && (
                              <span className="ml-1 flex items-center">
                                {isRead ? <CheckCheck size={12} className="text-blue-300" /> : <Check size={12} />}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions for received msgs */}
                        {!isMe && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                            <button onClick={() => setReplyTo(msg)} className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full" title="Reply">
                              <Reply size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-on-surface-variant">
                  <MessageSquare size={40} className="mb-3 opacity-20" />
                  <p className="text-xs font-semibold">Start the conversation</p>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="border-t border-outline-variant/50 bg-surface-container flex flex-col">
              
              {/* Reply Preview */}
              {replyTo && (
                <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant/50 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-primary flex items-center"><Reply size={10} className="mr-1"/> Replying to {replyTo.fromId === currentUser.identifier ? 'yourself' : 'message'}</span>
                    <span className="text-xs text-on-surface-variant truncate max-w-sm">{replyTo.text || "Image"}</span>
                  </div>
                  <button onClick={() => setReplyTo(null)} className="text-on-surface-variant hover:text-error p-1">
                    <X size={14} />
                  </button>
                </div>
              )}

              <div className="p-3 flex items-center space-x-2">
                <textarea
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    sendTypingIndicator(!!e.target.value);
                  }}
                  onBlur={() => sendTypingIndicator(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={1}
                  placeholder={`Message ${activeUser.name || activeUser.identifier}...`}
                  className="flex-1 p-3 bg-surface-container-low border border-outline-variant rounded-xl text-sm font-medium focus:outline-none focus:border-primary resize-none custom-scrollbar max-h-32"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="p-3 bg-primary text-on-primary hover:bg-primary/90 disabled:bg-surface-container-high disabled:text-on-surface-variant rounded-xl transition-all shadow-sm"
                >
                  <Send size={18} className={inputText.trim() ? "translate-x-0.5" : ""} />
                </button>
              </div>
              
              {/* Typing indicator */}
              <div className="h-4 px-16 pb-2 text-[9px] text-on-surface-variant italic font-semibold">
                {typingState[activeUser.identifier] === activeChan && (
                  <span className="animate-pulse">{activeUser.name || activeUser.identifier} is typing...</span>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-on-surface-variant">
            <MessageSquare size={48} className="mb-4 opacity-20 text-primary" />
            <p className="text-sm font-bold text-on-surface">Your Messages</p>
            <p className="text-xs mt-1 text-on-surface-variant">Select a team member from the left to start chatting.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Messages;
