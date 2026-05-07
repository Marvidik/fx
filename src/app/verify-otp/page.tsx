"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from '../Auth.module.css';
import { authService } from '@/services/authService';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

function OTPContent() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const type = searchParams.get('type') || 'register'; // 'register' or 'reset'

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prev = (e.currentTarget.previousSibling as HTMLInputElement);
      if (prev) prev.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError(t.enterFullCode);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await authService.verifyOtp(email, otpCode);
      setSuccess(t.verificationSuccessful);
      
      setTimeout(() => {
        if (type === 'reset') {
          router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        } else {
          router.push('/login');
        }
      }, 1500);
    } catch (err: any) {
      setError(err.message || t.invalidOtp);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await authService.requestOtp(email);
      setSuccess(t.otpResent);
    } catch (err: any) {
      setError(err.message || t.failedResend);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard} style={{ maxWidth: '500px' }}>
        <div className={styles.authHeaderNew}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Image src="/logo.png" alt="ZynthrixFX Logo" width={240} height={60} style={{ objectFit: 'contain', mixBlendMode: 'multiply' }} />
          </div>
          <h1>{t.verifyOtp}</h1>
          <p>{t.enterCodeSentTo} <strong>{email}</strong></p>
        </div>

        <div className={styles.authContentNew} style={{ textAlign: 'center' }}>
          {error && (
            <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  onFocus={e => e.target.select()}
                  style={{
                    width: '50px',
                    height: '60px',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    borderRadius: '10px',
                    border: '2px solid #e2e8f0',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    background: '#f8fafc'
                  }}
                  required
                />
              ))}
            </div>

            <button type="submit" className={styles.submitBtnNew} disabled={loading} style={{ margin: '0 auto' }}>
              {loading ? t.verifying : t.verifyOtp}
            </button>
          </form>

          <div style={{ marginTop: '30px', color: '#64748b', fontSize: '0.95rem' }}>
            {t.didntReceiveCode}{' '}
            <button 
              onClick={handleResend} 
              disabled={loading}
              style={{ background: 'none', border: 'none', color: '#127a6f', fontWeight: 700, cursor: 'pointer', padding: 0 }}
            >
              {t.resendCode}
            </button>
          </div>

          <div style={{ marginTop: '20px' }}>
            <Link href="/login" style={{ color: '#64748b', fontSize: '0.9rem', textDecoration: 'none' }}>← {t.backToLogin}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOTP() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <OTPContent />
    </Suspense>
  );
}
