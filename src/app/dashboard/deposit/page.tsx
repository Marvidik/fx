"use client";

import React, { useState } from 'react';
import styles from '../Dashboard.module.css';

export default function DepositPage() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('3000.00');
  const [selectedMethod, setSelectedMethod] = useState('BTC');

  const methods = [
    { id: 'BTC', name: 'BTC', label: 'BTC', icon: '₿' },
    { id: 'USDT', name: 'USDT', label: 'USDT', icon: '₮' },
    { id: 'USDT_TRC20', name: 'USDT (TRC20)', label: 'USDT', icon: '₮' },
    { id: 'USDT_ERC20', name: 'USDT (ERC20)', label: 'USDT', icon: '₮' },
    { id: 'USDT_BEP20', name: 'USDT (BEP20)', label: 'USDT', icon: '₮' },
    { id: 'ETH', name: 'ETHEREUM', label: 'ETH', icon: 'Ξ' },
  ];

  if (step === 2) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.card} style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
          <h3 className={styles.depositTitle}>Your Payment Method</h3>
          <div className={styles.paymentNotice}>
            You are to make payment of <span style={{color: '#f59e0b', fontWeight: 700}}>${Number(amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</span> using your selected payment method.
          </div>
          
          <div className={styles.methodLogoLarge}>
             <svg width="60" height="60" viewBox="0 0 24 24" fill="#f59e0b"><path d="M23.638 14.904c-1.16 4.662-5.903 7.525-10.564 6.366-4.662-1.16-7.525-5.903-6.366-10.564 1.16-4.662 5.903-7.525 10.564-6.366 4.662 1.16 7.525 5.903 6.366 10.564zm-14.077-1.341c.218 1.458 2.22 1.624 2.22 1.624l-.32 1.285c-.32 1.285 1.594.401 1.594.401l.322-1.288c.319.08 1.127.241 1.127.241l-.322 1.288c.32 1.285 1.594.401 1.594.401l.321-1.285c2.731.545 4.34-1.344 3.738-3.693l-1.077 4.321s-1.843-.46-1.843-.46l.321-1.285s-.758-.189-1.385-.348l-.322 1.288s-1.843-.46-1.843-.46l.321-1.285c-1.383-.347-1.593-1.868-1.593-1.868l-.837-.209zm7.042-2.148c.159.638-.854.763-.854.763l-.214.86c1.17.292 1.666-.356 1.472-1.132-.192-.776-.84-.81-1.472-1.133l-.213.856s1.122.148 1.281.786zm-.702 2.823c.184.741-1.12.784-1.12.784l-.26.936c1.353.339 2.062-.519 1.836-1.428-.226-.909-1.078-.962-1.836-1.427l-.261.936s1.457.458 1.641 1.199z"/></svg>
          </div>

          <div className={styles.addressBox}>
            <label className={styles.addressLabel}>BTC Address:</label>
            <div className={styles.copyInputBox}>
              <input type="text" readOnly value="bc1qf26nsu5hvzwu9yyaac28egucj198w56lp76qyq6" className={styles.copyInput} />
              <button className={styles.copyIconBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            </div>
            <p className={styles.networkType}>Network Type: BTC</p>
          </div>

          <div className={styles.uploadSection}>
            <label className={styles.addressLabel}>Upload Payment Proof</label>
            <div className={styles.dropzone}>
               <div className={styles.uploadIconLarge}>
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
               </div>
               <p className={styles.dropzoneText}>Click to upload or drag and drop</p>
               <p className={styles.dropzoneSubtext}>JPEG, PNG, GIF, WEBP, PDF</p>
            </div>
          </div>

          <div className={styles.formActions} style={{marginTop: '30px'}}>
             <button className={styles.backBtn} onClick={() => setStep(1)}>Back</button>
             <button className={styles.submitPaymentBtn}>Submit Payment</button>
          </div>
        </div>
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
                  type="text" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  className={styles.depositAmountInput}
                />
              </div>
              <p className={styles.minDepositText}>Minimum deposit: $50.00</p>
            </div>

            <div className={styles.paymentMethodSection} style={{ marginTop: '30px' }}>
              <label className={styles.depositLabel}>Select Payment Method</label>
              <div className={styles.methodGrid}>
                {methods.map((m) => (
                  <div 
                    key={m.id} 
                    className={`${styles.methodCard} ${selectedMethod === m.id ? styles.methodCardActive : ''}`}
                    onClick={() => setSelectedMethod(m.id)}
                  >
                    <div className={styles.methodIconBox}>{m.icon}</div>
                    <div className={styles.methodInfo}>
                      <span className={styles.methodName}>{m.name}</span>
                      <span className={styles.methodLabel}>{m.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className={styles.proceedDepositBtn} onClick={() => setStep(2)}>
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
              <span>${amount}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Processing Fee</span>
              <span>$0.00</span>
            </div>
            <div className={styles.summaryDivider}></div>
            <div className={styles.summaryRowTotal}>
              <span>Total Deposit</span>
              <span>${amount}</span>
            </div>
          </div>

          <div className={styles.card} style={{ marginBottom: '20px' }}>
            <div className={styles.recentHeader}>
              <h4 className={styles.summaryTitle} style={{margin: 0}}>Recent Deposits</h4>
              <button className={styles.viewAllBtn}>View All</button>
            </div>
            <div className={styles.recentItem}>
              <div className={styles.recentInfo}>
                <span className={styles.recentMethod}>BTC</span>
                <span className={styles.recentDate}>5 months ago</span>
              </div>
              <span className={styles.recentAmount}>+$315,000</span>
            </div>
          </div>

          <div className={styles.card} style={{ background: '#f8fafc', border: '1px dashed #cbd5e1' }}>
            <div className={styles.securityItem}>
               <div className={styles.securityIcon}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
               </div>
               <div className={styles.securityText}>
                 <p style={{fontWeight: 600, fontSize: '0.85rem', color: '#1e293b', marginBottom: '4px'}}>Secure Transactions</p>
                 <p style={{fontSize: '0.75rem', color: '#64748b', lineHeight: '1.4'}}>All deposits are secured with 256-bit SSL encryption and multi-signature verification.</p>
               </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
