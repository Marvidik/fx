"use client";

import React from 'react';
import styles from '../Dashboard.module.css';

export default function ProfitHistoryPage() {
  const records = [
    { plan: 'Corporate Plan', amount: '220500', type: 'profit', date: '11/22/2025' },
    { plan: 'Basic', amount: '1235000', type: 'profit', date: '11/21/2025' },
  ];

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.pageTitle}>Your ROI history</h2>
      
      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHeadLight}>
              <tr>
                <th>Plan</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row, i) => (
                <tr key={i}>
                  <td>{row.plan}</td>
                  <td>{row.amount}</td>
                  <td>
                    <span className={styles.statusBadgeGreen}>{row.type}</span>
                  </td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
