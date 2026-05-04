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
          <h1>Get In Touch</h1>
          <p>Our dedicated support team is available 24/7 to assist with your investment queries and technical support.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid2}>
            <div className={styles.textContent}>
              <div className="badge">Get in Touch</div>
              <h2>Connect with Our Experts</h2>
              <p>Whether you're a new investor looking for guidance or an institutional partner seeking collaboration, we're here to help.</p>
              
              <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div>
                   <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>📧 Email Support</h4>
                   <p style={{ margin: 0 }}>support@zyntrixfx.global</p>
                </div>
                <div>
                   <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>🏢 Global Headquarters</h4>
                   <p style={{ margin: 0 }}>Level 25, One Canada Square, Canary Wharf, London, UK</p>
                </div>
                <div>
                   <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>📱 Telegram Channel</h4>
                   <p style={{ margin: 0 }}>@zyntrixfx_official</p>
                </div>
              </div>
            </div>

            <div className={authStyles.authCard} style={{ maxWidth: '100%' }}>
              <div className={authStyles.authContentNew} style={{ padding: '40px' }}>
                <form className={authStyles.authForm}>
                  <div className={authStyles.formGrid}>
                    <div className={authStyles.formGroup}>
                      <label>Name</label>
                      <div className={authStyles.inputWrapper}>
                        <span>👤</span>
                        <input type="text" placeholder="Your name" required />
                      </div>
                    </div>
                    <div className={authStyles.formGroup}>
                      <label>Email</label>
                      <div className={authStyles.inputWrapper}>
                        <span>✉️</span>
                        <input type="email" placeholder="Your email" required />
                      </div>
                    </div>
                  </div>
                  <div className={authStyles.formGroup} style={{ marginTop: '20px' }}>
                    <label>Subject</label>
                    <div className={authStyles.inputWrapper}>
                      <span>📌</span>
                      <input type="text" placeholder="Topic of inquiry" required />
                    </div>
                  </div>
                  <div className={authStyles.formGroup} style={{ marginTop: '20px' }}>
                    <label>Message</label>
                    <div className={authStyles.inputWrapper} style={{ alignItems: 'flex-start' }}>
                      <span style={{ top: '15px' }}>💬</span>
                      <textarea 
                        placeholder="How can we help?" 
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
                  <button type="submit" className={authStyles.submitBtnNew} style={{ maxWidth: '100%' }}>Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
