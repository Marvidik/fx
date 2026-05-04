"use client";

import React, { useState } from 'react';
import styles from '../Dashboard.module.css';

export default function KYCPage() {
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState('passport');

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

        <div className={styles.card} style={{ marginTop: '20px' }}>
          <div className={styles.helpSection}>
             <div className={styles.helpIconBox}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
             </div>
             <div className={styles.helpText}>
                <h4 className={styles.helpTitle}>We're here to help you!</h4>
                <p className={styles.helpSubtitle}>Ask a question, manage request, report an issue. Our support team will get back to you by email.</p>
             </div>
             <button className={styles.getSupportBtn}>Get Support Now</button>
          </div>
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
        <div className={styles.kycFormSection}>
          <h4 className={styles.kycFormHeader}>Personal Details</h4>
          <p className={styles.kycFormSubheader}>Your simple personal information required for Identification</p>
          <p className={styles.kycWarningText}>Please type carefully and fill out the form with your personal details. You can't edit these details once you submitted the form.</p>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>First name <span style={{color: 'red'}}>*</span></label>
              <input type="text" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Last name <span style={{color: 'red'}}>*</span></label>
              <input type="text" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Email <span style={{color: 'red'}}>*</span></label>
              <div className={styles.iconInputWrapper}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input type="email" className={styles.formInputNoPad} />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Phone Number <span style={{color: 'red'}}>*</span></label>
              <div className={styles.iconInputWrapper}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <input type="text" className={styles.formInputNoPad} />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Date of birth <span style={{color: 'red'}}>*</span></label>
              <input type="date" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Twitter or Facebook username <span style={{color: 'red'}}>*</span></label>
              <input type="text" className={styles.formInput} />
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
                <input type="text" className={styles.formInputNoPad} />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>City <span style={{color: 'red'}}>*</span></label>
              <input type="text" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label>State <span style={{color: 'red'}}>*</span></label>
              <input type="text" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Nationality <span style={{color: 'red'}}>*</span></label>
              <div className={styles.iconInputWrapper}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <input type="text" className={styles.formInputNoPad} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.kycFormSection} style={{ marginTop: '40px' }}>
          <h4 className={styles.kycFormHeader}>Document Upload</h4>
          <p className={styles.kycFormSubheader}>Your simple personal document required for Identification</p>
          
          <div className={styles.docTypeSelection}>
             <button 
              className={`${styles.docTypeBtn} ${docType === 'passport' ? styles.docTypeBtnActive : ''}`}
              onClick={() => setDocType('passport')}
             >
                <span className={styles.docIcon}>🛂</span> Int'l Passport
             </button>
             <button 
              className={`${styles.docTypeBtn} ${docType === 'id' ? styles.docTypeBtnActive : ''}`}
              onClick={() => setDocType('id')}
             >
                <span className={styles.docIcon}>🆔</span> National ID
             </button>
             <button 
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
            <div className={styles.fileUploadBox}>
               <div className={styles.fileUploadInfo}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                 <span>Choose file</span>
               </div>
               <div className={styles.docPreview}>🪪</div>
            </div>
          </div>

          <div className={styles.formGroup} style={{ marginTop: '20px' }}>
            <label>Upload back side <span style={{color: 'red'}}>*</span></label>
            <div className={styles.fileUploadBox}>
               <div className={styles.fileUploadInfo}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                 <span>Choose file</span>
               </div>
               <div className={styles.docPreview}>🪪</div>
            </div>
          </div>

          <div className={styles.checkboxGroup} style={{ marginTop: '30px' }}>
             <input type="checkbox" id="confirmKyc" />
             <label htmlFor="confirmKyc">All The Information I Have Entered Is Correct.</label>
          </div>

          <button className={styles.submitKycBtn}>Submit Application</button>
        </div>
      </div>
    </div>
  );
}
