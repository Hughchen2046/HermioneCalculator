/**
 * Calculation result panel — rendered only when result exists.
 */
export default function ResultPanel({ result }) {
  if (!result) return null;

  return (
    <div className="result-panel" key={result.humanAge}>
      <div className="section-label" style={{ marginBottom: 16 }}>
        🌟 &nbsp;計算結果
      </div>

      {/* Dog age */}
      <div className="result-row">
        <div className="result-icon dog-icon">🐕</div>
        <div>
          <div className="result-label">妙麗的實際年齡（狗齡）</div>
          <div>
            <span className="result-value">{result.dogAgeStr}</span>
            <span className="result-unit">{result.dogAgeUnitStr}</span>
          </div>
          <div className="result-note">{result.dogAgeNoteStr}</div>
        </div>
      </div>

      {/* Human age */}
      <div className="result-row">
        <div className="result-icon human-icon">👤</div>
        <div>
          <div className="result-label">換算人類年齡（科學公式）</div>
          <div>
            <span className="result-value">{result.humanAge}</span>
            <span className="result-unit">歲</span>
          </div>
          <div className="result-note">基於 UCSD 2020 DNA甲基化研究公式</div>
        </div>
      </div>

      {/* Life stage */}
      <div className="life-stage">{result.stageText}</div>
    </div>
  );
}
