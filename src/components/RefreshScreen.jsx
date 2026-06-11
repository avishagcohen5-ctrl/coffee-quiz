const SCALE = [
  { portion: 'מנה קצרה',  note: 'הכי חלש', strength: 1 },
  { portion: 'מנה ארוכה', note: '',          strength: 2 },
  { portion: 'כפול קצר',  note: '',          strength: 3 },
  { portion: 'כפול ארוך', note: 'הכי חזק',  strength: 4 },
]

export default function RefreshScreen({ onStart, onBack }) {
  return (
    <div className="refresh">
      <button className="refresh-back" onClick={onBack}>→ חזרה</button>
      <h2 className="refresh-title">רענון זיכרון</h2>
      <p className="refresh-subtitle">סקאלת החוזק</p>

      <div className="refresh-scale">
        {SCALE.map(({ portion, note, strength }) => (
          <div key={portion} className="scale-row">
            <div className="scale-bars">
              {Array.from({ length: strength }).map((_, i) => (
                <div key={i} className="scale-bar" />
              ))}
            </div>
            <div className="scale-text">
              <span className="scale-portion">{portion}</span>
              {note && <span className="scale-note">{note}</span>}
            </div>
          </div>
        ))}
      </div>

      <button className="home-btn home-btn--primary refresh-cta" onClick={onStart}>
        בואו נתחיל ✓
      </button>
    </div>
  )
}
