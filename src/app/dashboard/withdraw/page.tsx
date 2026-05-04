"use client";

import React, { useState } from 'react';
import styles from '../Dashboard.module.css';

export default function WithdrawPage() {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('USDT TRC20');
  const [password, setPassword] = useState('');

  if (step === 1) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className={styles.modalIconBox}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className={styles.modalTitleArea}>
              <h3 className={styles.modalTitle}>Secure Access Required</h3>
              <p className={styles.modalSubtitle}>Sensitive section verification</p>
            </div>
            <button className={styles.closeModal}>×</button>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.securityNotice}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
               <div>
                 <p style={{fontWeight: 600}}>Security Notice</p>
                 <p>You're accessing a sensitive section of your account. Please verify your identity by entering your password.</p>
               </div>
            </div>

            <div className={styles.formGroup} style={{marginTop: '20px'}}>
              <label className={styles.modalLabel}>Account Password</label>
              <div className={styles.passwordInputBox}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.inputIcon}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input 
                  type="password" 
                  placeholder="Enter your password" 
                  className={styles.modalInput} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.toggleVisibility}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.cancelBtn}>Cancel</button>
              <button className={styles.verifyBtn} onClick={() => setStep(2)}>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                 Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.card} style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        <div className={styles.withdrawHeaderRow}>
           <button className={styles.activeMethodBtn}>
             Your payment method
           </button>
           <select 
             className={styles.methodSelectSmall}
             value={selectedMethod}
             onChange={(e) => setSelectedMethod(e.target.value)}
           >
             <option>USDT TRC20</option>
             <option>Bitcoin</option>
             <option>Ethereum</option>
           </select>
        </div>

        <div className={styles.withdrawIconLarge}>
           <svg width="40" height="40" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
        </div>

        <div className={styles.formGroup} style={{marginTop: '25px'}}>
          <label className={styles.withdrawLabel}>Enter Amount to withdraw($)</label>
          <input type="text" placeholder="Enter Amount" className={styles.formInput} />
        </div>

        <div className={styles.formGroup} style={{marginTop: '20px'}}>
          <label className={styles.withdrawLabel}>USDT TRC20 Address</label>
          <input type="text" placeholder="Enter USDT TRC20 Address" className={styles.formInput} />
        </div>

        <div className={styles.formGroup} style={{marginTop: '20px'}}>
          <label className={styles.withdrawLabel}>Enter OTP</label>
          <div className={styles.otpInputBox}>
            <input type="text" placeholder="Enter OTP" className={styles.formInput} />
            <button className={styles.requestOtpBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Request OTP
            </button>
          </div>
          <p className={styles.otpHint}>OTP will be sent to your email when you request</p>
        </div>

        <button className={styles.completeRequestBtn}>Complete Request</button>
      </div>
      
      <p className={styles.footerText} style={{textAlign: 'center'}}>All Rights Reserved © Metavault Assets 2025</p>
    </div>
  );
}
