export default function HomeScreen({ onStart, onRefresh }) {
  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-icon">☕</div>
        <h1 className="home-title">כוסות קפה</h1>
        <p className="home-subtitle">תרגול מנות לברייסטות</p>
      </div>
      <div className="home-actions">
        <button className="home-btn home-btn--primary" onClick={onStart}>
          בואו נתחיל
        </button>
        <button className="home-btn home-btn--secondary" onClick={onRefresh}>
          רענן זיכרון
        </button>
      </div>
    </div>
  )
}
