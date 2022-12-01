function Card({ card }) {
  return (
    <div className="card">
      <p>{card.id}</p>
      <div className="card--front">
        <img src={card.image_uris.normal} />
      </div>
      <div className="card--back">
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Magic_the_gathering-card_back.jpg/200px-Magic_the_gathering-card_back.jpg" />
      </div>
    </div>
  );
}

export default Card;
