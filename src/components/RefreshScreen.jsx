function CoffeeCup({ full }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: 24,
        height: 22,
        border: '2px solid #222',
        borderRadius: '0 0 7px 7px',
        borderTop: 'none',
        position: 'relative',
        overflow: 'hidden',
        background: '#fff',
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: full ? '85%' : '48%',
          background: '#6f4e37',
          borderRadius: '0 0 5px 5px',
        }} />
      </div>
      <div style={{
        width: 30,
        height: 2,
        background: '#222',
        borderRadius: 1,
        marginTop: 2,
      }} />
    </div>
  )
}

const SCALE = [
  { portion: 'מנה קצרה',  note: 'הכי חלש', cups: [{ full: false }] },
  { portion: 'מנה ארוכה', note: '',          cups: [{ full: true }] },
  { portion: 'כפול קצר',  note: '',          cups: [{ full: false }, { full: false }] },
  { portion: 'כפול ארוך', note: 'הכי חזק',  cups: [{ full: true }, { full: true }] },
]

export default function RefreshScreen({ onStart, onBack }) {
  return (
    <div className="refresh">
      <button className="refresh-back" onClick={onBack}>→ חזרה</button>
      <h2 className="refresh-title">רענון זיכרון</h2>
      <p className="refresh-subtitle">סקאלת החוזק</p>

      <div className="refresh-scale">
        {SCALE.map(({ portion, note, cups }) => (
          <div key={portion} className="scale-row">
            <div className="scale-cups">
              {cups.map((c, i) => (
                <CoffeeCup key={i} full={c.full} />
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
