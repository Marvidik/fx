"use client";

import React from 'react';
import styles from '../Dashboard.module.css';

export default function TransferPage() {
  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.pageTitle}>Fund Transfer</h2>
      
      <div className={styles.transferContainer}>
        <div className={styles.card} style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
          <div className={styles.balanceSummary}>
             <div className={styles.balanceIconCircle}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
             </div>
             <h2 className={styles.transferBalance}>$1,332,255.00</h2>
             <p className={styles.transferBalanceLabel}>Your Account Balance</p>
          </div>

          <div className={styles.formGroup} style={{ marginTop: '30px' }}>
            <label className={styles.transferLabel}>RECIPIENT EMAIL OR USERNAME <span style={{color: 'red'}}>*</span></label>
            <input type="text" placeholder="Enter recipient email or username" className={styles.formInput} />
          </div>

          <div className={styles.formGroup} style={{ marginTop: '20px' }}>
            <label className={styles.transferLabel}>AMOUNT($) <span style={{color: 'red'}}>*</span></label>
            <input type="text" placeholder="Enter amount you want to transfer to recipient" className={styles.formInput} />
            <p className={styles.transferCharge}>Transfer Charges: <span style={{color: 'red'}}>2%</span></p>
          </div>

          <div className={styles.formGroup} style={{ marginTop: '20px' }}>
            <label className={styles.transferLabel}>PASSWORD</label>
            <input type="password" placeholder="Enter your password" className={styles.formInput} />
          </div>

          <button className={styles.proceedBtn} style={{ marginTop: '30px' }}>Proceed</button>
        </div>
      </div>
    </div>
  );
}
