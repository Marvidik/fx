"use client";

import React, { useState, useEffect } from 'react';
import styles from '../Dashboard.module.css';
import { authService } from '@/services/authService';
import StatusModal from '@/components/StatusModal';

export default function TransferPage() {
  const [step, setStep] = useState(1);
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInputCaptcha, setUserInputCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const [modal, setModal] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error',
    title: '',
    message: ''
  });

  const showModal = (type: 'success' | 'error', title: string, message: string) => {
    setModal({ isOpen: true, type, title, message });
  };

  const generateCaptcha = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setUserInputCaptcha('');
    setCaptchaError(false);
  };

  useEffect(() => {
    generateCaptcha();
    const fetchData = async () => {
      try {
        const data = await authService.getDashboardData();
        setDashboardData(data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };
    fetchData();
  }, []);

  const handleVerify = () => {
    if (userInputCaptcha === captchaCode) {
      setStep(2);
    } else {
      setCaptchaError(true);
      generateCaptcha();
    }
  };

  const handleSubmit = async () => {
    if (!amount || !recipient || !password) {
      showModal('error', 'Missing Fields', 'Please fill all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      await authService.submitTransfer({
        amount: parseFloat(amount),
        recipient: recipient, // Assuming the API takes recipient
        password: password
      });
      showModal('success', 'Transfer Successful', 'The funds have been transferred successfully.');
      setAmount('');
      setRecipient('');
      setPassword('');
      setStep(1);
      generateCaptcha();
    } catch (err: any) {
      showModal('error', 'Transfer Failed', err.message || 'Failed to process transfer.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (amount: number | string) => {
    const val = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0);
  };

  if (step === 1) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent} style={{ maxWidth: '450px' }}>
          <div className={styles.modalHeader}>
            <div className={styles.modalIconBox} style={{ background: '#ecfdf5' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className={styles.modalTitleArea}>
              <h3 className={styles.modalTitle}>Secure Access Required</h3>
              <p className={styles.modalSubtitle}>Fund transfer verification</p>
            </div>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.securityNotice}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <div>
                  <p style={{fontWeight: 600}}>Security Check</p>
                  <p>Please enter the characters shown below to proceed to the fund transfer section.</p>
                </div>
            </div>

            <div style={{ marginTop: '25px', textAlign: 'center' }}>
               <div style={{ 
                 background: '#f8fafc', 
                 padding: '20px', 
                 borderRadius: '12px', 
                 marginBottom: '20px',
                 border: '2px dashed #cbd5e1',
                 userSelect: 'none'
               }}>
                  <span style={{ 
                    fontSize: '2rem', 
                    fontWeight: 800, 
                    letterSpacing: '8px', 
                    color: '#1e293b',
                    fontFamily: 'monospace',
                    fontStyle: 'italic'
                  }}>{captchaCode}</span>
                  <button onClick={generateCaptcha} style={{ background: 'none', border: 'none', color: '#3b82f6', marginLeft: '15px', cursor: 'pointer' }}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                  </button>
               </div>

               <div className={styles.formGroup}>
                 <input 
                   type="text" 
                   placeholder="Type the characters above" 
                   className={styles.modalInput} 
                   style={{ textAlign: 'center', fontSize: '1.1rem', borderColor: captchaError ? '#ef4444' : '#e2e8f0' }}
                   value={userInputCaptcha}
                   onChange={(e) => setUserInputCaptcha(e.target.value)}
                   onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
                 />
                 {captchaError && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '5px' }}>Incorrect captcha. Please try again.</p>}
               </div>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.verifyBtn} style={{ width: '100%', background: '#10b981' }} onClick={handleVerify}>
                 Verify & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.pageTitle}>Fund Transfer</h2>
      
      <div className={styles.transferContainer}>
        <div className={styles.card} style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
          <div className={styles.balanceSummary}>
             <div className={styles.balanceIconCircle}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
             </div>
             <h2 className={styles.transferBalance}>
               {dashboardData ? formatCurrency(dashboardData.account_balance) : '$ ...'}
             </h2>
             <p className={styles.transferBalanceLabel}>Your Account Balance</p>
          </div>

          <div className={styles.formGroup} style={{ marginTop: '30px' }}>
            <label className={styles.transferLabel}>RECIPIENT EMAIL OR USERNAME <span style={{color: 'red'}}>*</span></label>
            <input 
              type="text" 
              placeholder="Enter recipient email or username" 
              className={styles.formInput} 
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          <div className={styles.formGroup} style={{ marginTop: '20px' }}>
            <label className={styles.transferLabel}>AMOUNT($) <span style={{color: 'red'}}>*</span></label>
            <div className={styles.amountInputWrapper}>
              <span className={styles.currencySymbol}>$</span>
              <input 
                type="number" 
                placeholder="0.00" 
                className={styles.depositAmountInput} 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <p className={styles.transferCharge}>Transfer Charges: <span style={{color: 'red'}}>2%</span></p>
          </div>

          <div className={styles.formGroup} style={{ marginTop: '20px' }}>
            <label className={styles.transferLabel}>PASSWORD</label>
            <input 
              type="password" 
              placeholder="Enter your account password" 
              className={styles.formInput} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            className={styles.proceedBtn} 
            style={{ 
              marginTop: '30px',
              background: '#22c55e',
              color: 'white',
              opacity: submitting ? 0.7 : 1,
              cursor: submitting ? 'not-allowed' : 'pointer'
            }} 
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Processing...' : 'Proceed with Transfer'}
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
