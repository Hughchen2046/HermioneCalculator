import { useCallback, useRef } from 'react';

const SPARK_COLORS = ['#f5c842', '#f4a080', '#a8c8e8', '#ffffff', '#e88a50'];

/**
 * Full-screen magic sparkle overlay triggered imperatively.
 * Exposes `fire()` via ref callback.
 */
export default function MagicOverlay({ onRef }) {
  const containerRef = useRef(null);

  const fire = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.innerHTML = '';
    for (let i = 0; i < 28; i++) {
      const s = document.createElement('div');
      s.className = 'magic-spark';
      s.style.cssText = `
        left: ${30 + Math.random() * 40}%;
        top: ${40 + Math.random() * 30}%;
        background: ${SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)]};
        --tx: ${(Math.random() - 0.5) * 160}px;
        --ty: ${(Math.random() - 0.5) * 160}px;
        animation-delay: ${Math.random() * 0.4}s;
        width: ${4 + Math.random() * 6}px;
        height: ${4 + Math.random() * 6}px;
      `;
      el.appendChild(s);
    }
    setTimeout(() => {
      if (el) el.innerHTML = '';
    }, 1800);
  }, []);

  // Expose fire() to parent
  if (onRef) onRef(fire);

  return <div className="magic-overlay" ref={containerRef} />;
}
