"use client";

import React from 'react';
import styles from '../Dashboard.module.css';

export default function MyPlansPage() {
  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.pageTitle}>My Investment Plans (All)</h2>
      
      <div className={styles.card} style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        <div className={styles.planHeader}>
          <div className={styles.planTitleBox}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            <span>Active Plan(s)</span>
            <span className={styles.countBadge}>1</span>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Plan</th>
                <th>Amount</th>
                <th>Profit</th>
                <th>Status</th>
                <th>Reinvest</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Basic Plan</td>
                <td style={{ fontWeight: 700 }}>$100</td>
                <td style={{ color: '#22c55e', fontWeight: 600 }}>$0</td>
                <td>
                  <span className={styles.statusBadgeGreen}>Active</span>
                </td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <p className={styles.footerText}>All Rights Reserved © Metavault Assets 2025</p>
    </div>
  );
}
