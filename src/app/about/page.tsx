"use client";

import Image from 'next/image';
import styles from '../Subpage.module.css';
import homeStyles from '../Home.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <main>
      <section className={styles.subHero}>
        <div className={`${styles.container} ${styles.subHeroContent}`}>
          <h1>{t.investorBenefits}</h1>
          <p>{t.investorBenefitsSub}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid2}>
            <div className={styles.textContent}>
              <div className="badge">{t.ourMission}</div>
              <h2>{t.democratizing}</h2>
              <p>{t.aboutPara1}</p>
              <p>{t.aboutPara2}</p>
            </div>
            <div style={{ position: 'relative', height: '450px', borderRadius: '24px', overflow: 'hidden' }}>
              <Image src="/images/chort.jpg" alt="About" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Reusing Home features section */}
      <section className={homeStyles.whyChooseUs} style={{ background: '#f8fafc' }}>
        <div className={styles.container}>
           <div style={{ textAlign: 'center' }}>
              <div className="badge">{t.ourCoreValues}</div>
              <h2 className={homeStyles.sectionHeading}>{t.builtOnTrust.split('&')[0]} <span className="gradient-text">& {t.builtOnTrust.split('&')[1]}</span></h2>
           </div>
           
           <div className={homeStyles.featureGrid}>
              <div className={homeStyles.featureCard}>
                 <div className={homeStyles.featureIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>⚖️</div>
                 <h3>{t.integrityFirst}</h3>
                 <p>{t.integrityFirstDesc}</p>
              </div>
              <div className={homeStyles.featureCard}>
                 <div className={homeStyles.featureIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>💡</div>
                 <h3>{t.innovation}</h3>
                 <p>{t.innovationDesc}</p>
              </div>
              <div className={homeStyles.featureCard}>
                 <div className={homeStyles.featureIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>🌍</div>
                 <h3>{t.inclusivity}</h3>
                 <p>{t.inclusivityDesc}</p>
              </div>
              <div className={homeStyles.featureCard}>
                 <div className={homeStyles.featureIcon} style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>🛡️</div>
                 <h3>{t.security}</h3>
                 <p>{t.securityDesc}</p>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
