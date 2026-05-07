"use client";

import React, { useState, useRef } from 'react';
import styles from '../Dashboard.module.css';
import { authService } from '@/services/authService';
import StatusModal from '@/components/StatusModal';

export default function KYCPage() {
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState('passport');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: 'success' as 'success' | 'error', title: '', message: '' });
  
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    social_username: '',
    address_line: '',
    city: '',
    state: '',
    nationality: '',
    all_info_confirmed: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.all_info_confirmed) {
      alert("Please confirm all information is correct.");
      return;
    }
    if (!frontFile || !backFile) {
      alert("Please upload both front and back sides of your document.");
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      // Append personal details
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value.toString());
      });
      // Append document type and files
      payload.append('document_type', docType);
      payload.append('document_front', frontFile);
      payload.append('document_back', backFile);

      await authService.submitKyc(payload);
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Submission Successful',
        message: 'Your KYC application has been submitted successfully.'
      });
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Submission Failed',
        message: err.message || 'Failed to submit KYC application.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.card} style={{ textAlign: 'center', padding: '60px 40px' }}>
          <h2 className={styles.kycTitleMain}>KYC Verification</h2>
          <p className={styles.kycSubtitleMain}>
            To comply with regulation, each participant will have to go through identity verification (KYC/AML) to prevent fraud causes.
          </p>

          <div className={styles.kycIconCircle}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>

          <p className={styles.kycNoticeText}>
            You have not submitted your necessary documents to verify your identity. In order to enjoy our investment system, please verify your identity.
          </p>

          <button className={styles.kycStartBtn} onClick={() => setStep(2)}>
            Click here to complete your KYC
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h3 className={styles.kycStepTitle}>Begin your ID-Verification</h3>
        <p className={styles.kycStepSubtitle}>
          To comply with regulation, each participant will have to go through identity verification (KYC/AML) to prevent fraud causes.
        </p>
      </div>

      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <div className={styles.kycFormSection}>
            <h4 className={styles.kycFormHeader}>Personal Details</h4>
            <p className={styles.kycFormSubheader}>Your simple personal information required for Identification</p>
            <p className={styles.kycWarningText}>Please type carefully and fill out the form with your personal details. You can't edit these details once you submitted the form.</p>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>First name <span style={{color: 'red'}}>*</span></label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className={styles.formInput} required />
              </div>
              <div className={styles.formGroup}>
                <label>Last name <span style={{color: 'red'}}>*</span></label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className={styles.formInput} required />
              </div>
              <div className={styles.formGroup}>
                <label>Email <span style={{color: 'red'}}>*</span></label>
                <div className={styles.iconInputWrapper}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.formInputNoPad} required />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number <span style={{color: 'red'}}>*</span></label>
                <div className={styles.iconInputWrapper}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} className={styles.formInputNoPad} required />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Date of birth <span style={{color: 'red'}}>*</span></label>
                <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className={styles.formInput} required />
              </div>
              <div className={styles.formGroup}>
                <label>Twitter or Facebook username <span style={{color: 'red'}}>*</span></label>
                <input type="text" name="social_username" value={formData.social_username} onChange={handleChange} className={styles.formInput} required />
              </div>
            </div>
          </div>

          <div className={styles.kycFormSection} style={{ marginTop: '40px' }}>
            <h4 className={styles.kycFormHeader}>Your Address</h4>
            <p className={styles.kycFormSubheader}>Your simple location information required for Identification</p>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Address line <span style={{color: 'red'}}>*</span></label>
                <div className={styles.iconInputWrapper}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <input type="text" name="address_line" value={formData.address_line} onChange={handleChange} className={styles.formInputNoPad} required />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>City <span style={{color: 'red'}}>*</span></label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} className={styles.formInput} required />
              </div>
              <div className={styles.formGroup}>
                <label>State <span style={{color: 'red'}}>*</span></label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} className={styles.formInput} required />
              </div>
              <div className={styles.formGroup}>
                <label>Nationality <span style={{color: 'red'}}>*</span></label>
                <div className={styles.iconInputWrapper}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} className={styles.formInputNoPad} required />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.kycFormSection} style={{ marginTop: '40px' }}>
            <h4 className={styles.kycFormHeader}>Document Upload</h4>
            <p className={styles.kycFormSubheader}>Your simple personal document required for Identification</p>
            
            <div className={styles.docTypeSelection}>
               <button 
                type="button"
                className={`${styles.docTypeBtn} ${docType === 'passport' ? styles.docTypeBtnActive : ''}`}
                onClick={() => setDocType('passport')}
               >
                  <span className={styles.docIcon}>🛂</span> Int'l Passport
               </button>
               <button 
                type="button"
                className={`${styles.docTypeBtn} ${docType === 'id' ? styles.docTypeBtnActive : ''}`}
                onClick={() => setDocType('id')}
               >
                  <span className={styles.docIcon}>🆔</span> National ID
               </button>
               <button 
                type="button"
                className={`${styles.docTypeBtn} ${docType === 'license' ? styles.docTypeBtnActive : ''}`}
                onClick={() => setDocType('license')}
               >
                  <span className={styles.docIcon}>🚗</span> Drivers License
               </button>
            </div>

            <div className={styles.kycRequirements}>
               <p style={{fontWeight: 600, color: '#1e293b', marginBottom: '10px'}}>To avoid delays when verifying account, Please make sure your document meets the criteria below:</p>
               <div className={styles.requirementItem}>
                  <span className={styles.checkIcon}>✓</span> Chosen credential must not have expired.
               </div>
               <div className={styles.requirementItem}>
                  <span className={styles.checkIcon}>✓</span> Document should be good condition and clearly visible.
               </div>
               <div className={styles.requirementItem}>
                  <span className={styles.checkIcon}>✓</span> Make sure that there is no light glare on the card.
               </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: '25px' }}>
              <label>Upload front side <span style={{color: 'red'}}>*</span></label>
              <input 
                type="file" 
                ref={frontInputRef} 
                style={{ display: 'none' }} 
                accept="image/*"
                onChange={(e) => setFrontFile(e.target.files?.[0] || null)}
              />
              <div className={styles.fileUploadBox} onClick={() => frontInputRef.current?.click()}>
                 <div className={styles.fileUploadInfo}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                   <span>{frontFile ? frontFile.name : 'Choose file'}</span>
                 </div>
                 <div className={styles.docPreview}>{frontFile ? '📄' : '🪪'}</div>
              </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: '20px' }}>
              <label>Upload back side <span style={{color: 'red'}}>*</span></label>
              <input 
                type="file" 
                ref={backInputRef} 
                style={{ display: 'none' }} 
                accept="image/*"
                onChange={(e) => setBackFile(e.target.files?.[0] || null)}
              />
              <div className={styles.fileUploadBox} onClick={() => backInputRef.current?.click()}>
                 <div className={styles.fileUploadInfo}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                   <span>{backFile ? backFile.name : 'Choose file'}</span>
                 </div>
                 <div className={styles.docPreview}>{backFile ? '📄' : '🪪'}</div>
              </div>
            </div>

            <div className={styles.checkboxGroup} style={{ marginTop: '30px' }}>
               <input 
                 type="checkbox" 
                 id="confirmKyc" 
                 name="all_info_confirmed"
                 checked={formData.all_info_confirmed}
                 onChange={handleChange}
               />
               <label htmlFor="confirmKyc">All The Information I Have Entered Is Correct.</label>
            </div>

            <button type="submit" className={styles.submitKycBtn} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
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
