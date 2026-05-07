"use client";

import React, { useState, useEffect } from 'react';
import styles from '../Dashboard.module.css';
import { authService } from '@/services/authService';
import StatusModal from '@/components/StatusModal';

export default function PlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<number | string>('');
  const [amount, setAmount] = useState('50');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [investing, setInvesting] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: 'success' as 'success' | 'error', title: '', message: '' });

  const quickAmounts = ['100', '250', '500', '1,000', '1,500', '2,000'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansData, dashData] = await Promise.all([
          authService.getPlans(),
          authService.getDashboardData()
        ]);
        
        setPlans(plansData);
        setDashboardData(dashData);
        
        if (plansData.length > 0) {
          setSelectedPlanId(plansData[0].id);
          setAmount(plansData[0].min_deposit.toString());
        }
      } catch (err) {
        console.error("Failed to fetch plans data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInvest = async () => {
    if (!selectedPlanId || !amount) return;
    setInvesting(true);
    try {
      await authService.createInvestment({
        plan: selectedPlanId,
        amount: Number(amount),
        auto_reinvest: true // Default as per checkbox if I add state for it
      });
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Investment Successful',
        message: 'Your investment has been successfully created.'
      });
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Investment Failed',
        message: err.message || 'Failed to create investment.'
      });
    } finally {
      setInvesting(false);
    }
  };

  const selectedPlan = plans.find(p => p.id === Number(selectedPlanId));

  const formatCurrency = (val: any) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0);
  };

  const isDataReady = plans.length > 0 && dashboardData;

  if (loading && plans.length === 0) {
    // Optionally show skeletons here, but for now we'll just show the structure with defaults
  }

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
                value={selectedPlanId}
                disabled={loading}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedPlanId(id);
                  const plan = plans.find(p => p.id === Number(id));
                  if (plan) setAmount(plan.min_deposit.toString());
                }}
              >
                {plans.length > 0 ? (
                  plans.map(plan => (
                    <option key={plan.id} value={plan.id}>{plan.name}</option>
                  ))
                ) : (
                  <option value="">Loading plans...</option>
                )}
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
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className={styles.largeAmountInput}
              />
            </div>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkbox} defaultChecked />
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
                 <span className={styles.paymentBalance}>{formatCurrency(dashboardData?.account_balance)}</span>
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
                <span className={styles.detailsValueLink}>{selectedPlan?.name || '...'}</span>
              </div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Plan Price</span>
                <span className={styles.detailsValue}>{formatCurrency(selectedPlan?.price)}</span>
              </div>
              <div className={styles.detailsDivider}></div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Duration</span>
                <span className={styles.detailsValue}>{selectedPlan?.duration} hours</span>
              </div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Profit</span>
                <span className={styles.detailsValue}>{selectedPlan?.profit_percent}%</span>
              </div>
              <div className={styles.detailsDivider}></div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Minimum Deposit</span>
                <span className={styles.detailsValue}>{formatCurrency(selectedPlan?.min_deposit)}</span>
              </div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Maximum Deposit</span>
                <span className={styles.detailsValue}>{formatCurrency(selectedPlan?.max_deposit)}</span>
              </div>
              <div className={styles.detailsDivider}></div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Minimum Return</span>
                <span className={styles.detailsValue}>{selectedPlan?.min_return_percent}%</span>
              </div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Maximum Return</span>
                <span className={styles.detailsValue}>{selectedPlan?.max_return_percent}%</span>
              </div>
              <div className={styles.detailsDivider}></div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Bonus</span>
                <span className={styles.detailsValue}>{formatCurrency(selectedPlan?.bonus)}</span>
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
              <button 
                className={`${styles.confirmInvestBtn} ${isDataReady ? styles.confirmInvestBtnActive : ''}`}
                onClick={handleInvest}
                disabled={!isDataReady || investing}
              >
                {investing ? 'Processing...' : 'Confirm & Invest'}
              </button>
            </div>
          </div>
        </aside>
      </div>

      <StatusModal 
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
}
