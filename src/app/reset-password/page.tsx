"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../Auth.module.css';
import { authService } from '@/services/authService';
import Link from 'next/link';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await authService.resetPassword({
        email: email,
        new_password: formData.password
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );

  const EyeIcon = ({ show }: { show: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {show ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );

  if (success) {
    return (
      <div className={styles.authPage}>
        <div className={styles.authCard} style={{ maxWidth: '500px', padding: '40px', textAlign: 'center' }}>
          <div style={{ color: '#127a6f', fontSize: '4rem', marginBottom: '20px' }}>✓</div>
          <h1 style={{ marginBottom: '10px' }}>Success!</h1>
          <p style={{ color: '#64748b', marginBottom: '30px' }}>Your password has been successfully reset. You will be redirected to the login page in a few seconds.</p>
          <Link href="/login" className={styles.submitBtnNew} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard} style={{ maxWidth: '500px' }}>
        <div className={styles.authHeaderNew}>
          <h1>Create New Password</h1>
          <p>Set a strong password for your account</p>
        </div>

        <div className={styles.authContentNew}>
          {error && (
            <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form className={styles.authForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>New Password</label>
              <div className={styles.inputWrapper}>
                <span style={{ color: '#94a3b8' }}><LockIcon /></span>
                <input 
                  type={showPassword ? "text" : "password"}
                  value={formData.password} 
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                  placeholder="Enter new password" 
                  required 
                />
                <span 
                  style={{ left: 'auto', right: '15px', cursor: 'pointer', color: '#94a3b8', zIndex: 10, position: 'absolute' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <EyeIcon show={showPassword} />
                </span>
              </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: '20px' }}>
              <label>Confirm New Password</label>
              <div className={styles.inputWrapper}>
                <span style={{ color: '#94a3b8' }}><LockIcon /></span>
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword} 
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
                  placeholder="Confirm new password" 
                  required 
                />
                <span 
                  style={{ left: 'auto', right: '15px', cursor: 'pointer', color: '#94a3b8', zIndex: 10, position: 'absolute' }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <EyeIcon show={showConfirmPassword} />
                </span>
              </div>
            </div>

            <button type="submit" className={styles.submitBtnNew} disabled={loading} style={{ margin: '30px auto 0' }}>
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
