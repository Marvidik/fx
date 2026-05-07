"use client";

import React, { useState, useEffect } from 'react';
import styles from '../Dashboard.module.css';
import { authService } from '@/services/authService';
import StatusModal from '@/components/StatusModal';

export default function WithdrawPage() {
  const [step, setStep] = useState(1);
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInputCaptcha, setUserInputCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  
  const [amount, setAmount] = useState('');
  const [coin, setCoin] = useState('btc');
  const [wallet, setWallet] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
    if (!amount || !wallet) {
      showModal('error', 'Missing Fields', 'Please enter both amount and wallet address.');
      return;
    }

    setSubmitting(true);
    try {
      await authService.submitWithdrawal({
        amount: parseFloat(amount),
        coin: coin.toLowerCase(),
        wallet: wallet
      });
      showModal('success', 'Withdrawal Successful', 'Your withdrawal request has been submitted and is pending approval.');
      setAmount('');
      setWallet('');
      setStep(1);
      generateCaptcha();
    } catch (err: any) {
      showModal('error', 'Withdrawal Failed', err.message || 'Failed to process withdrawal.');
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 1) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent} style={{ maxWidth: '450px' }}>
          <div className={styles.modalHeader}>
            <div className={styles.modalIconBox} style={{ background: '#fff1f2' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className={styles.modalTitleArea}>
              <h3 className={styles.modalTitle}>Secure Access Required</h3>
              <p className={styles.modalSubtitle}>Anti-bot verification</p>
            </div>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.securityNotice}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <div>
                  <p style={{fontWeight: 600}}>Verification Required</p>
                  <p>Please enter the characters shown below to proceed to the withdrawal section.</p>
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
                  <button onClick={generateCaptcha} style={{ background: 'none', border: 'none', color: '#166534', marginLeft: '15px', cursor: 'pointer' }}>
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
              <button className={styles.verifyBtn} style={{ width: '100%' }} onClick={handleVerify}>
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
      <h2 className={styles.pageTitle}>Withdraw Funds</h2>
      
      <div className={styles.card} style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        <div className={styles.withdrawHeaderRow}>
           <button className={styles.activeMethodBtn}>
             Select Withdrawal Method
           </button>
           <select 
             className={styles.methodSelectSmall}
             value={coin}
             onChange={(e) => setCoin(e.target.value)}
           >
             <option value="btc">Bitcoin (BTC)</option>
             <option value="eth">Ethereum (ETH)</option>
             <option value="usdt">USDT (TRC20)</option>
             <option value="ltc">Litecoin (LTC)</option>
           </select>
        </div>

        <div className={styles.withdrawIconLarge}>
           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>

        <div className={styles.formGroup} style={{marginTop: '25px'}}>
          <label className={styles.withdrawLabel}>Amount to Withdraw ($)</label>
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
        </div>

        <div className={styles.formGroup} style={{marginTop: '20px'}}>
          <label className={styles.withdrawLabel}>{coin.toUpperCase()} Wallet Address</label>
          <input 
            type="text" 
            placeholder={`Enter your ${coin.toUpperCase()} wallet address`} 
            className={styles.formInput} 
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          />
        </div>

        <div className={styles.noticeBox} style={{ padding: '15px 20px', marginTop: '25px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b' }}>
           <p style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
             <strong>Note:</strong> Withdrawals are processed within 24 hours. Please double-check your wallet address as transactions are irreversible once processed.
           </p>
        </div>

        <button 
          className={styles.completeRequestBtn} 
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
          {submitting ? 'Processing...' : 'Complete Withdrawal Request'}
        </button>
      </div>

      <StatusModal 
        isOpen={modal.isOpen} 
        onClose={() => setModal({ ...modal, isOpen: false })} 
        type={modal.type} 
        title={modal.title} 
        message={modal.message} 
      />
      
      <p className={styles.footerText} style={{textAlign: 'center', marginTop: '40px'}}>All Rights Reserved © ZynthrixFX 2025</p>
    </div>
  );
}
