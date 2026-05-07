"use client";

import styles from '../Subpage.module.css';
import authStyles from '../Auth.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <main>
      <section className={styles.subHero}>
        <div className={`${styles.container} ${styles.subHeroContent}`}>
          <h1>{t.getInTouch}</h1>
          <p>{t.supportAvailable}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid2}>
            <div className={styles.textContent}>
              <div className="badge">{t.getInTouch}</div>
              <h2>{t.connectExperts}</h2>
              <p>{t.connectDesc}</p>
              
              <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div>
                   <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>📧 {t.emailSupport}</h4>
                   <p style={{ margin: 0 }}>support@zyntrixfx.global</p>
                </div>
                <div>
                   <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>🏢 {t.globalHeadquarters}</h4>
                   <p style={{ margin: 0 }}>Level 25, One Canada Square, Canary Wharf, London, UK</p>
                </div>
                <div>
                   <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>📱 {t.telegramChannel}</h4>
                   <p style={{ margin: 0 }}>@zyntrixfx_official</p>
                </div>
              </div>
            </div>

            <div className={authStyles.authCard} style={{ maxWidth: '100%' }}>
              <div className={authStyles.authContentNew} style={{ padding: '40px' }}>
                <form className={authStyles.authForm}>
                  <div className={authStyles.formGrid}>
                    <div className={authStyles.formGroup}>
                      <label>{t.name}</label>
                      <div className={authStyles.inputWrapper}>
                        <span>👤</span>
                        <input type="text" placeholder={t.yourName} required />
                      </div>
                    </div>
                    <div className={authStyles.formGroup}>
                      <label>{t.email}</label>
                      <div className={authStyles.inputWrapper}>
                        <span>✉️</span>
                        <input type="email" placeholder={t.yourEmail} required />
                      </div>
                    </div>
                  </div>
                  <div className={authStyles.formGroup} style={{ marginTop: '20px' }}>
                    <label>{t.subject}</label>
                    <div className={authStyles.inputWrapper}>
                      <span>📌</span>
                      <input type="text" placeholder={t.topicInquiry} required />
                    </div>
                  </div>
                  <div className={authStyles.formGroup} style={{ marginTop: '20px' }}>
                    <label>{t.message}</label>
                    <div className={authStyles.inputWrapper} style={{ alignItems: 'flex-start' }}>
                      <span style={{ top: '15px' }}>💬</span>
                      <textarea 
                        placeholder={t.howCanHelp} 
                        required 
                        style={{ 
                          width: '100%',
                          padding: '14px 16px 14px 45px', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: '12px', 
                          fontSize: '0.95rem', 
                          background: 'white',
                          minHeight: '150px',
                          fontFamily: 'inherit',
                          transition: 'border-color 0.2s'
                        }}
                      />
                    </div>
                  </div>
                  <button type="submit" className={authStyles.submitBtnNew} style={{ maxWidth: '100%' }}>{t.sendMessage}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
