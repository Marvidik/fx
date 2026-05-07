"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../Auth.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { authService } from '@/services/authService';
import { countries } from '@/utils/countries';

export default function Register() {
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    confirmEmail: '',
    phone: '',
    country: '',
    account_type: 'Basic',
    address: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.email !== formData.confirmEmail) {
      setError("Emails do not match");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // Prepare payload (removing confirm fields and adding required format for DOB)
      const payload = {
        full_name: formData.full_name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        account_type: formData.account_type,
        address: formData.address,
        dob: formData.dob ? new Date(formData.dob).toISOString() : new Date().toISOString(),
        password: formData.password
      };

      const response = await authService.register(payload);
      
      // Save session
      authService.setSession(response.token, response.user);
      
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

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

  const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
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
            {error && (
              <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}
            
            <form className={styles.authForm} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><UserIcon /></span>
                    <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Enter your full name" required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Username</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><UserIcon /></span>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Choose a username" required />
                  </div>
                </div>
              </div>

              <div className={styles.formGrid} style={{ marginTop: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Email Address</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><MailIcon /></span>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Confirm Email</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><MailIcon /></span>
                    <input type="email" name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} placeholder="Confirm your email" required />
                  </div>
                </div>
              </div>

              <div className={styles.formGrid} style={{ marginTop: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Phone Number</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><PhoneIcon /></span>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 240 457 2508" required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Country</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><GlobeIcon /></span>
                    <select name="country" value={formData.country} onChange={handleChange} required>
                      <option value="">Select your country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.formGrid} style={{ marginTop: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Account Type</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><UserIcon /></span>
                    <select name="account_type" value={formData.account_type} onChange={handleChange} required>
                      <option value="Basic">Basic</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Date of Birth</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><CalendarIcon /></span>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup} style={{ marginTop: '20px' }}>
                <label>Address</label>
                <div className={styles.inputWrapper}>
                  <span style={{ color: '#94a3b8' }}><MapPinIcon /></span>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your full address" required />
                </div>
              </div>

              <div className={styles.formGrid} style={{ marginTop: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Password</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><LockIcon /></span>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a strong password" required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Confirm Password</label>
                  <div className={styles.inputWrapper}>
                    <span style={{ color: '#94a3b8' }}><LockIcon /></span>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '30px', background: '#f8fafc', padding: '15px', borderRadius: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.95rem' }}>
                  <input type="checkbox" required style={{ width: '18px', height: '18px' }} />
                  <span>I agree with <span style={{ color: '#127a6f', fontWeight: 700 }}>Terms and Conditions</span></span>
                </label>
              </div>

              <button type="submit" className={styles.submitBtnNew} disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
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
