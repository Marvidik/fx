"use client";

import React, { useState, useEffect } from 'react';
import styles from '../Dashboard.module.css';
import { authService } from '@/services/authService';

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = authService.getSession();
  const [origin, setOrigin] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
    const fetchData = async () => {
      try {
        const data = await authService.getReferrals();
        // Notice the user's data had 'referals' (one 'r')
        setReferrals(data.referals || []);
      } catch (err) {
        console.error("Failed to fetch referrals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const referralLink = `${origin}/${user?.username || ''}`;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.pageTitle}>Refer users to ZynthrixFX community</h2>
      
      <div className={styles.card}>
        <div className={styles.referralHeader}>
          <h3>You can refer users by sharing your referral link:</h3>
          <div className={styles.referralLinkBox}>
            <span className={styles.referralUrl}>{referralLink}</span>
            <div className={styles.copyBtnWrapper}>
              <button className={styles.copyBtnSmall} onClick={handleCopy}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
              {copied && <span className={styles.copyTooltip}>Copied!</span>}
            </div>
          </div>
          <p className={styles.refIdText}>or your Referral ID <br /> <strong>{user?.username || '...'}</strong></p>
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
              {loading ? (
                [1, 2, 3].map(i => (
                  <tr key={i}>
                    <td colSpan={4}><div style={{ height: '20px', width: '100%', background: '#f1f5f9', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }}></div></td>
                  </tr>
                ))
              ) : referrals.length > 0 ? (
                referrals.map((ref, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{ref.client_name}</td>
                    <td>{ref.ref_level}</td>
                    <td>
                      <span className={styles.badge} style={{ 
                        background: ref.client_status === 'active' ? '#ecfdf5' : '#fef3c7', 
                        color: ref.client_status === 'active' ? '#10b981' : '#f59e0b' 
                      }}>
                        {ref.client_status}
                      </span>
                    </td>
                    <td style={{ color: '#64748b' }}>{formatDate(ref.date_registered)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className={styles.emptyTable}>No data available in table</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
