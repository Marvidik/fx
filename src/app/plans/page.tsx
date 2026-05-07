"use client";

import styles from '../Subpage.module.css';
import homeStyles from '../Home.module.css';
import { useLanguage } from '@/context/LanguageContext';
import TradingViewWidget from '@/components/TradingViewWidget';

export default function PlansPage() {
  const { t } = useLanguage();

  const plans = [
    { id: 'Basic', name: t.basic, yield: '25%', after: '24', icon: '🎯', min: '$1,000', max: '$5,000', headerClass: homeStyles.planHeaderBasic, cardClass: homeStyles.planCardBasic, recommended: false },
    { id: 'Standard', name: t.standard, yield: '33%', after: '24', icon: '📈', min: '$5,000', max: '$10,000', headerClass: homeStyles.planHeaderStandard, cardClass: homeStyles.planCardStandard, recommended: true },
    { id: 'Master', name: t.master, yield: '42%', after: '48', icon: '⚡', min: '$10,000', max: '$50,000', headerClass: homeStyles.planHeaderMaster, cardClass: homeStyles.planCardMaster, recommended: true },
    { id: 'Premium', name: t.premium, yield: '55%', after: '72', icon: '💎', min: '$50,000', max: '$100,000', headerClass: homeStyles.planHeaderPremium, cardClass: homeStyles.planCardPremium, recommended: false },
    { id: 'Ultimate', name: t.ultimate, yield: '75%', after: '96', icon: '🚀', min: '$100,000', max: '$500,000', headerClass: homeStyles.planHeaderUltimate, cardClass: homeStyles.planCardUltimate, recommended: false },
    { id: 'Corporate', name: t.corporate, yield: '100%', after: '120', icon: '🏢', min: '$500,000', max: 'Unlimited', headerClass: homeStyles.planHeaderCorporate, cardClass: homeStyles.planCardCorporate, recommended: false },
  ];

  return (
    <main>
      <section className={styles.subHero}>
        <div className={`${styles.container} ${styles.subHeroContent}`}>
          <h1>{t.investmentPlansHero}</h1>
          <p>{t.plansHeroDesc}</p>
        </div>
      </section>

      <section className={styles.section} style={{ background: '#f8fafc' }}>
        <div className={styles.container}>
          <div className={homeStyles.plansGrid}>
            {plans.map((plan, idx) => (
              <div key={idx} className={`${homeStyles.planCard} ${plan.cardClass}`}>
                {plan.recommended && <div className={homeStyles.planBadge}>⭐ {t.recommendedChoice}</div>}
                <div className={`${homeStyles.planHeader} ${plan.headerClass}`}>
                  <div className={homeStyles.planIcon}>{plan.icon}</div>
                  <h3>{plan.name}</h3>
                  <h2>{plan.yield}</h2>
                  <p>{t.after} {plan.after} {t.hours}</p>
                </div>
                <div className={homeStyles.planBody}>
                  <div className={homeStyles.marketRef}>
                    <div className={homeStyles.marketInfo}>
                      <div style={{ width: '20px', height: '20px', background: '#f25022', borderRadius: '4px' }}></div>
                      <div className={homeStyles.marketText}>
                        <h4>{t.msftRef}</h4>
                        <p>{t.liveMarketPrice}</p>
                      </div>
                    </div>
                    <div className={homeStyles.marketPrice}>
                      <h4>$414.44</h4>
                      <p>+1.63%</p>
                    </div>
                  </div>
                  <div className={homeStyles.investmentRange}>
                    <h4>{t.investmentRange}</h4>
                    <div className={homeStyles.rangeGrid}>
                      <div className={homeStyles.rangeItem}>
                        <p>{t.minimum}</p>
                        <h3>{plan.min}</h3>
                      </div>
                      <div className={homeStyles.rangeItem}>
                        <p>{t.maximum}</p>
                        <h3>{plan.max}</h3>
                      </div>
                    </div>
                  </div>
                  <div className={homeStyles.referralSection}>
                    <p>{t.referralComm}</p>
                    <div className={homeStyles.referralRates}>
                      <span>3%</span>
                      <span>1%</span>
                      <span>0.8%</span>
                      <span>0.5%</span>
                      <span>0.3%</span>
                    </div>
                  </div>
                  <div className={homeStyles.protectedBadge}>
                    <span>🔒</span> {t.principalProtected}
                  </div>
                  <button className={homeStyles.investNowBtn}>
                    {t.investNow} ↗
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} style={{ background: '#0F1B35' }}>
        <div className={styles.container}>
           <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="badge" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>{t.livePerformance}</div>
              <h2 style={{ color: 'white', fontSize: '2.5rem', marginTop: '15px' }}>{t.trackMovements}</h2>
           </div>
           <TradingViewWidget />
        </div>
      </section>
    </main>
  );
}
