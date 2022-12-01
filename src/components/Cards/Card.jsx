import { Draggable } from "react-beautiful-dnd";

function Card({ card, index, style }) {
  return (
    <Draggable draggableId={card.id + "_" + index} index={index}>
      {(provided, snapshot) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="content" style={style}>
            <div className="front">
              <img src={card.image_uris.normal} />
            </div>
            <div className="back">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Magic_the_gathering-card_back.jpg/200px-Magic_the_gathering-card_back.jpg" />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
