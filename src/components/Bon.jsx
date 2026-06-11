export default function Bon({ order }) {
  const {
    coffeeType, size, cup, defaultCup,
    milkOnSide, strength, waterBase, decaf, broken, milk,
  } = order

  const displayName = size ? `${coffeeType} ${size}` : coffeeType
  const showCup = cup !== defaultCup

  return (
    <div className="bon">
      <div className="bon-label">☕ בון</div>
      <div className="bon-content">
        <p className="bon-name">{displayName}</p>
        {strength && <p className="bon-line">{strength}</p>}
        {waterBase && <p className="bon-line">בסיס מים</p>}
        {decaf && <p className="bon-line">נטול</p>}
        {broken && <p className="bon-line">מפורק</p>}
        {milk && <p className="bon-line">{milk}</p>}
        {showCup && <p className="bon-line">{cup}</p>}
        {milkOnSide && <p className="bon-line">חלב בצד</p>}
      </div>
    </div>
  )
}
