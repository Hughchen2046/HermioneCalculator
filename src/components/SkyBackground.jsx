import { useEffect, useRef } from 'react';

/**
 * Animated sky background layers: stars, clouds, landscape, particles.
 * Pure presentational — no state needed.
 */
export default function SkyBackground() {
  const starsRef = useRef(null);
  const cloudsRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Stars
    const starsEl = starsRef.current;
    for (let i = 0; i < 80; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random() * 2.5 + 0.8;
      s.style.cssText = `
        width:${size}px; height:${size}px;
        top:${Math.random() * 60}%;
        left:${Math.random() * 100}%;
        --d:${2 + Math.random() * 4}s;
        --o:${0.4 + Math.random() * 0.6};
        animation-delay:${Math.random() * 4}s;
      `;
      starsEl.appendChild(s);
    }

    // Clouds
    const cloudsEl = cloudsRef.current;
    const cloudConfigs = [
      { top: '8%', w: 180, h: 60, color: 'rgba(255,200,150,0.18)', dur: '38s' },
      { top: '15%', w: 260, h: 80, color: 'rgba(255,180,120,0.13)', dur: '55s', delay: '-20s' },
      { top: '22%', w: 140, h: 50, color: 'rgba(200,150,255,0.12)', dur: '42s', delay: '-10s' },
      { top: '5%', w: 200, h: 70, color: 'rgba(255,230,180,0.15)', dur: '60s', delay: '-35s' },
    ];
    cloudConfigs.forEach((cfg) => {
      const c = document.createElement('div');
      c.className = 'cloud';
      c.style.cssText = `
        top:${cfg.top};
        width:${cfg.w}px; height:${cfg.h}px;
        background:${cfg.color};
        animation-duration:${cfg.dur};
        animation-delay:${cfg.delay || '0s'};
      `;
      cloudsEl.appendChild(c);
    });

    // Gold particles
    const particlesEl = particlesRef.current;
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left:${Math.random() * 100}%;
        bottom:${Math.random() * 30}%;
        --d:${4 + Math.random() * 6}s;
        --delay:${Math.random() * 5}s;
      `;
      particlesEl.appendChild(p);
    }
  }, []);

  return (
    <>
      <div className="sky-bg" />
      <div className="stars" ref={starsRef} />
      <div className="clouds" ref={cloudsRef} />

      {/* Landscape SVG */}
      <svg
        className="landscape"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,220 Q200,140 400,200 Q600,260 800,180 Q1000,100 1200,170 Q1380,230 1440,200 L1440,320 L0,320Z"
          fill="rgba(20,10,50,0.55)"
        />
        <path
          d="M0,260 Q180,200 360,240 Q540,280 720,230 Q900,180 1080,240 Q1260,295 1440,260 L1440,320 L0,320Z"
          fill="rgba(15,8,40,0.7)"
        />
        <path
          d="M0,290 Q360,260 720,280 Q1080,300 1440,285 L1440,320 L0,320Z"
          fill="rgba(10,5,30,0.85)"
        />
        <g fill="rgba(5,2,20,0.9)">
          <rect x="60" y="230" width="6" height="50" />
          <ellipse cx="63" cy="222" rx="16" ry="20" />
          <rect x="110" y="220" width="5" height="60" />
          <ellipse cx="112" cy="210" rx="12" ry="18" />
          <rect x="1340" y="225" width="6" height="55" />
          <ellipse cx="1343" cy="216" rx="15" ry="19" />
          <rect x="1390" y="235" width="5" height="45" />
          <ellipse cx="1392" cy="226" rx="12" ry="16" />
        </g>
      </svg>

      <div className="particles-layer" ref={particlesRef} />
    </>
  );
}
