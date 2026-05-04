"use client";

import React from 'react';
import styles from '../Dashboard.module.css';

export default function ReferralsPage() {
  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.pageTitle}>Refer users to Metavault Assets community</h2>
      
      <div className={styles.card}>
        <div className={styles.referralHeader}>
          <h3>You can refer users by sharing your referral link:</h3>
          <div className={styles.referralLinkBox}>
            <span className={styles.referralUrl}>https://mvassets.com/ref/Martinez</span>
            <button className={styles.copyBtnSmall}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
          <p className={styles.refIdText}>or your Referral ID <br /> <strong>Martinez</strong></p>
        </div>
      </div>

      <div className={styles.card} style={{ marginTop: '30px' }}>
        <div className={styles.tableHeader}>
          <h3 className={styles.summaryCardTitle}>Your Referrals</h3>
          <div className={styles.tableActions}>
            <div className={styles.entriesSelector}>
              Show 
              <select className={styles.selectSmall}>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              entries
            </div>
            <div className={styles.searchBox}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Search referrals..." className={styles.searchInput} />
            </div>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>CLIENT NAME</th>
                <th>REF. LEVEL</th>
                <th>CLIENT STATUS</th>
                <th>DATE REGISTERED</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className={styles.emptyTable}>No data available in table</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
