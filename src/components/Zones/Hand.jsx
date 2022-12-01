import Card from "../Cards/Card";

function Hand({ cards }) {
  return (
    <div>
      {cards.map((card, index) => (
        <Card key={card.id + "_" + index} card={card} />
      ))}
    </div>
  );
}

export default Hand;
