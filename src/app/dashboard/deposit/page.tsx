"use client";

import React, { useState, useEffect } from 'react';
import styles from '../Dashboard.module.css';
import { authService } from '@/services/authService';
import StatusModal from '@/components/StatusModal';

export default function DepositPage() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);
  const [methods, setMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [proof, setProof] = useState<File | null>(null);
  const [recentDeposit, setRecentDeposit] = useState<any>(null);

  // Modal State
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error',
    title: '',
    message: ''
  });

  const showModal = (type: 'success' | 'error', title: string, message: string) => {
    setModal({ isOpen: true, type, title, message });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [methodsData, history] = await Promise.all([
          authService.getPaymentMethods(),
          authService.getTransactionHistory()
        ]);
        setMethods(methodsData || []);
        
        // Find last deposit
        if (history.history) {
          const lastDep = history.history.find((h: any) => h.type.toLowerCase() === 'deposit');
          setRecentDeposit(lastDep);
        }
      } catch (err) {
        console.error("Failed to fetch deposit data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProof(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!proof || !selectedMethodId || !amount) {
      showModal('error', 'Incomplete Details', 'Please fill all fields and upload proof of payment');
      return;
    }
    
    const selectedMethod = methods.find(m => m.id === selectedMethodId);
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('amount', amount);
      formData.append('coin', selectedMethod.name);
      formData.append('proof', proof);
      
      await authService.submitDeposit(formData);
      showModal('success', 'Deposit Successful', 'Your deposit request has been submitted and is pending approval.');
      setStep(1);
      setAmount('');
      setProof(null);
    } catch (err: any) {
      showModal('error', 'Deposit Failed', err.message || "Failed to submit deposit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedMethod = methods.find(m => m.id === selectedMethodId);
  const canProceed = parseFloat(amount) >= 10 && selectedMethodId !== null;

  if (step === 2 && selectedMethod) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.card} style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
          <h3 className={styles.depositTitle}>Confirm Payment</h3>
          <div className={styles.paymentNotice}>
            You are to make payment of <span style={{color: '#f59e0b', fontWeight: 700}}>${parseFloat(amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</span> using {selectedMethod.name}.
          </div>
          
          <div className={styles.methodLogoLarge} style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
             <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '50%', border: '2px solid #e2e8f0' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
             </div>
          </div>

          <div className={styles.addressBox} style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <label className={styles.addressLabel} style={{ display: 'block', marginBottom: '10px', fontWeight: 600, color: '#475569' }}>{selectedMethod.name} Address:</label>
            <div className={styles.copyInputBox} style={{ display: 'flex', gap: '10px' }}>
              <input type="text" readOnly value={selectedMethod.address} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', color: '#1e293b', fontSize: '0.9rem' }} />
              <button 
                onClick={() => { 
                  navigator.clipboard.writeText(selectedMethod.address); 
                  showModal('success', 'Copied!', 'Address copied to clipboard'); 
                }} 
                style={{ padding: '0 12px', borderRadius: '8px', background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            </div>
            <p className={styles.networkType} style={{ marginTop: '10px', fontSize: '0.85rem', color: '#64748b' }}>Network Type: {selectedMethod.network}</p>
          </div>

          <div className={styles.uploadSection} style={{ marginTop: '30px' }}>
            <label className={styles.addressLabel} style={{ display: 'block', marginBottom: '10px', fontWeight: 600 }}>Upload Payment Proof</label>
            <div 
              className={styles.dropzone} 
              style={{ 
                border: '2px dashed #cbd5e1', 
                borderRadius: '12px', 
                padding: '30px', 
                textAlign: 'center', 
                cursor: 'pointer',
                background: proof ? '#f0fdf4' : 'transparent',
                borderColor: proof ? '#22c55e' : '#cbd5e1'
              }}
              onClick={() => document.getElementById('proof-input')?.click()}
            >
               <input type="file" id="proof-input" hidden onChange={handleFileChange} accept="image/*" />
               <div className={styles.uploadIconLarge}>
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={proof ? "#22c55e" : "#2563eb"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
               </div>
               <p className={styles.dropzoneText} style={{ marginTop: '10px', fontWeight: 500 }}>{proof ? proof.name : "Click to upload payment proof"}</p>
               <p className={styles.dropzoneSubtext} style={{ fontSize: '0.8rem', color: '#64748b' }}>PNG, JPG or JPEG</p>
            </div>
          </div>

          <div className={styles.formActions} style={{marginTop: '40px', display: 'flex', gap: '15px'}}>
             <button className={styles.backBtn} onClick={() => setStep(1)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer' }}>Back</button>
             <button 
               className={styles.submitPaymentBtn} 
               onClick={handleSubmit} 
               disabled={submitting}
               style={{ flex: 2, padding: '12px', borderRadius: '8px', border: 'none', background: '#22c55e', color: 'white', cursor: 'pointer', opacity: submitting ? 0.7 : 1 }}
             >
                {submitting ? "Submitting..." : "Submit Payment"}
             </button>
          </div>
        </div>

        <StatusModal 
          isOpen={modal.isOpen} 
          onClose={() => setModal({ ...modal, isOpen: false })} 
          type={modal.type} 
          title={modal.title} 
          message={modal.message} 
        />
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.card} style={{ padding: '25px 40px' }}>
        <h3 className={styles.depositTitle}>Fund Account Balance</h3>
        <p className={styles.depositSubtitle}>Add funds to your trading account</p>
      </div>

      <div className={styles.depositLayout}>
        <div className={styles.depositMainCol}>
          <div className={styles.card}>
            <div className={styles.formGroup}>
              <label className={styles.depositLabel}>Deposit Amount</label>
              <div className={styles.amountInputWrapper}>
                <span className={styles.currencySymbol}>$</span>
                <input 
                  type="number" 
                  value={amount} 
                  placeholder="0.00"
                  onChange={(e) => setAmount(e.target.value)} 
                  className={styles.depositAmountInput}
                />
              </div>
              <p className={styles.minDepositText}>Minimum deposit: $10.00</p>
            </div>

            <div className={styles.paymentMethodSection} style={{ marginTop: '30px' }}>
              <label className={styles.depositLabel}>Select Payment Method</label>
              {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ height: '80px', background: '#f8fafc', borderRadius: '12px', animation: 'pulse 1.5s infinite' }}></div>
                  ))}
                </div>
              ) : (
                <div className={styles.methodGrid}>
                  {methods.map((m) => (
                    <div 
                      key={m.id} 
                      className={`${styles.methodCard} ${selectedMethodId === m.id ? styles.methodCardActive : ''}`}
                      onClick={() => setSelectedMethodId(m.id)}
                    >
                      <div className={styles.methodIconBox}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M8 12h8"/></svg>
                      </div>
                      <div className={styles.methodInfo}>
                        <span className={styles.methodName}>{m.name}</span>
                        <span className={styles.methodLabel}>{m.network}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              className={styles.proceedDepositBtn} 
              onClick={() => { if(canProceed) setStep(2); }} 
              style={{ 
                marginTop: '30px', 
                background: canProceed ? '#22c55e' : '#2563eb',
                color: 'white',
                opacity: canProceed ? 1 : 0.7,
                cursor: canProceed ? 'pointer' : 'not-allowed'
              }}
            >
              Proceed to Payment 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '8px'}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>

        <aside className={styles.depositSidebar}>
          <div className={styles.card} style={{ marginBottom: '20px' }}>
            <h4 className={styles.summaryTitle}>Transaction Summary</h4>
            <div className={styles.summaryRow}>
              <span>Deposit Amount</span>
              <span>${amount || '0.00'}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Method</span>
              <span>{selectedMethod?.name || 'Not selected'}</span>
            </div>
            <div className={styles.summaryDivider}></div>
            <div className={styles.summaryRowTotal}>
              <span>Total Payable</span>
              <span>${amount || '0.00'}</span>
            </div>
          </div>

          <div className={styles.card} style={{ marginBottom: '20px' }}>
            <div className={styles.recentHeader}>
              <h4 className={styles.summaryTitle} style={{margin: 0}}>Recent Deposit</h4>
            </div>
            {loading ? (
               <div style={{ height: '60px', width: '100%', background: '#f8fafc', borderRadius: '12px', marginTop: '15px', animation: 'pulse 1.5s infinite' }}></div>
            ) : recentDeposit ? (
              <div className={styles.recentItem} style={{ marginTop: '15px' }}>
                <div className={styles.recentInfo}>
                  <span className={styles.recentMethod}>{recentDeposit.type}</span>
                  <span className={styles.recentDate}>{new Date(recentDeposit.date).toLocaleDateString()}</span>
                </div>
                <span style={{ color: '#22c55e', fontWeight: 700 }}>+${recentDeposit.amount}</span>
              </div>
            ) : (
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '10px' }}>No recent deposits found.</p>
            )}
          </div>

          <div className={styles.card} style={{ background: '#f8fafc', border: '1px dashed #cbd5e1' }}>
            <div className={styles.securityItem}>
               <div className={styles.securityIcon}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
               </div>
               <div className={styles.securityText}>
                 <p style={{fontWeight: 600, fontSize: '0.85rem', color: '#1e293b', marginBottom: '4px'}}>Secure Transactions</p>
                 <p style={{fontSize: '0.75rem', color: '#64748b', lineHeight: '1.4'}}>All deposits are secured with 256-bit SSL encryption.</p>
               </div>
            </div>
          </div>
        </aside>
      </div>

      <StatusModal 
        isOpen={modal.isOpen} 
        onClose={() => setModal({ ...modal, isOpen: false })} 
        type={modal.type} 
        title={modal.title} 
        message={modal.message} 
      />
    </div>
  );
}
