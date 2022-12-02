import { Draggable } from "react-beautiful-dnd";
import Card from "./Card";

function DraggableCard({ card, index, style }) {
  return (
    <Draggable draggableId={card.uuid} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card card={card} style={style} />
        </div>
      )}
    </Draggable>
  );
}

export default DraggableCard;
