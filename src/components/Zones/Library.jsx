import { Droppable } from "react-beautiful-dnd";
import Card from "../Cards/Card";

function Library({ cards }) {
  return (
    <div className="library">
      <Droppable droppableId="library" direction="vertical">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <Card key={card.id + "_" + index} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Library;
