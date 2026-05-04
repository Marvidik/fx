"use client";

import React, { useState } from 'react';
import styles from '../Dashboard.module.css';

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState('deposit');

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.pageTitle}>Transaction Records</h2>
      
      <div className={styles.card}>
        <div className={styles.tabHeaderRow}>
          <button 
            className={`${styles.transactionTab} ${activeTab === 'deposit' ? styles.transactionTabActive : ''}`}
            onClick={() => setActiveTab('deposit')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Deposit
          </button>
          <button 
            className={`${styles.transactionTab} ${activeTab === 'withdrawal' ? styles.transactionTabActive : ''}`}
            onClick={() => setActiveTab('withdrawal')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Withdrawal
          </button>
        </div>

        <div className={styles.tableFilterBar}>
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
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
             <input type="text" placeholder="Search..." className={styles.searchInput} />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHeadLight}>
              {activeTab === 'deposit' ? (
                <tr>
                  <th>AMOUNT</th>
                  <th>PAYMENT MODE</th>
                  <th>STATUS</th>
                  <th>DATE CREATED</th>
                </tr>
              ) : (
                <tr>
                  <th>AMOUNT REQUESTED</th>
                  <th>AMOUNT + CHARGES</th>
                  <th>RECEIVING MODE</th>
                  <th>STATUS</th>
                  <th>DATE CREATED</th>
                </tr>
              )}
            </thead>
            <tbody>
              {activeTab === 'deposit' ? (
                <tr>
                  <td style={{fontWeight: 700}}>$315000</td>
                  <td>BTC</td>
                  <td><span className={styles.statusBadgeGreen}>True</span></td>
                  <td>Fri, Nov 21, 2025, 8:43 PM</td>
                </tr>
              ) : (
                <tr>
                  <td style={{fontWeight: 700}}>$443150</td>
                  <td style={{fontWeight: 700}}>$443150</td>
                  <td>Bitcoin</td>
                  <td><span className={styles.statusBadgeGreen}>true</span></td>
                  <td>Fri, Nov 21, 2025, 8:48 PM</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.tableFooter}>
          <p>Showing 1 to 1 of 1 entries</p>
          <div className={styles.pagination}>
            <button disabled>Previous</button>
            <button className={styles.pageBtnActive}>1</button>
            <button disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
