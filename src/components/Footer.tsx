"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerInfo}>
             <div className="logo" style={{ marginBottom: '20px' }}>
                <Image src="/logo.png" alt="ZynthrixFX Logo" width={240} height={60} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
             </div>
             <p>Institutional-grade wealth management platform designed for the digital age. Secure, transparent, and high-yielding strategies.</p>
          </div>
          
          <div className={styles.footerCol}>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/press">Press Kit</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerCol}>
            <h4>Resources</h4>
            <ul>
              <li><Link href="/plans">Investment Plans</Link></li>
              <li><Link href="/academy">Fx Academy</Link></li>
              <li><Link href="/market">Market Insights</Link></li>
              <li><Link href="/help">Help Center</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerCol}>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/risk">Risk Disclosure</Link></li>
              <li><Link href="/security">Security</Link></li>
            </ul>
          </div>

          <div className={`${styles.footerCol} ${styles.newsletter}`}>
             <h4>Newsletter</h4>
             <p>Get daily market insights and platform updates.</p>
             <div className={styles.subscribeBox}>
                <input type="email" placeholder="Email address" />
                <button>→</button>
             </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
           <p>© 2026 ZynthrixFX Global Limited. All rights reserved. FCA Regulated.</p>
           <div className={styles.socials}>
              <Link href="#">Twitter</Link>
              <Link href="#">LinkedIn</Link>
              <Link href="#">Telegram</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
