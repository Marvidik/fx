"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './Home.module.css';
import { useLanguage } from '@/context/LanguageContext';
import TradingViewWidget from '@/components/TradingViewWidget';

export default function Home() {
  const { t } = useLanguage();
  
  const tickerData = [
    { name: 'BTC/USD', price: '$78,282.00', change: '+1.49%', up: true },
    { name: 'ETH/USD', price: '$2,304.33', change: '+1.18%', up: true },
    { name: 'USDT/USD', price: '$0.9998', change: '+0.02%', up: true },
    { name: 'XRP/USD', price: '$1.39', change: '+1.03%', up: true },
    { name: 'BNB/USD', price: '$615.45', change: '-0.10%', up: false },
    { name: 'USDC/USD', price: '$0.9999', change: '+0.02%', up: true },
  ];

  const plans = [
    { id: 'Basic', name: t.basic, yield: '25%', after: '24', icon: '🎯', min: '$1,000', max: '$5,000', headerClass: styles.planHeaderBasic, cardClass: styles.planCardBasic, recommended: false },
    { id: 'Standard', name: t.standard, yield: '33%', after: '24', icon: '📈', min: '$5,000', max: '$10,000', headerClass: styles.planHeaderStandard, cardClass: styles.planCardStandard, recommended: true },
    { id: 'Master', name: t.master, yield: '42%', after: '48', icon: '⚡', min: '$10,000', max: '$50,000', headerClass: styles.planHeaderMaster, cardClass: styles.planCardMaster, recommended: true },
    { id: 'Premium', name: t.premium, yield: '55%', after: '72', icon: '💎', min: '$50,000', max: '$100,000', headerClass: styles.planHeaderPremium, cardClass: styles.planCardPremium, recommended: false },
    { id: 'Ultimate', name: t.ultimate, yield: '75%', after: '96', icon: '🚀', min: '$100,000', max: '$500,000', headerClass: styles.planHeaderUltimate, cardClass: styles.planCardUltimate, recommended: false },
    { id: 'Corporate', name: t.corporate, yield: '100%', after: '120', icon: '🏢', min: '$500,000', max: 'Unlimited', headerClass: styles.planHeaderCorporate, cardClass: styles.planCardCorporate, recommended: false },
  ];

  return (
    <main className={styles.main}>
      {/* 1. Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <div className={styles.heroSub}>{t.heroSub}</div>
              <h1>{t.heroTitle.split(' ').slice(0, 2).join(' ')} <br/> {t.heroTitle.split(' ').slice(2).join(' ')}</h1>
              <p>{t.heroDesc}</p>
              <div className={styles.heroBtns}>
                <button className="btn btn-primary" style={{ height: '50px', padding: '0 40px' }}>{t.markets} →</button>
                <button className="btn btn-secondary" style={{ height: '50px', padding: '0 40px', background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'white' }}>{t.guide}</button>
              </div>
              <div className={styles.heroBottom}>
                <div className={styles.heroBottomItem}>
                  <div className={styles.heroBottomIcon}>📈</div>
                  <span>{t.insights}</span>
                </div>
                <div className={styles.heroBottomItem}>
                  <div className={styles.heroBottomIcon}>🛡️</div>
                  <span>{t.risk}</span>
                </div>
                <div className={styles.heroBottomItem}>
                  <div className={styles.heroBottomIcon}>🌐</div>
                  <span>{t.global}</span>
                </div>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.heroStatCard}>
                <h3>$2.5B+</h3>
                <p>{t.assetsManaged}</p>
              </div>
              <div className={styles.heroStatCard}>
                <h3>50K+</h3>
                <p>{t.activeInvestors}</p>
              </div>
              <div className={styles.heroStatCard}>
                <h3>99.9%</h3>
                <p>{t.uptimeGuarantee}</p>
              </div>
              <div className={styles.heroStatCard}>
                <h3>24/7</h3>
                <p>{t.support247}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Simple Market Ticker */}
      <div className={styles.tickerSection}>
        <div className={styles.tickerInner}>
          {[...tickerData, ...tickerData].map((item, i) => (
            <div key={i} className={styles.tickerItem}>
              <span>{item.name}</span>
              <span>{item.price}</span>
              <span className={item.up ? styles.priceUp : styles.priceDown}>{item.change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Advanced Investment Process */}
      <section className={styles.processSectionNew}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="badge">{t.investmentProcessBadge}</div>
            <h2 className={styles.sectionHeading}>{t.processTitle}</h2>
            <p style={{ maxWidth: '700px', margin: '20px auto', color: 'var(--text-muted)' }}>{t.processDesc}</p>
          </div>
          
          <div className={styles.processGridNew}>
            <div className={styles.processCardNew}>
              <div className={styles.processImg}>
                <Image src="/images/register.jpg" alt="Registration" fill style={{ objectFit: 'cover' }} loading="eager" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className={styles.stepBadge}>1</div>
                <div className={styles.timeBadge}>⏱️ 2-3 minutes</div>
              </div>
              <div className={styles.processContent}>
                <div className="badge" style={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)', marginBottom: '10px' }}>{t.quickSetup}</div>
                <h3>{t.accountRegistration}</h3>
                <p>{t.registrationDesc}</p>
                <ul className={styles.processChecklist}>
                  <li>{t.identityVerification}</li>
                  <li>{t.bankLinking}</li>
                  <li>{t.riskAssessment}</li>
                </ul>
                <button className={`btn btn-primary ${styles.startBtn}`}>{t.getStarted} →</button>
              </div>
            </div>

            <div className={styles.processCardNew}>
              <div className={styles.processImg}>
                <Image src="/images/capitaldev.jpg" alt="Funding" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                <div className={styles.stepBadge} style={{ background: '#f97316' }}>2</div>
                <div className={styles.timeBadge}>⏱️ Instant</div>
              </div>
              <div className={styles.processContent}>
                <div className="badge" style={{ color: '#f97316', background: 'rgba(249, 115, 22, 0.1)', marginBottom: '10px' }}>{t.fundPortfolioBadge}</div>
                <h3>{t.capitalDeployment}</h3>
                <p>{t.deploymentDesc}</p>
                <ul className={styles.processChecklist}>
                  <li style={{ color: '#f97316' }}>{t.multiplePaymentMethods}</li>
                  <li style={{ color: '#f97316' }}>{t.instantProcessing}</li>
                  <li style={{ color: '#f97316' }}>{t.portfolioAllocation}</li>
                </ul>
                <button className={`btn ${styles.startBtn}`} style={{ background: '#f97316', color: 'white' }}>{t.getStarted} →</button>
              </div>
            </div>

            <div className={styles.processCardNew}>
              <div className={styles.processImg}>
                <Image src="/images/profit.jpg" alt="Profit" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                <div className={styles.stepBadge} style={{ background: '#6366f1' }}>3</div>
                <div className={styles.timeBadge}>⏱️ Real-time</div>
              </div>
              <div className={styles.processContent}>
                <div className="badge" style={{ color: '#6366f1', background: 'rgba(99, 102, 241, 0.1)', marginBottom: '10px' }}>{t.seamlessWithdrawalsBadge}</div>
                <h3>{t.profitDistribution}</h3>
                <p>{t.withdrawalDesc}</p>
                <ul className={styles.processChecklist}>
                  <li style={{ color: '#6366f1' }}>{t.instantWithdrawals}</li>
                  <li style={{ color: '#6366f1' }}>{t.taxDoc}</li>
                  <li style={{ color: '#6366f1' }}>{t.multiCurrency}</li>
                </ul>
                <button className={`btn ${styles.startBtn}`} style={{ background: '#6366f1', color: 'white' }}>{t.getStarted} →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Professional Management (Split Layout) */}
      <section className={styles.managementSection}>
        <div className={styles.container}>
          <div className={styles.mgmtGrid}>
            <div className={styles.mgmtText}>
              <div className="badge" style={{ color: '#10b981', border: 'none', padding: '0', fontSize: '0.9rem' }}>— ABOUT OUR PLATFORM</div>
              <h1 className={styles.mgmtHeading}>Professional <br /> Investment <br /> <span className="gradient-text">Management</span></h1>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.1rem' }}>
                {t.mgmtDesc}
              </p>
              
              <div className={styles.mgmtFeatures}>
                <div className={styles.heroBottomItem}>
                   <div className={styles.heroBottomIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>✓</div>
                   <div>
                     <h4 style={{ fontSize: '1rem' }}>{t.diversifiedStrategies}</h4>
                     <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>{t.diversifiedDesc}</p>
                   </div>
                </div>
                <div className={styles.heroBottomItem}>
                   <div className={styles.heroBottomIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>✓</div>
                   <div>
                     <h4 style={{ fontSize: '1rem' }}>{t.transparentOps}</h4>
                     <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>{t.transparentOpsDesc}</p>
                   </div>
                </div>
                <div className={styles.heroBottomItem}>
                   <div className={styles.heroBottomIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>✓</div>
                   <div>
                     <h4 style={{ fontSize: '1rem' }}>{t.risk}</h4>
                     <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>{t.riskMgmtDesc}</p>
                   </div>
                </div>
                <div className={styles.heroBottomItem}>
                   <div className={styles.heroBottomIcon} style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>✓</div>
                   <div>
                     <h4 style={{ fontSize: '1rem' }}>{t.support247}</h4>
                     <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>{t.supportDesc}</p>
                   </div>
                </div>
              </div>

              <div className={styles.mgmtStatRow}>
                 <div className={styles.mgmtStatItem}>
                   <h2>98.7%</h2>
                   <p>{t.successRate}</p>
                 </div>
                 <div className={styles.mgmtStatItem}>
                   <h2>$2.8B+</h2>
                   <p>{t.assetsManaged}</p>
                 </div>
                 <div className={styles.mgmtStatItem}>
                   <h2>15K+</h2>
                   <p>{t.activeInvestors}</p>
                 </div>
                 <div className={styles.mgmtStatItem}>
                   <h2>50+</h2>
                   <p>{t.globalMarkets}</p>
                 </div>
              </div>
            </div>
            
            <div className={styles.mgmtVisual}>
              <div className={styles.visualCard}>
                <div style={{ position: 'relative' }}>
                   <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 2, color: 'white' }}>
                      <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.8 }}>{t.investmentAnalytics}</p>
                      <h4 style={{ fontSize: '1.2rem' }}>{t.realTimeData}</h4>
                   </div>
                   <Image src="/images/chort.jpg" alt="Analytics" width={600} height={400} style={{ height: "auto" }} />
                </div>
              </div>
              <div className={styles.visualCard} style={{ background: '#000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 2, color: 'white' }}>
                    <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.8 }}>{t.platformOverview}</p>
                 </div>
                 <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem' }}>▶</div>
                 <Image src="/images/chortt.jpg" alt="Chart" width={600} height={200} style={{ opacity: 0.5, height: "auto" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Professional Investment Solutions (New Section from Screenshot) */}
      <section className={styles.solutionsSection}>
        <div className={styles.container}>
           <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div className="badge">{t.whyChooseUs}</div>
              <h2 className={styles.sectionHeading}>{t.solutionsTitle}</h2>
              <p style={{ maxWidth: '700px', margin: '20px auto', color: 'var(--text-muted)' }}>{t.solutionsSub}</p>
           </div>
           
           <div className={styles.solutionsGrid}>
              <div className={styles.solutionsLeft}>
                 <div className={styles.solutionItem}>
                    <div className={styles.solutionIcon}>📈</div>
                    <div className={styles.solutionText}>
                       <h3>{t.multiAsset}</h3>
                       <p>{t.multiAssetDesc}</p>
                    </div>
                 </div>
                 <div className={styles.solutionItem}>
                    <div className={styles.solutionIcon} style={{ background: '#ecfdf5', color: '#10b981' }}>🛡️</div>
                    <div className={styles.solutionText}>
                       <h3>{t.instSecurity}</h3>
                       <p>{t.instSecurityDesc}</p>
                    </div>
                 </div>
                 <div className={styles.solutionItem}>
                    <div className={styles.solutionIcon} style={{ background: '#fef2f2', color: '#ef4444' }}>📊</div>
                    <div className={styles.solutionText}>
                       <h3>{t.advAnalytics}</h3>
                       <p>{t.advAnalyticsDesc}</p>
                    </div>
                 </div>
                 <div className={styles.solutionItem}>
                    <div className={styles.solutionIcon} style={{ background: '#f5f3ff', color: '#8b5cf6' }}>🌐</div>
                    <div className={styles.solutionText}>
                       <h3>{t.globalAccess}</h3>
                       <p>{t.globalAccessDesc}</p>
                    </div>
                 </div>
              </div>

              <div className={styles.solutionsRight}>
                 <div className={styles.trustpilotCard}>
                    <div className={styles.tpHeader}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '1.5rem' }}>⭐</span>
                          <h3 style={{ margin: 0 }}>Trustpilot</h3>
                       </div>
                       <div className={styles.tpStars}>★★★★★</div>
                    </div>
                    <p style={{ fontStyle: 'italic', color: '#475569', lineHeight: '1.6' }}>{t.trustpilotDesc}</p>
                    <p style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '15px' }}>— {t.verifiedReviewer}</p>
                 </div>

                 <div className={styles.referralCardNew}>
                    <div className={styles.refBadge}>{t.referralProgram}</div>
                    <div className={styles.refContent}>
                       <h2>{t.earnComm}</h2>
                       <p>{t.earnCommSub}</p>
                       <div className={styles.refPercent}>5.00% <span>{t.perReferral}</span></div>
                       <button className={styles.learnMoreBtn}>{t.learnMore}</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 6. Investment Plans Section */}
      <section className={styles.plansSection}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="badge">{t.pricingPlans}</div>
            <h2 className={styles.sectionHeading}>{t.plansTitle}</h2>
            <p style={{ maxWidth: '700px', margin: '20px auto', color: 'var(--text-muted)' }}>{t.plansDesc}</p>
          </div>

          <div className={styles.plansGrid}>
            {plans.map((plan, idx) => (
              <div key={idx} className={`${styles.planCard} ${plan.cardClass}`}>
                {plan.recommended && <div className={styles.planBadge}>⭐ {t.recommendedChoice}</div>}
                <div className={`${styles.planHeader} ${plan.headerClass}`}>
                  <div className={styles.planIcon}>{plan.icon}</div>
                  <h3>{plan.name}</h3>
                  <h2>{plan.yield}</h2>
                  <p>{t.after} {plan.after} {t.hours}</p>
                </div>
                <div className={styles.planBody}>
                  <div className={styles.marketRef}>
                    <div className={styles.marketInfo}>
                      <div style={{ width: '20px', height: '20px', background: '#f25022', borderRadius: '4px' }}></div>
                      <div className={styles.marketText}>
                        <h4>{t.msftRef}</h4>
                        <p>{t.liveMarketPrice}</p>
                      </div>
                    </div>
                    <div className={styles.marketPrice}>
                      <h4>$414.44</h4>
                      <p>+1.63%</p>
                    </div>
                  </div>
                  <div className={styles.investmentRange}>
                    <h4>{t.investmentRange}</h4>
                    <div className={styles.rangeGrid}>
                      <div className={styles.rangeItem}>
                        <p>{t.minimum}</p>
                        <h3>{plan.min}</h3>
                      </div>
                      <div className={styles.rangeItem}>
                        <p>{t.maximum}</p>
                        <h3>{plan.max}</h3>
                      </div>
                    </div>
                  </div>
                  <div className={styles.referralSection}>
                    <p>{t.referralComm}</p>
                    <div className={styles.referralRates}>
                      <span>3%</span>
                      <span>1%</span>
                      <span>0.8%</span>
                      <span>0.5%</span>
                      <span>0.3%</span>
                    </div>
                  </div>
                  <div className={styles.protectedBadge}>
                    <span>🔒</span> {t.principalProtected}
                  </div>
                  <button className={styles.investNowBtn}>
                    {t.investNow} ↗
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TradingView Section */}
      <section className={styles.chartSection} style={{ padding: '80px 0', background: '#0F1B35' }}>
        <div className={styles.container}>
           <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="badge" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>{t.liveAnalysis}</div>
              <h2 style={{ color: 'white', fontSize: '2.5rem', marginTop: '15px' }}>{t.technicalCharts}</h2>
           </div>
           <TradingViewWidget />
        </div>
      </section>

      {/* 8. Why Choose Us (Trusted by Thousands) */}
      <section className={styles.whyChooseUs}>
        <div className={styles.container}>
           <div style={{ textAlign: 'center' }}>
              <div className="badge">{t.whyChooseUs}</div>
              <h2 className={styles.sectionHeading}>{t.trustedByThousands.split('Thousands')[0]}<span className="gradient-text">Thousands</span>{t.trustedByThousands.split('Thousands')[1]}</h2>
              <p style={{ maxWidth: '600px', margin: '20px auto', color: 'var(--text-muted)' }}>{t.experienceDifference}</p>
           </div>
           
           <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                 <div className={styles.featureIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>🎖️</div>
                 <h3>{t.certifiedExcellence}</h3>
                 <p>{t.certifiedDesc}</p>
              </div>
              <div className={styles.featureCard}>
                 <div className={styles.featureIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>🛡️</div>
                 <h3>{t.secureTrans}</h3>
                 <p>{t.secureTransDesc}</p>
              </div>
              <div className={styles.featureCard}>
                 <div className={styles.featureIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>💳</div>
                 <h3>{t.instantWithdrawalsFeature}</h3>
                 <p>{t.instantWithdrawalsDesc}</p>
              </div>
              <div className={styles.featureCard}>
                 <div className={styles.featureIcon} style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>🎧</div>
                 <h3>{t.support247}</h3>
                 <p>{t.support247Desc}</p>
              </div>
           </div>

           <div className={styles.trustStats}>
              <div className={styles.trustStatItem}>
                 <h2>99.9%</h2>
                 <p>{t.uptimeGuarantee}</p>
              </div>
              <div className={styles.trustStatItem}>
                 <h2>24/7</h2>
                 <p>{t.marketAccess}</p>
              </div>
              <div className={styles.trustStatItem}>
                 <h2>256-bit</h2>
                 <p>{t.sslEncryption}</p>
              </div>
              <div className={styles.trustStatItem}>
                 <h2>&lt;2min</h2>
                 <p>{t.withdrawalTime}</p>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
