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
          <h1>Investor Benefits</h1>
          <p>Exclusive rewards, benefits, and opportunities for our valued investment community</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid2}>
            <div className={styles.textContent}>
              <div className="badge">Our Mission</div>
              <h2>Democratizing Access to High-Yield Markets</h2>
              <p>Founded in 2020, FluxFX was built on the belief that sophisticated investment strategies shouldn't be reserved for the top 1%. We leverage cutting-edge AI and blockchain technology to bridge the gap between traditional finance and digital assets.</p>
              <p>Our team of expert traders and data scientists work tirelessly to identify market inefficiencies and deliver consistent alpha for our growing community of over 50,000 investors.</p>
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
              <div className="badge">Our Core Values</div>
              <h2 className={homeStyles.sectionHeading}>Built on <span className="gradient-text">Trust & Transparency</span></h2>
           </div>
           
           <div className={homeStyles.featureGrid}>
              <div className={homeStyles.featureCard}>
                 <div className={homeStyles.featureIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>⚖️</div>
                 <h3>Integrity First</h3>
                 <p>We operate with complete transparency in every transaction and reporting cycle.</p>
              </div>
              <div className={homeStyles.featureCard}>
                 <div className={homeStyles.featureIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>💡</div>
                 <h3>Innovation</h3>
                 <p>Constantly evolving our algorithms to stay ahead of market volatility.</p>
              </div>
              <div className={homeStyles.featureCard}>
                 <div className={homeStyles.featureIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>🌍</div>
                 <h3>Inclusivity</h3>
                 <p>Providing global access with localized support in over 15 languages.</p>
              </div>
              <div className={homeStyles.featureCard}>
                 <div className={homeStyles.featureIcon} style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>🛡️</div>
                 <h3>Security</h3>
                 <p>Uncompromising protection of client assets using cold storage and multi-sig protocols.</p>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
