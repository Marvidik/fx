"use client";

import React, { useState } from 'react';
import styles from '../Dashboard.module.css';

export default function PlansPage() {
  const [amount, setAmount] = useState('1000');
  const [selectedPlan, setSelectedPlan] = useState('Basic Plan');

  const quickAmounts = ['100', '250', '500', '1,000', '1,500', '2,000'];

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.pageTitle}>Get started with your investment</h2>
      
      <div className={styles.plansLayout}>
        <div className={styles.plansSelectionCol}>
          <div className={styles.card} style={{ marginBottom: '20px' }}>
            <div className={styles.planSelectorBox}>
              <div className={styles.planIconCircle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
              </div>
              <select 
                className={styles.planDropdown} 
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
              >
                <option>Basic Plan</option>
                <option>Standard Plan</option>
                <option>Premium Plan</option>
              </select>
            </div>
          </div>

          <div className={styles.card} style={{ marginBottom: '20px' }}>
            <h4 className={styles.selectionTitle}>Choose Quick Amount to Invest</h4>
            <div className={styles.quickAmountGrid}>
              {quickAmounts.map((q) => (
                <button 
                  key={q} 
                  className={`${styles.quickAmountBtn} ${amount === q.replace(',','') ? styles.quickAmountBtnActive : ''}`}
                  onClick={() => setAmount(q.replace(',',''))}
                >
                  ${q}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.card} style={{ marginBottom: '20px' }}>
            <h4 className={styles.selectionTitle}>Or Enter Your Amount</h4>
            <div className={styles.amountInputBox}>
              <input 
                type="text" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className={styles.largeAmountInput}
              />
            </div>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkbox} />
              Auto Reinvest
            </label>
          </div>

          <div className={styles.card}>
            <h4 className={styles.selectionTitle}>Choose Payment Method</h4>
            <div className={styles.paymentMethodItem}>
               <div className={styles.paymentMethodIcon}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
               </div>
               <div className={styles.paymentMethodInfo}>
                 <span>Account Balance</span>
                 <span className={styles.paymentBalance}>$1,332,355.00</span>
               </div>
               <input type="radio" name="payment" defaultChecked className={styles.radioLarge} />
            </div>
          </div>
        </div>

        <aside className={styles.plansSidebarCol}>
          <div className={styles.card} style={{ padding: '0' }}>
            <div className={styles.detailsHeader}>
              Your Investment Details
            </div>
            <div className={styles.detailsContent}>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Name of plan</span>
                <span className={styles.detailsValueLink}>{selectedPlan}</span>
              </div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Plan Price</span>
                <span className={styles.detailsValue}>$50</span>
              </div>
              <div className={styles.detailsDivider}></div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Duration</span>
                <span className={styles.detailsValue}>24 hours</span>
              </div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Profit</span>
                <span className={styles.detailsValue}>8% Hourly</span>
              </div>
              <div className={styles.detailsDivider}></div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Minimum Deposit</span>
                <span className={styles.detailsValue}>$50</span>
              </div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Maximum Deposit</span>
                <span className={styles.detailsValue}>$499</span>
              </div>
              <div className={styles.detailsDivider}></div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Minimum Return</span>
                <span className={styles.detailsValue}>8%</span>
              </div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Maximum Return</span>
                <span className={styles.detailsValue}>9%</span>
              </div>
              <div className={styles.detailsDivider}></div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Bonus</span>
                <span className={styles.detailsValue}>$0</span>
              </div>
              <div className={styles.detailsDivider}></div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Payment method:</span>
                <span className={styles.detailsValue}>Account Balance</span>
              </div>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Amount to Invest:</span>
                <span className={styles.totalValue}>${amount === '' ? '0' : Number(amount).toLocaleString()}</span>
              </div>
              <button className={styles.confirmInvestBtn}>Confirm & Invest</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
