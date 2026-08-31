import React, { useState } from 'react';
import { 
  Search, Shield, User, Mail, Briefcase, Plus, Check, X, Trash2, 
  KeyRound, Clock, Edit2, Save, ChevronRight, Phone, ShieldCheck,
  UserCheck, AlertCircle
} from 'lucide-react';
import Card from '../common/Card';
import DeleteModal from '../common/DeleteModal';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { toast } from '../../utils/toast';
import { subscribeToCollection, COLLECTIONS } from '../../services/firestoreSync';
import { PageHeader, FilterBar, StatusBadge, ModalWrapper } from '../common/ui';

export default function AgentDatabase({ users = [], setUsers, pendingUsers = [], setPendingUsers, currentUser, onApprove, onReject }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [auditLogs, setAuditLogs] = useState([]);

  // Invite Modal State (Item 18)
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    identifier: '',
    contactNumber: '',
    role: 'Sales'
  });

  React.useEffect(() => {
    const unsub = subscribeToCollection(COLLECTIONS.AUDIT_LOG, setAuditLogs);
    return () => unsub();
  }, []);

  const isAdmin = currentUser?.role === 'Admin';

  const getRoleCategory = (role) => {
    const r = role?.toLowerCase() || '';
    if (r === 'partner') return 'Partners';
    if (r === 'customer') return 'Customers';
    return 'Employees';
  };

  const employeeCount = users.filter(u => getRoleCategory(u.role) === 'Employees').length;
  const partnerCount = users.filter(u => getRoleCategory(u.role) === 'Partners').length;
  const customerCount = users.filter(u => getRoleCategory(u.role) === 'Customers').length;

  const filteredUsers = users.filter(u => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = (
      u.name?.toLowerCase().includes(query) ||
      u.identifier?.toLowerCase().includes(query) ||
      u.role?.toLowerCase().includes(query)
    );

    if (!matchesSearch) return false;

    if (activeTab === 'employees') return getRoleCategory(u.role) === 'Employees';
    if (activeTab === 'partners') return getRoleCategory(u.role) === 'Partners';
    if (activeTab === 'customers') return getRoleCategory(u.role) === 'Customers';
    return true;
  });

  const handleDeleteAgent = async () => {
    if (deleteId) {
      try {
        await deleteDoc(doc(db, "users", deleteId));
        setUsers(prev => prev.filter(u => u.identifier !== deleteId));
        if (selectedAgent?.identifier === deleteId) {
          setSelectedAgent(null);
        }
        setDeleteId(null);
        toast.success("User access removed successfully");
      } catch (err) {
        toast.error("Error removing user: " + err.message);
      }
    }
  };

  const handleRoleChange = async (newRole) => {
    if (!selectedAgent) return;
    try {
      await updateDoc(doc(db, "users", selectedAgent.identifier), { role: newRole });
      setUsers(prev => prev.map(u => u.identifier === selectedAgent.identifier ? { ...u, role: newRole } : u));
      setSelectedAgent(prev => ({ ...prev, role: newRole }));
      toast.success(`Role updated to ${newRole}`);
    } catch (err) {
      toast.error("Error updating role: " + err.message);
    }
  };

  const handleToggleStatus = async () => {
    if (!selectedAgent) return;
    const nextStatus = selectedAgent.status === 'Deactivated' ? 'Active' : 'Deactivated';
    try {
      await updateDoc(doc(db, "users", selectedAgent.identifier), { status: nextStatus });
      setUsers(prev => prev.map(u => u.identifier === selectedAgent.identifier ? { ...u, status: nextStatus } : u));
      setSelectedAgent(prev => ({ ...prev, status: nextStatus }));
      toast.success(`User status set to ${nextStatus}`);
    } catch (err) {
      toast.error("Failed to update user status: " + err.message);
    }
  };

  const handleInviteUser = async (e) => {
    e.preventDefault();
    if (!inviteForm.name || !inviteForm.identifier) {
      toast.error("Please provide both name and email/identifier.");
      return;
    }
    try {
      const emailKey = inviteForm.identifier.trim().toLowerCase();
      const newUser = {
        name: inviteForm.name.trim(),
        identifier: emailKey,
        contactNumber: inviteForm.contactNumber.trim() || '',
        role: inviteForm.role || 'Sales',
        status: 'Active',
        invitedAt: new Date().toISOString(),
        invitedBy: currentUser?.email || 'Admin',
      };
      await updateDoc(doc(db, "users", emailKey), newUser).catch(async () => {
        const { setDoc } = await import('firebase/firestore');
        await setDoc(doc(db, "users", emailKey), newUser);
      });
      setUsers(prev => [...prev.filter(u => u.identifier !== emailKey), newUser]);
      setShowInviteModal(false);
      setInviteForm({ name: '', identifier: '', contactNumber: '', role: 'Sales' });
      toast.success(`Invited ${newUser.name} with ${newUser.role} role`);
    } catch (err) {
      toast.error("Failed to invite member: " + err.message);
    }
  };

  const handleSaveDetails = async () => {
    if (!selectedAgent) return;
    try {
      await updateDoc(doc(db, "users", selectedAgent.identifier), {
        name: editForm.name,
        contactNumber: editForm.contactNumber || ""
      });
      setUsers(prev => prev.map(u => u.identifier === selectedAgent.identifier ? { ...u, ...editForm } : u));
      setSelectedAgent(prev => ({ ...prev, ...editForm }));
      setIsEditing(false);
      toast.success("User details updated successfully");
    } catch (err) {
      toast.error("Error updating details: " + err.message);
    }
  };

  const handleResetPassword = async () => {
    toast.info(`Password reset email instructions sent to ${selectedAgent.identifier}`);
  };

  const handleApprove = async (regData) => {
    setPendingUsers(pendingUsers.filter(u => u.identifier !== regData.identifier));
    if (onApprove) await onApprove(regData);
    toast.success(`Access approved for ${regData.name}`);
  };

  const handleReject = async (identifier) => {
    setPendingUsers(pendingUsers.filter(u => u.identifier !== identifier));
    if (onReject) await onReject(identifier);
    toast.info("Registration request dismissed");
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col pb-6">
      {/* Standardized Header */}
      <PageHeader
        title="User & Identity Directory"
        subtitle="Manage authenticated member access levels, department authorizations, and pending identity registrations."
        metrics={[
          { label: "Total Members", value: users.length, color: "cyan" },
          { label: "Internal Team", value: employeeCount, color: "emerald" },
          { label: "Partner Accounts", value: partnerCount, color: "amber" },
          { label: "Pending Approvals", value: pendingUsers.length, color: pendingUsers.length > 0 ? "warning" : "neutral" }
        ]}
        actions={
          isAdmin && (
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-bold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,218,243,0.25)] active:scale-95 flex-shrink-0"
            >
              <Plus size={16} />
              <span>Invite Member</span>
            </button>
          )
        }
      />

      {/* Standardized Filter & Search Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search users by name, email, or role..."
        activeFilter={activeTab}
        onFilterChange={setActiveTab}
        filterOptions={[
          { id: 'all', label: 'All Members', count: users.length },
          { id: 'employees', label: 'Internal Employees', count: employeeCount },
          { id: 'partners', label: 'Art Partners', count: partnerCount },
          { id: 'customers', label: 'Client Accounts', count: customerCount }
        ]}
        totalCount={users.length}
        filteredCount={filteredUsers.length}
      />

      {/* Pending Registrations Callout (Admin Only) */}
      {isAdmin && pendingUsers.length > 0 && (
        <div className="mb-6 p-5 bg-surface-container/80 border border-primary/30 rounded-2xl shadow-[0_4px_20px_rgba(0,218,243,0.1)] flex-shrink-0">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center">
              <Shield size={16} className="mr-2 text-primary" />
              Pending Access Approvals
            </h3>
            <span className="text-[10px] bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-bold">
              {pendingUsers.length} Requests Awaiting
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {pendingUsers.map(user => (
              <div key={user.identifier} className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/60 flex items-center justify-between">
                <div className="min-w-0 pr-3">
                  <p className="text-xs font-bold text-on-surface truncate">{user.name}</p>
                  <p className="text-[10px] text-on-surface-variant font-mono truncate">{user.identifier}</p>
                  <p className="text-[9px] font-bold text-primary uppercase mt-1 tracking-wider">{user.role}</p>
                </div>
                <div className="flex space-x-1.5 flex-shrink-0">
                  <button 
                    onClick={() => handleApprove(user)} 
                    className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-sm"
                    title="Approve Access"
                  >
                    <Check size={14} />
                  </button>
                  <button 
                    onClick={() => handleReject(user.identifier)} 
                    className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-colors"
                    title="Reject Request"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="flex-1 flex lg:flex-row flex-col gap-6 overflow-hidden min-h-0">
        {/* Left column: List */}
        <div className="w-full lg:w-1/3 flex flex-col border border-outline-variant/60 bg-surface-container/60 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.15)] h-full">
          <div className="bg-surface-container-low/80 p-3.5 px-4 border-b border-outline-variant/60 flex justify-between items-center text-xs font-bold text-on-surface-variant uppercase tracking-wider flex-shrink-0">
             <span className="flex items-center gap-2">
               <UserCheck size={14} className="text-primary" />
               Registered Members ({filteredUsers.length})
             </span>
             <span className="text-[10px] text-on-surface-variant/70 lowercase font-medium">
               click to inspect
             </span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-outline-variant/30">
            {filteredUsers.length === 0 ? (
              <div className="p-12 text-center text-on-surface-variant text-sm font-medium">
                <User size={36} className="mx-auto mb-3 opacity-25 text-on-surface-variant" />
                <p className="font-bold text-on-surface">No members found</p>
                <p className="text-xs text-on-surface-variant mt-1">Try adjusting your search criteria or category filter.</p>
              </div>
            ) : (
              filteredUsers.map(u => {
                const isSelected = selectedAgent?.identifier === u.identifier;
                const isAdminRole = u.role === 'Admin';
                const isPartnerRole = u.role === 'Partner';

                return (
                  <div
                    key={u.identifier}
                    onClick={() => setSelectedAgent(u)}
                    className={`p-3.5 cursor-pointer transition-all flex items-center space-x-3 ${
                      isSelected 
                        ? 'bg-primary/10 border-l-4 border-primary shadow-inner' 
                        : 'hover:bg-surface-container-high/40 border-l-4 border-transparent'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 border ${
                      isAdminRole 
                        ? 'bg-primary/15 text-primary border-primary/30' 
                        : isPartnerRole 
                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' 
                        : 'bg-surface-container-high text-on-surface border-outline-variant/50'
                    }`}>
                      {u.name?.charAt(0)?.toUpperCase() || <User size={16} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <p className="text-xs font-bold text-on-surface truncate">{u.name}</p>
                        <StatusBadge status={u.role || 'User'} size="xs" />
                      </div>
                      <p className="text-[10px] text-on-surface-variant font-mono truncate">{u.identifier}</p>
                    </div>
                    <ChevronRight size={14} className={`text-on-surface-variant/40 transition-transform ${isSelected ? 'text-primary translate-x-0.5' : ''}`} />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right column: Details Inspector */}
        <div className="w-full lg:w-2/3 h-full overflow-y-auto custom-scrollbar pr-1">
          {selectedAgent ? (
            <div className="space-y-6">
              
              {/* Member Profile Overview */}
              <div className="bg-surface-container/70 border border-outline-variant/60 rounded-3xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.2)] relative overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div className="flex items-start space-x-5">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-black text-2xl sm:text-3xl flex-shrink-0 shadow-md border ${
                      selectedAgent.role === 'Admin' 
                        ? 'bg-primary/15 text-primary border-primary/30' 
                        : selectedAgent.role === 'Partner' 
                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' 
                        : 'bg-surface-container-high text-on-surface border-outline-variant/50'
                    }`}>
                      {selectedAgent.name?.charAt(0)?.toUpperCase() || <User size={32} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="space-y-3 max-w-sm">
                          <div>
                            <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest block mb-1">Full Name</label>
                            <input
                              type="text"
                              value={editForm.name || ""}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest block mb-1">Contact Phone</label>
                            <input
                              type="text"
                              value={editForm.contactNumber || ""}
                              onChange={(e) => setEditForm({ ...editForm, contactNumber: e.target.value })}
                              placeholder="+94 71 234 5678"
                              className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:border-primary"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2.5 flex-wrap mb-1">
                            <h2 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
                              {selectedAgent.name}
                            </h2>
                            <StatusBadge status={selectedAgent.role || 'User'} size="xs" />
                          </div>
                          <p className="text-xs font-mono font-bold text-on-surface-variant mb-3">
                            ID: {selectedAgent.identifier?.split('@')[0]?.toUpperCase()}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-start sm:self-auto">
                    {isAdmin && (
                      <>
                        {isEditing ? (
                          <button
                            onClick={handleSaveDetails}
                            className="p-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                            title="Save Changes"
                          >
                            <Save size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setEditForm({ name: selectedAgent.name, contactNumber: selectedAgent.contactNumber || "" });
                              setIsEditing(true);
                            }}
                            className="p-2.5 bg-surface-container-high text-on-surface hover:bg-surface-variant hover:text-primary rounded-xl transition-all border border-outline-variant/60"
                            title="Edit Details"
                          >
                            <Edit2 size={16} />
                          </button>
                        )}
                        {currentUser?.identifier !== selectedAgent.identifier && (
                          <button
                            onClick={() => setDeleteId(selectedAgent.identifier)}
                            className="p-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl transition-all border border-rose-500/20"
                            title="Revoke User Access"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </>
                    )}
                    {selectedAgent.isApproved && !isEditing && (
                      <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-xl border border-emerald-500/20 flex items-center space-x-1.5">
                        <ShieldCheck size={14} className="text-emerald-400" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Attributes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-outline-variant/60">
                  <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/50 flex items-center space-x-3">
                    <Mail size={16} className="text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase font-bold text-on-surface-variant tracking-wider">Email Account</p>
                      <p className="text-xs font-mono font-bold text-on-surface truncate">{selectedAgent.identifier}</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/50 flex items-center justify-between">
                    <div className="flex items-center space-x-3 min-w-0">
                      <Briefcase size={16} className="text-cyan-400 flex-shrink-0" />
                      <div>
                        <p className="text-[9px] uppercase font-bold text-on-surface-variant tracking-wider">System Role</p>
                        {isAdmin ? (
                          <select 
                            value={selectedAgent.role}
                            onChange={(e) => handleRoleChange(e.target.value)}
                            className="bg-surface-container border border-outline-variant rounded-lg px-2 py-1 text-xs font-bold text-on-surface outline-none focus:border-primary cursor-pointer mt-0.5"
                          >
                            <option value="Admin">Admin</option>
                            <option value="Sales">Sales</option>
                            <option value="Operations">Operations</option>
                            <option value="Customer">Customer</option>
                            <option value="Partner">Partner</option>
                          </select>
                        ) : (
                          <p className="text-xs font-bold text-on-surface mt-0.5">{selectedAgent.role}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/50 flex items-center space-x-3">
                    <KeyRound size={16} className="text-amber-400 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] uppercase font-bold text-on-surface-variant tracking-wider">Credentials</p>
                      {isAdmin ? (
                        <button
                          onClick={handleResetPassword}
                          className="text-xs font-bold text-primary hover:underline transition-colors mt-0.5 block"
                        >
                          Send Password Reset
                        </button>
                      ) : (
                        <p className="text-xs font-bold text-emerald-400 mt-0.5">Active & Secured</p>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/50 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ShieldCheck size={16} className={selectedAgent.status === 'Deactivated' ? 'text-rose-400' : 'text-emerald-400'} />
                      <div>
                        <p className="text-[9px] uppercase font-bold text-on-surface-variant tracking-wider">Account Status</p>
                        <p className={`text-xs font-bold ${selectedAgent.status === 'Deactivated' ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {selectedAgent.status || 'Active'}
                        </p>
                      </div>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={handleToggleStatus}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                          selectedAgent.status === 'Deactivated'
                            ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'text-rose-400 bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20'
                        }`}
                      >
                        {selectedAgent.status === 'Deactivated' ? 'Reactivate' : 'Deactivate'}
                      </button>
                    )}
                  </div>

                  <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/50 flex items-center space-x-3">
                    <Phone size={16} className="text-pink-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase font-bold text-on-surface-variant tracking-wider">Contact Number</p>
                      <p className="text-xs font-bold text-on-surface truncate mt-0.5">
                        {selectedAgent.contactNumber || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Activity Logs */}
              <div className="bg-surface-container/70 border border-outline-variant/60 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-outline-variant/40">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface flex items-center">
                     <Clock size={15} className="mr-2 text-primary" />
                     User Audit Activity Stream
                  </h3>
                  <span className="text-[10px] text-on-surface-variant font-mono">
                    {auditLogs.filter(log => log.userId === selectedAgent.identifier).length} events
                  </span>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-1">
                  {auditLogs.filter(log => log.userId === selectedAgent.identifier).length === 0 ? (
                    <div className="text-center py-8 text-on-surface-variant text-xs italic bg-surface-container-low/50 border border-dashed border-outline-variant rounded-2xl">
                       No logged audit activity recorded for this user ID.
                    </div>
                  ) : (
                    auditLogs.filter(log => log.userId === selectedAgent.identifier)
                      .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0))
                      .map((log, idx) => (
                        <div key={log._firestoreId || idx} className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/40">
                           <div className="flex justify-between items-center mb-1">
                             <span className="font-bold text-on-surface text-[11px] uppercase tracking-wider">{log.action}</span>
                             <span className="text-[10px] text-on-surface-variant font-mono">{log.createdAt?.toDate ? log.createdAt.toDate().toLocaleString() : 'Recent'}</span>
                           </div>
                           <p className="text-[11px] text-on-surface-variant">
                             <span className="font-semibold text-primary">{log.module}:</span> {log.details}
                           </p>
                        </div>
                      ))
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[350px] border-2 border-dashed border-outline-variant/60 rounded-3xl flex flex-col items-center justify-center text-on-surface-variant bg-surface-container/40 p-8 text-center">
              <User size={56} className="mb-3 opacity-20 text-on-surface" />
              <h3 className="font-bold text-base text-on-surface">No Member Selected</h3>
              <p className="text-xs max-w-sm text-on-surface-variant mt-1.5 leading-relaxed">
                Select an employee, art partner, or client from the registry to inspect identity credentials, adjust dynamic access roles, or review audit trails.
              </p>
            </div>
          )}
        </div>
      </div>

      <DeleteModal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteAgent}
        title="Revoke Member Access?"
        message="Are you sure you want to revoke this user's account? They will be immediately disconnected from the ERP workspace."
      />

      {/* Invite Member Modal (Item 18) */}
      {showInviteModal && (
        <ModalWrapper
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          maxWidth="max-w-md"
          height="h-auto max-h-[85vh]"
          ariaLabel="Invite Team Member"
        >
          <div className="px-6 py-5 border-b border-outline-variant bg-surface-container-low flex justify-between items-center flex-shrink-0">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-on-surface">
                Invite Team Member
              </h3>
              <p className="text-[10px] uppercase font-bold text-primary tracking-widest mt-0.5">
                Access Control & Identity Enrollment
              </p>
            </div>
            <button 
              onClick={() => setShowInviteModal(false)} 
              className="p-2 bg-surface-container-high text-on-surface-variant rounded-full hover:bg-surface-variant transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleInviteUser} className="p-6 overflow-y-auto space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-on-surface-variant mb-1.5 tracking-widest">
                Full Name *
              </label>
              <input 
                type="text" 
                value={inviteForm.name} 
                onChange={e => setInviteForm({...inviteForm, name: e.target.value})} 
                className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/50 text-on-surface" 
                placeholder="e.g. Kasun Perera"
                required 
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-on-surface-variant mb-1.5 tracking-widest">
                Email / Workspace ID *
              </label>
              <input 
                type="email" 
                value={inviteForm.identifier} 
                onChange={e => setInviteForm({...inviteForm, identifier: e.target.value})} 
                className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/50 text-on-surface font-mono" 
                placeholder="kasun@print2frame.xyz"
                required 
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-on-surface-variant mb-1.5 tracking-widest">
                Contact Number
              </label>
              <input 
                type="text" 
                value={inviteForm.contactNumber} 
                onChange={e => setInviteForm({...inviteForm, contactNumber: e.target.value})} 
                className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/50 text-on-surface" 
                placeholder="+94 7X XXX XXXX"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-on-surface-variant mb-1.5 tracking-widest">
                Assigned Role *
              </label>
              <select
                value={inviteForm.role}
                onChange={e => setInviteForm({...inviteForm, role: e.target.value})}
                className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/50 text-on-surface font-bold"
              >
                <option value="Admin">Admin</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
                <option value="Partner">Partner</option>
                <option value="Customer">Customer</option>
              </select>
            </div>

            <div className="pt-3 border-t border-outline-variant flex justify-end space-x-2">
              <button 
                type="button" 
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:text-on-surface"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-5 py-2 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(0,218,243,0.2)]"
              >
                Send Invitation
              </button>
            </div>
          </form>
        </ModalWrapper>
      )}
    </div>
  );
}

