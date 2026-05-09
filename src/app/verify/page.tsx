"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/authService';
import { useLanguage } from '@/context/LanguageContext';
import StatusModal from '@/components/StatusModal';
import styles from '../Auth.module.css';

function VerifyContent() {
  const router = useRouter();
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'success' as 'success' | 'error' });

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setModalContent({
          title: t.invalidLink || "Invalid Link",
          message: t.invalidLinkDesc || "The verification link is invalid or has expired.",
          type: 'error'
        });
        setShowModal(true);
        setLoading(false);
        return;
      }

      try {
        await authService.verifyAccount(token);
        setModalContent({
          title: t.accountVerified || "Account Verified!",
          message: t.accountVerifiedDesc || "Your account has been successfully verified. You can now log in.",
          type: 'success'
        });
      } catch (err: any) {
        setModalContent({
          title: t.verificationFailed || "Verification Failed",
          message: err.message || "An error occurred during verification.",
          type: 'error'
        });
      } finally {
        setShowModal(true);
        setLoading(false);
      }
    };

    verify();
  }, [token, t]);

  const handleModalClose = () => {
    setShowModal(false);
    router.push('/login');
  };

  return (
    <div className={styles.authPage} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className={styles.authCard} style={{ textAlign: 'center', padding: '40px', maxWidth: '500px' }}>
        {loading ? (
          <>
            <div className={styles.spinner}></div>
            <h2 style={{ marginTop: '20px' }}>{t.verifyingAccount || "Verifying your account..."}</h2>
            <p>{t.pleaseWait || "Please wait a moment."}</p>
          </>
        ) : (
          <>
            <h2>{t.verificationComplete || "Verification Complete"}</h2>
            <p>{t.redirectingLogin || "Redirecting to login..."}</p>
          </>
        )}
      </div>

      <StatusModal 
        isOpen={showModal}
        onClose={handleModalClose}
        title={modalContent.title}
        message={modalContent.message}
        type={modalContent.type}
      />
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
