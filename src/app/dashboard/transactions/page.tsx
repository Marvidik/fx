"use client";

import React, { useState, useEffect } from 'react';
import styles from '../Dashboard.module.css';
import { authService } from '@/services/authService';

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState('deposit');
  const [deposits, setDeposits] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [depData, withData] = await Promise.all([
          authService.getDeposits(),
          authService.getWithdrawals()
        ]);
        setDeposits(depData || []);
        setWithdrawals(withData || []);
      } catch (err) {
        console.error("Failed to fetch transaction data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (amount: number | string) => {
    const val = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  const renderStatus = (status: boolean) => {
    return (
      <span className={styles.badge} style={{ 
        background: status ? '#ecfdf5' : '#fff1f2', 
        color: status ? '#10b981' : '#ef4444' 
      }}>
        {status ? 'Processed' : 'Pending'}
      </span>
    );
  };

  const currentData = activeTab === 'deposit' ? deposits : withdrawals;

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
                  <th>RECEIVING MODE</th>
                  <th>STATUS</th>
                  <th>DATE CREATED</th>
                </tr>
              )}
            </thead>
            <tbody>
              {loading ? (
                [1, 2, 3].map(i => (
                  <tr key={i}>
                    <td colSpan={activeTab === 'deposit' ? 4 : 4}><div style={{ height: '20px', width: '100%', background: '#f1f5f9', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }}></div></td>
                  </tr>
                ))
              ) : currentData.length > 0 ? (
                currentData.map((tx, i) => (
                  <tr key={i}>
                    <td style={{fontWeight: 700}}>{formatCurrency(tx.amount)}</td>
                    <td>{tx.coin?.toUpperCase() || 'N/A'}</td>
                    <td>{renderStatus(tx.status)}</td>
                    <td style={{ color: '#64748b' }}>{formatDate(tx.date)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={activeTab === 'deposit' ? 4 : 4} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.tableFooter}>
          <p>Showing {loading ? 0 : currentData.length} entries</p>
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
