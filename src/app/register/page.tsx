"use client";

import Link from 'next/link';
import styles from '../Auth.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Register() {
  const { t } = useLanguage();

  const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const MailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );

  const GlobeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );

  const MapPinIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );

  const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );

  return (
    <>
      <div className={styles.authPage}>
        <div className={styles.authCard}>
          <div className={styles.authHeaderNew}>
            <h1>Create Account</h1>
            <p>Join our community today</p>
          </div>

          <div className={styles.authContentNew}>
            <form className={styles.authForm}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><UserIcon /></span>
                    <input type="text" placeholder="Enter your full name" required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Username</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><UserIcon /></span>
                    <input type="text" placeholder="Choose a username" required />
                  </div>
                </div>
              </div>

              <div className={styles.formGrid} style={{ marginTop: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Email Address</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><MailIcon /></span>
                    <input type="email" placeholder="Enter your email" required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Confirm Email</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><MailIcon /></span>
                    <input type="email" placeholder="Confirm your email" required />
                  </div>
                </div>
              </div>

              <div className={styles.formGrid} style={{ marginTop: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Phone Number</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><PhoneIcon /></span>
                    <input type="tel" placeholder="+1 240 457 2508" required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Country</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><GlobeIcon /></span>
                    <select required>
                      <option value="">Enter your country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.formGroup} style={{ marginTop: '20px' }}>
                <label>Account Type</label>
                <div className={styles.inputWrapper}>
                  <span style={{ color: '#94a3b8' }}><UserIcon /></span>
                  <select required>
                    <option value="">Choose account type</option>
                    <option value="individual">Individual</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup} style={{ marginTop: '20px' }}>
                <label>Address</label>
                <div className={styles.inputWrapper}>
                  <span style={{ color: '#94a3b8' }}><MapPinIcon /></span>
                  <input type="text" placeholder="Enter your full address" required />
                </div>
              </div>

              <div className={styles.formGrid} style={{ marginTop: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Password</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><LockIcon /></span>
                    <input type="password" placeholder="Create a strong password" required />
                    <span style={{ left: 'auto', right: '15px', cursor: 'pointer', color: '#94a3b8' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </span>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Confirm Password</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><LockIcon /></span>
                    <input type="password" placeholder="Confirm your password" required />
                    <span style={{ left: 'auto', right: '15px', cursor: 'pointer', color: '#94a3b8' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '30px', background: '#f8fafc', padding: '15px', borderRadius: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.95rem' }}>
                  <input type="checkbox" required style={{ width: '18px', height: '18px' }} />
                  <span>I agree with <span style={{ color: '#127a6f', fontWeight: 700 }}>Terms and Conditions</span></span>
                </label>
              </div>

              <button type="submit" className={styles.submitBtnNew}>Create Account</button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '30px', color: '#64748b' }}>
              Already have an account? <Link href="/login" style={{ color: '#127a6f', fontWeight: 700 }}>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
