import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "../Cards/DraggableCard";

function Battlefield({ cards }) {
  return (
    <div className="battlefield">
      <Droppable droppableId="battlefield" direction="horizontal">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <DraggableCard key={card.uuid} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Battlefield;
