function Card({ card, style }) {
  return (
    <div className="card">
      <div className="content" style={style}>
        <div className="front">
          <img src={card.image_uris.normal} />
        </div>
        <div className="back">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Magic_the_gathering-card_back.jpg/200px-Magic_the_gathering-card_back.jpg" />
        </div>
      </div>
    </div>
  );
}

export default Card;
