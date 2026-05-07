"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Dashboard.module.css';
import { authService } from '@/services/authService';

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <div style={{ position: 'relative', width: '38px', height: '38px' }}>
      <svg viewBox="0 0 100 100" width="38" height="38">
        <path d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z" fill="#22c55e" />
        <path d="M30 35 L70 35 L75 40 L75 60 L70 65 L30 65 L25 60 L25 40 Z" fill="#fbbf24" />
        <path d="M40 45 L60 45 L60 55 L40 55 Z" fill="#166534" />
      </svg>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
      <span style={{ color: '#22c55e', fontWeight: '700', fontSize: '1.1rem', letterSpacing: '-0.5px' }}>ZYNTHRIX</span>
      <span style={{ color: '#fbbf24', fontWeight: '700', fontSize: '1.1rem', letterSpacing: '0.5px' }}>FX</span>
    </div>
  </div>
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Safely get session on client side
    const session = authService.getSession();
    setUser(session.user);

    const fetchData = async () => {
      try {
        const data = await authService.getDashboardData();
        setDashboardData(data);
      } catch (err) {
        console.error("Layout data fetch error:", err);
      }
    };
    fetchData();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const formatCurrency = (amount: number | string) => {
    const val = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0);
  };

  const navItems = [
    {
      name: 'Home', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ), path: '/dashboard'
    },
    {
      name: 'Deposit', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ), path: '/dashboard/deposit'
    },
    {
      name: 'Withdraw', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ), path: '/dashboard/withdraw'
    },
    {
      name: 'Profit History', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
        </svg>
      ), path: '/dashboard/profit'
    },
    {
      name: 'Transactions', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      ), path: '/dashboard/transactions'
    },
    {
      name: 'Transfer funds', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      ), path: '/dashboard/transfer'
    },
    {
      name: 'Profile', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      ), path: '/dashboard/profile'
    },
    {
      name: 'Trading Plans', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ), path: '/dashboard/plans'
    },
    {
      name: 'My Plans', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ), path: '/dashboard/my-plans'
    },
    {
      name: 'Referrals', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="17" y1="11" x2="23" y2="11" />
        </svg>
      ), path: '/dashboard/referrals'
    },
  ];

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashboardHeaderBg}></div>
      <header className={`${styles.fixedHeader} ${isSidebarOpen ? styles.fixedHeaderHidden : ''}`}>
        <div className={styles.topBar}>
          <div style={{ flex: 1 }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link href="/dashboard/kyc" className={styles.headerKycLink}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
              KYC
            </Link>
            <div className={styles.headerNotifyIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </div>

            {/* Hamburger Button */}
            <button
              className={`${styles.hamburger} ${isSidebarOpen ? styles.hamburgerOpen : ''}`}
              onClick={toggleSidebar}
              aria-label="Toggle Navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={styles.dashboardLayout}>
        <div
          className={`${styles.sidebarOverlay} ${isSidebarOpen ? styles.sidebarOverlayVisible : ''}`}
          onClick={toggleSidebar}
        ></div>

        <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarLogoSection}>
             <Logo />
             <button className={styles.closeSidebarBtn} onClick={toggleSidebar}>&times;</button>
          </div>
          
          <div className={styles.mobileSidebarHeader}>
            <Link href="/dashboard/kyc" className={styles.sidebarKycLink} onClick={() => setIsSidebarOpen(false)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
              KYC Verification
            </Link>
          </div>
          <div className={styles.profileCard}>
            <div className={styles.profileImg}>
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              <div className={styles.statusDot}></div>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '4px' }}>{user?.full_name || '...'}</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.85 }}>online</p>
            <div className={styles.balanceBadge}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="6" x2="12" y2="12" /><line x1="12" y1="12" x2="16" y2="14" /></svg>
              {dashboardData ? formatCurrency(dashboardData.account_balance) : '$ ...'}
            </div>
          </div>

          <nav className={styles.navGrid}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`${styles.navItem} ${pathname === item.path ? styles.navItemActive : ''}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <div className={styles.navItemIcon}>{item.icon}</div>
                {item.name}
              </Link>
            ))}
            <button 
              className={styles.navItem} 
              onClick={() => authService.logout()}
              style={{ border: 'none', background: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', color: '#ef4444' }}
            >
              <div className={styles.navItemIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </div>
              Logout
            </button>
          </nav>
        </aside>

        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
