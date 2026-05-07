"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../Auth.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { authService } from '@/services/authService';

export default function Login() {
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password
      });

      // Save session
      authService.setSession(response.token, response);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const MailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  );

  const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );

  const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );

  const BullIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#0d4a44">
      <path d="M12 2L15.09 6.26L20 7.27L16.5 10.97L17.18 16.14L12 14L6.82 16.14L7.5 10.97L4 7.27L8.91 6.26L12 2Z" />
    </svg>
  );

  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.loginLeft}>
          <div style={{ position: 'absolute', top: '50px', left: '50px' }}>
            <div style={{ color: 'white', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '45px', height: '45px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BullIcon />
              </div>
              ZynthrixFX
            </div>
          </div>
          <h1>Welcome to Your <br /> Professional Portal</h1>
          <p>Secure access to your corporate dashboard and business tools. Manage your portfolio with enterprise-grade security.</p>

          <div className={styles.loginFeatures}>
            <div className={styles.loginFeatureItem}>
              <span style={{ color: '#1de9b6' }}>🛡️</span> 256-bit SSL encryption
            </div>
            <div className={styles.loginFeatureItem}>
              <span style={{ color: '#1de9b6' }}>🔐</span> Multi-factor authentication
            </div>
            <div className={styles.loginFeatureItem}>
              <span style={{ color: '#1de9b6' }}>🕒</span> 24/7 security monitoring
            </div>
          </div>

          <div style={{ marginTop: 'auto', fontSize: '0.9rem', opacity: 0.6 }}>
            © 2026 ZynthrixFX. All rights reserved.
          </div>
        </div>

        <div className={styles.loginRight}>
          <div className={styles.loginCardNew}>
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Sign In</h2>
              <p style={{ color: '#64748b' }}>Access your account</p>
            </div>

            {error && (
              <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            <form className={styles.authForm} style={{ textAlign: 'left' }} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <div className={styles.inputWrapper}>
                  <span style={{ color: '#94a3b8' }}><MailIcon /></span>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                </div>
              </div>

              <div className={styles.formGroup} style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label>Password</label>
                </div>
                <div className={styles.inputWrapper}>
                  <span style={{ color: '#94a3b8' }}><LockIcon /></span>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
                  <span style={{ left: 'auto', right: '15px', cursor: 'pointer', color: '#94a3b8' }}><EyeIcon /></span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', fontSize: '0.85rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} /> Remember me
                </label>
                <Link href="/forgot" style={{ color: '#127a6f', textDecoration: 'none', fontWeight: 700 }}>Forgot password?</Link>
              </div>

              <button type="submit" className={styles.submitBtnNew} style={{ maxWidth: '100%' }} disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In →'}
              </button>
            </form>

            <div style={{ marginTop: '30px', fontSize: '0.9rem', color: '#64748b' }}>
              New to ZynthrixFX?
              <div style={{ marginTop: '15px' }}>
                <Link href="/register" style={{ color: '#127a6f', fontWeight: 700, textDecoration: 'none' }}>Create account →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
