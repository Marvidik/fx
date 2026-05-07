"use client";

import React, { useState, useEffect } from 'react';
import styles from '../Dashboard.module.css';
import { authService } from '@/services/authService';

export default function ProfitHistoryPage() {
  const [profits, setProfits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authService.getProfits();
        setProfits(data.profits || []);
      } catch (err) {
        console.error("Failed to fetch profits:", err);
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
    return new Date(dateStr).toLocaleDateString();
  };

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
              {loading ? (
                [1, 2, 3].map(i => (
                  <tr key={i}>
                    <td><div style={{ height: '20px', width: '100px', background: '#f1f5f9', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }}></div></td>
                    <td><div style={{ height: '20px', width: '80px', background: '#f1f5f9', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }}></div></td>
                    <td><div style={{ height: '20px', width: '60px', background: '#f1f5f9', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }}></div></td>
                    <td><div style={{ height: '20px', width: '120px', background: '#f1f5f9', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }}></div></td>
                  </tr>
                ))
              ) : profits.length > 0 ? (
                profits.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{row.plan}</td>
                    <td style={{ fontWeight: 700, color: '#10b981' }}>{formatCurrency(row.amount)}</td>
                    <td>
                      <span className={styles.badge} style={{ background: '#ecfdf5', color: '#10b981' }}>{row.type}</span>
                    </td>
                    <td style={{ color: '#64748b' }}>{formatDate(row.date)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No profit records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
