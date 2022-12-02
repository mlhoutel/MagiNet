import Card from "../Cards/Card";

function OpponentBattlefield({ cards }) {
  return (
    <div className="opponent-battlefield">
      {cards.map((card, index) => (
        <Card key={card.uuid} card={card} index={index} />
      ))}
    </div>
  );
}

export default OpponentBattlefield;
