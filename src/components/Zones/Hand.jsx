import { Droppable } from "react-beautiful-dnd";
import Card from "../Cards/Card";

function Hand({ cards }) {
  return (
    <div className="hand">
      <Droppable droppableId="hand" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="hand-items"
          >
            {cards.map((card, index) => (
              <Card
                key={card.id + "_" + index}
                card={card}
                index={index}
                style={{
                  transform: `rotateZ(${index - cards.length / 2}deg)`,
                  paddingTop: `${
                    200 -
                    200 * Math.cos((index - cards.length / 2) / cards.length)
                  }px`,
                }}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Hand;
