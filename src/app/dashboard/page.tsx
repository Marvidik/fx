"use client";

import React from 'react';
import styles from './Dashboard.module.css';
import refStyles from './Referral.module.css';

export default function DashboardOverview() {
  const summaries = [
    { label: 'Account Balance', value: '$1,332,355.00', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ), color: '#3b82f6' },
    { label: 'Total Profit', value: '$1,455,500.00', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
    ), color: '#10b981' },
    { label: 'Bonus', value: '$5,005.00', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><rect x="14" y="9" width="6" height="6"/></svg>
    ), color: '#a855f7' },
    { label: 'Referral Bonus', value: '$0.00', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ), color: '#6366f1' },
    { label: 'Total Deposit', value: '$315,000.00', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    ), color: '#10b981' },
    { label: 'Total Withdrawal', value: '$443,150.00', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
    ), color: '#ef4444' },
  ];

  return (
    <div>
      <div className={styles.welcomeSection}>
        <h1 style={{ color: 'white', fontWeight: 500 }}>Welcome, Fernando!</h1>
        <p style={{ color: 'white', opacity: 0.8 }}>Manage your investments and track your portfolio performance</p>
      </div>

      <div className={styles.alert}>
        <div style={{ background: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </div>
        Welcome to Metavault Assets Investment Platform. Start your portfolio management today!
        <button style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: '#2563eb' }}>×</button>
      </div>

      <div className={styles.summaryCard}>
        <h3 className={styles.summaryCardTitle}>Account Summary</h3>
        <div className={styles.summaryGridNew}>
          {summaries.map((item, i) => (
            <div key={i} className={styles.summaryItem}>
              <div className={styles.summaryInfo}>
                <h4>{item.label}</h4>
                <h2>{item.value}</h2>
              </div>
              <div className={styles.summaryIconBox} style={{ background: item.color }}>
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.activePlansSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
             <span style={{ color: '#15803d' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
             </span> 
             Active Plan(s) (0)
          </div>
        </div>
        <div className={styles.emptyState}>
           <div className={styles.emptyIcon}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
           </div>
           <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '0.9rem' }}>You do not have an active investment plan at the moment.</p>
           <button className={styles.buyBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Buy a plan
           </button>
        </div>
      </div>

      <div className={styles.transactionsCard}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px' }}>
           <h3 style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#15803d' }}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </span> 
              Recent transactions (5)
           </h3>
           <a href="#" style={{ fontSize: '0.85rem', color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View all transactions
           </a>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: '22/11/2025', type: 'Profit', amount: '$220,500.00' },
              { date: '21/11/2025', type: 'Bonus', amount: '$5,000.00' },
              { date: '21/11/2025', type: 'Profit', amount: '$1,235,000.00' },
              { date: '21/11/2025', type: 'Withdrawal', amount: '$443,150.00' },
              { date: '21/11/2025', type: 'Deposit', amount: '$315,000.00' },
            ].map((tx, i) => (
              <tr key={i}>
                <td style={{ color: '#64748b', fontWeight: 500 }}>{tx.date}</td>
                <td>
                  <span className={styles.badge} style={{ 
                    background: tx.type === 'Profit' ? '#ecfdf5' : tx.type === 'Withdrawal' ? '#fff1f2' : '#f0f9ff',
                    color: tx.type === 'Profit' ? '#10b981' : tx.type === 'Withdrawal' ? '#ef4444' : '#3b82f6'
                  }}>{tx.type}</span>
                </td>
                <td style={{ fontWeight: 700, textAlign: 'right', color: '#1e293b' }}>{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* REFERRAL SECTION */}
      <div className={refStyles.referralBoxWrapper}>
         <div className={refStyles.refIconCircle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
         </div>
         <h3 className={refStyles.refTitleBold}>Refer Us & Earn</h3>
         <p className={refStyles.refSubtitleSmall}>Use the below link to invite your friends and earn 3.00% commission on their investments.</p>
         
         <div className={refStyles.refLinkWhiteBox}>
            <p className={refStyles.refLinkLabelGray}>Your Referral Link</p>
            <div className={refStyles.refInputGroup}>
               <input 
                 className={refStyles.refInputGray}
                 type="text" 
                 readOnly 
                 value="https://mvassets.com/ref/Martinez" 
               />
               <button className={refStyles.refCopyButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
               </button>
            </div>
         </div>

         <div className={refStyles.refCommissionGreenBar}>
            <div className={refStyles.refCommTextInfo}>
               <span className={refStyles.refCommTitleWhite}>Referral Commission</span>
               <span className={refStyles.refCommPercentage}>3.00%</span>
            </div>
            <div className={refStyles.refCommSymbol}>$</div>
         </div>
      </div>

      <div className={styles.noticeBox}>
         <h4 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#94a3b8' }}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </span>
            Investment Notice
         </h4>
         <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.8', marginTop: '12px' }}>
            Your investment portfolio is managed by our expert team with over 140 years of experience in the energy sector. All investments are subject to market risks and regulatory compliance.
         </p>
      </div>
    </div>
  );
}
