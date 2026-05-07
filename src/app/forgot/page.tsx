"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../Auth.module.css';
import { authService } from '@/services/authService';
import { useLanguage } from '@/context/LanguageContext';

export default function ForgotPassword() {
  const { t } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.requestOtp(email);
      router.push(`/verify-otp?email=${encodeURIComponent(email)}&type=reset`);
    } catch (err: any) {
      setError(err.message || "Failed to send reset code. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  const MailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  );

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard} style={{ maxWidth: '500px' }}>
        <div className={styles.authHeaderNew}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Image src="/logo.png" alt="ZynthrixFX Logo" width={240} height={60} style={{ objectFit: 'contain', mixBlendMode: 'multiply' }} />
          </div>
          <h1>{t.resetPassword}</h1>
          <p>{t.resetDesc}</p>
        </div>

        <div className={styles.authContentNew}>
          {error && (
            <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form className={styles.authForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>{t.emailAddress}</label>
              <div className={styles.inputWrapper}>
                <span style={{ color: '#94a3b8' }}><MailIcon /></span>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder={t.enterRegisteredEmail} 
                  required 
                />
              </div>
            </div>

            <button type="submit" className={styles.submitBtnNew} disabled={loading} style={{ margin: '30px auto 0' }}>
              {loading ? t.sendingCode : t.sendResetCode}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Link href="/login" style={{ color: '#127a6f', fontWeight: 700, textDecoration: 'none' }}>{t.backToSignIn}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
