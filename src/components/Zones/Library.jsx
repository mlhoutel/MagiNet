import Card from "../Cards/Card";

function Library({ cards }) {
  return (
    <div className="library">
      <div>
        {cards.map((card, index) => (
          <Card key={card.id + "_" + index} card={card} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Library;
