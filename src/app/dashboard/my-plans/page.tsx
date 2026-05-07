"use client";

import React, { useState, useEffect } from 'react';
import styles from '../Dashboard.module.css';
import { authService } from '@/services/authService';

export default function MyPlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authService.getActiveInvestments();
        setPlans(data || []);
      } catch (err) {
        console.error("Failed to fetch active investments:", err);
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

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.pageTitle}>My Investment Plans (All)</h2>
      
      <div className={styles.card} style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        <div className={styles.planHeader}>
          <div className={styles.planTitleBox}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            <span>Active Plan(s)</span>
            <span className={styles.countBadge}>{loading ? '...' : plans.length}</span>
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
              {loading ? (
                [1, 2, 3].map(i => (
                  <tr key={i}>
                    <td><div style={{ height: '20px', width: '100px', background: '#f1f5f9', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }}></div></td>
                    <td><div style={{ height: '20px', width: '80px', background: '#f1f5f9', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }}></div></td>
                    <td><div style={{ height: '20px', width: '80px', background: '#f1f5f9', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }}></div></td>
                    <td><div style={{ height: '20px', width: '60px', background: '#f1f5f9', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }}></div></td>
                    <td><div style={{ height: '20px', width: '20px', background: '#f1f5f9', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }}></div></td>
                  </tr>
                ))
              ) : plans.length > 0 ? (
                plans.map((plan, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{plan.plan_name}</td>
                    <td style={{ fontWeight: 700 }}>{formatCurrency(plan.amount)}</td>
                    <td style={{ color: '#22c55e', fontWeight: 600 }}>{formatCurrency(plan.profit_earned)}</td>
                    <td>
                      <span className={styles.badge} style={{ 
                        background: plan.is_active ? '#ecfdf5' : '#fff1f2', 
                        color: plan.is_active ? '#10b981' : '#ef4444' 
                      }}>
                        {plan.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={plan.auto_reinvest} 
                        onChange={async () => {
                          const originalPlans = [...plans];
                          // Optimistic update
                          const updated = plans.map(p => 
                            p.id === plan.id ? { ...p, auto_reinvest: !p.auto_reinvest } : p
                          );
                          setPlans(updated);
                          
                          try {
                            await authService.toggleAutoReinvest(plan.id);
                          } catch (err) {
                            setPlans(originalPlans);
                            console.error("Toggle auto-reinvest failed:", err);
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No active investment plans found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <p className={styles.footerText}>All Rights Reserved © ZynthrixFX 2026</p>
    </div>
  );
}
