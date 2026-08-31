import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { COLLECTIONS } from '../../services/firestoreSync';
import { validatePhone, validateEmail, formatPhone } from '../../utils/validation';
import { Check, Info, Upload } from 'lucide-react';

export default function ReferralForm() {
  const [partnerId, setPartnerId] = useState('');
  const [partnerDetails, setPartnerDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    projectDescription: ''
  });

  useEffect(() => {
    // Parse URL params
    const params = new URLSearchParams(window.location.search);
    const pid = params.get('partnerId') || params.get('ref');
    
    if (pid) {
      setPartnerId(pid);
      fetchPartnerDetails(pid);
    } else {
      setIsLoading(false);
      setError('Invalid referral link. Partner ID is missing.');
    }
  }, []);

  const fetchPartnerDetails = async (pid) => {
    try {
      // Find partner by partnerId field or document ID
      const partnersRef = collection(db, COLLECTIONS.PARTNERS);
      const q = query(partnersRef, where('partnerId', '==', pid));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setPartnerDetails(querySnapshot.docs[0].data());
      } else {
        // Fallback: check doc ID
        const docSnap = await getDocs(query(partnersRef, where('__name__', '==', pid)));
        if (!docSnap.empty) {
            setPartnerDetails(docSnap.docs[0].data());
        } else {
            setError('Partner not found. This referral link might be invalid or expired.');
        }
      }
    } catch (err) {
      console.error("Error fetching partner details:", err);
      setError('Unable to load partner details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
        const formatted = formatPhone(value);
        setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    setError(''); // clear error on type
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name) {
      setError('Name is required.');
      return;
    }
    if (!formData.phone) {
      setError('Phone number is required.');
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError('Invalid phone format. Please use +947X XXXX XXX');
      return;
    }
    if (formData.email && !validateEmail(formData.email)) {
      setError('Invalid email format.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const newLeadRef = doc(collection(db, COLLECTIONS.LEADS));
      
      const leadData = {
        id: `L-${String(Date.now()).slice(-6)}`, // generate UI ID
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        company: formData.company,
        jobScope: formData.projectDescription,
        source: 'Referral',
        agentId: partnerId,
        agentName: partnerDetails?.name || partnerId,
        stage: 'Intake',
        value: 0,
        totalSqFt: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(newLeadRef, leadData);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting lead:", err);
      setError('An error occurred while submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center font-bold text-on-surface-variant font-mono tracking-widest uppercase">
        Loading Referral...
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-surface-container p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,218,243,0.15)] border border-outline-variant text-center space-y-6">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,218,243,0.2)]">
            <Check size={40} className="text-primary" />
          </div>
          <h2 className="text-2xl font-black text-on-surface">Request Submitted!</h2>
          <p className="text-sm text-on-surface-variant">
            Thank you, {formData.name}. We have received your request and will be in touch shortly.
            {partnerDetails && ` You were referred by ${partnerDetails.name}.`}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-surface-container-high hover:bg-surface-variant text-on-surface rounded-xl font-bold text-sm transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      {/* Grid background */}
      <div className="fixed inset-0 technical-grid opacity-15 pointer-events-none z-0"></div>

      <div className="z-10 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <img src="/logo-dark.png" alt="Print To Frame" className="h-12 w-auto mx-auto" />
          <div>
            <h1 className="text-2xl font-black text-on-surface">Get a Custom Quote</h1>
            {partnerDetails && (
              <p className="text-sm text-on-surface-variant mt-2">
                Referred by <span className="font-bold text-primary">{partnerDetails.name}</span>
              </p>
            )}
          </div>
        </div>

        {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-2xl flex items-start space-x-3 text-error">
                <Info size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm font-bold">{error}</p>
            </div>
        )}

        <form onSubmit={handleSubmit} className="bg-surface-container p-6 sm:p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,218,243,0.1)] border border-outline-variant space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-on-surface-variant mb-2 tracking-widest">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-on-surface"
                placeholder="e.g. John Doe"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-on-surface-variant mb-2 tracking-widest">
                Contact Number *
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-on-surface"
                placeholder="+94 7X XXX XXXX"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-on-surface-variant mb-2 tracking-widest">
                Email Address <span className="text-on-surface-variant/50 font-normal">(Optional)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-on-surface"
                placeholder="example@test.com"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-on-surface-variant mb-2 tracking-widest">
                Company / Business <span className="text-on-surface-variant/50 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-on-surface"
                placeholder="e.g. Acme Corp"
              />
            </div>
            
             <div>
              <label className="block text-[10px] uppercase font-bold text-on-surface-variant mb-2 tracking-widest">
                Brief Project Description <span className="text-on-surface-variant/50 font-normal">(Optional)</span>
              </label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-on-surface resize-none"
                placeholder="What kind of framing work do you need?"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !!error}
            className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2 ${
              isSubmitting || !!error
                ? 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed'
                : 'bg-primary text-on-primary hover:bg-primary/80 shadow-[0_0_20px_rgba(0,218,243,0.2)] active:scale-[0.98]'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Request Quote'}
            {!isSubmitting && <Upload size={16} className="ml-2" />}
          </button>
        </form>
        
        <div className="text-center mt-6">
            <p className="text-[10px] text-on-surface-variant">
                Protected by reCAPTCHA and subject to the Print To Frame <br/> Privacy Policy and Terms of Service.
            </p>
        </div>
      </div>
    </div>
  );
}
