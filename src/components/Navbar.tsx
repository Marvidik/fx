"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/utils/translations';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangs, setShowLangs] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  const toggleLang = (code: Language) => {
    setLanguage(code);
    setShowLangs(false);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.topBar}>
        <div className={styles.topBarContainer}>
          <div className={styles.topBarLinks}>
            <Link href="/investor-relations">Investor Relations</Link>
            <Link href="/careers">Career Opportunities</Link>
            <Link href="/press">Press Releases</Link>
            <Link href="/sustainability">Sustainability Report</Link>
          </div>
          <Link href="/register" className={styles.getStartedBtn}>Get Started Today</Link>
        </div>
      </div>

      <nav className={styles.navbar}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <Image src="/withback.png" alt="ZynthrixFX Logo" width={180} height={45} priority style={{ objectFit: 'contain', mixBlendMode: 'multiply' }} />
          </Link>

          <div className={styles.navLinksCenter}>
            <Link href="/about">{t.about}</Link>
            <Link href="/plans">Plans</Link>
            <Link href="/contact">{t.contact}</Link>
            <Link href="/register">{t.signup}</Link>
            <Link href="/login">{t.login}</Link>
          </div>

          <div className={styles.navRight}>
            <div className={styles.langWrapper}>
              <button className={styles.langBtnNew} onClick={() => setShowLangs(!showLangs)}>
                <span className={styles.flag}>{currentLang.flag}</span> {currentLang.name} <span className={styles.arrow}>▼</span>
              </button>
              {showLangs && (
                <div className={styles.langDropdownNew}>
                  {languages.map(lang => (
                    <button key={lang.code} onClick={() => toggleLang(lang.code)}>
                      <span>{lang.flag}</span> {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className={styles.hamburger} onClick={() => setIsOpen(true)}>
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>
            <Image src="/withback.png" alt="ZynthrixFX Logo" width={180} height={45} style={{ objectFit: 'contain', mixBlendMode: 'multiply' }} />
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className={styles.sidebarLinks}>
          <Link href="/about" onClick={() => setIsOpen(false)}>{t.about}</Link>
          <Link href="/plans" onClick={() => setIsOpen(false)}>Investment Plans</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>{t.contact}</Link>
          <Link href="/register" onClick={() => setIsOpen(false)}>{t.signup}</Link>
          <Link href="/login" onClick={() => setIsOpen(false)}>{t.login}</Link>
        </div>

        <div className={styles.mobileLangSection}>
          <div className={styles.langWrapper}>
            <button className={styles.langBtnMobile} onClick={() => setShowLangs(!showLangs)}>
              <span className={styles.flag}>{currentLang.flag}</span> {currentLang.name} <span className={styles.arrow}>▼</span>
            </button>
            {showLangs && (
              <div className={styles.langDropdownMobile}>
                {languages.map(lang => (
                  <button key={lang.code} onClick={() => toggleLang(lang.code)}>
                    <span>{lang.flag}</span> {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}
    </div>
  );
}
