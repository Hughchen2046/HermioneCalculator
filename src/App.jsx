import { useState, useEffect, useRef, useCallback } from 'react';
import SkyBackground from './components/SkyBackground';
import MagicOverlay from './components/MagicOverlay';
import ResultPanel from './components/ResultPanel';
import {
  calculateAge,
  getYearOptions,
  getMonthOptions,
  getDayOptions,
} from './utils/ageCalculator';
import { saveResult, loadResult } from './utils/storage';

const BASE = import.meta.env.BASE_URL;

const yearOpts = getYearOptions();
const monthOpts = getMonthOptions();
const dayOpts = getDayOptions();

export default function App() {
  // Restore last saved values or use defaults (妙麗: 2023/2/28)
  const saved = loadResult();
  const [year, setYear] = useState(saved?.year ?? 2023);
  const [month, setMonth] = useState(saved?.month ?? 2);
  const [day, setDay] = useState(saved?.day ?? 28);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const fireRef = useRef(null);

  // On mount: if saved result exists, re-calculate with saved date
  useEffect(() => {
    if (saved) {
      const birth = new Date(saved.year, saved.month - 1, saved.day);
      const res = calculateAge(birth);
      if (res) setResult(res);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCalc = useCallback(() => {
    const birth = new Date(year, month - 1, day);
    const res = calculateAge(birth);
    if (!res) {
      setError('出生日期不能在未來喔！🐾');
      setResult(null);
      setTimeout(() => setError(''), 3000);
      return;
    }
    setResult(res);
    saveResult(res);
    fireRef.current?.();
  }, [year, month, day]);

  return (
    <>
      <SkyBackground />
      <MagicOverlay onRef={(fn) => (fireRef.current = fn)} />

      {error && <div className="error-toast">{error}</div>}

      <div className="wrapper">
        {/* Header */}
        <header className="header">
          <div className="title-en">✦ HERMIONE&apos;S AGE CALCULATOR ✦</div>
          <h1 className="title-main">妙麗的年齡計算機</h1>
          <div className="paw-row">🐾 &nbsp; 🌟 &nbsp; 🐾</div>
        </header>

        {/* Corgi hero image */}
        <div className="corgi-wrap">
          <img
            src={`${BASE}corgi-hero.png`}
            alt="妙麗 — 柯基犬"
            width={240}
            height={240}
          />
        </div>

        {/* Card */}
        <div className="card">
          <div className="section-label">🐕 &nbsp;寶貝的名字</div>
          <div className="name-display">
            <span>🧙‍♀️</span>
            <span>妙麗 (Hermione) — 柯基犬</span>
          </div>

          <div className="section-label">📅 &nbsp;輸入出生日期</div>
          <div className="date-group">
            <div className="date-field">
              <label htmlFor="yearSel">年份</label>
              <select
                id="yearSel"
                value={year}
                onChange={(e) => setYear(+e.target.value)}
              >
                {yearOpts.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="date-field">
              <label htmlFor="monthSel">月份</label>
              <select
                id="monthSel"
                value={month}
                onChange={(e) => setMonth(+e.target.value)}
              >
                {monthOpts.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="date-field">
              <label htmlFor="daySel">日期</label>
              <select
                id="daySel"
                value={day}
                onChange={(e) => setDay(+e.target.value)}
              >
                {dayOpts.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn-calc" onClick={handleCalc} type="button">
            <div className="btn-shimmer" />
            ✨ 開始計算 ✨
          </button>

          <ResultPanel result={result} />
        </div>

        <div className="hp-quote">
          &ldquo;It&apos;s not magic, it&apos;s science.&rdquo;
          <br />
          <span style={{ fontSize: 11, opacity: 0.6 }}>
            —不管是妙麗·格蘭傑，還是妙麗柯基，都一樣可愛 🧡
          </span>
        </div>
      </div>
    </>
  );
}
