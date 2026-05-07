"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ReferralCapture() {
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;

  useEffect(() => {
    // Avoid capturing common static assets or system paths if they somehow leak here
    const skipPaths = ['favicon.ico', 'robots.txt', 'sitemap.xml', 'api', '_next'];
    
    if (username && !skipPaths.includes(username)) {
      localStorage.setItem('referral_id', username);
      console.log('Captured referral ID:', username);
    }
    
    router.push('/register');
  }, [username, router]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: '#0f172a',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        width: '50px', 
        height: '50px', 
        border: '3px solid rgba(255,255,255,0.1)', 
        borderTopColor: '#22c55e', 
        borderRadius: '50%', 
        animation: 'spin 1s linear infinite' 
      }}></div>
      <p style={{ marginTop: '20px', color: '#94a3b8', fontSize: '0.9rem' }}>Redirecting to secure registration...</p>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
