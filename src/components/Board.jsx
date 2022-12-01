import { useState, useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useMagicEngine, CARD_STATUS } from "../hooks/useMagicEngine";
import {
  usePeerConnection,
  CONNECTION_STATUS,
} from "../hooks/usePeerConnection";

import Hand from "./Zones/Hand";
import Library from "./Zones/Library";

function Board() {
  const onReceive = useCallback((data) => {
    console.log(data);
  }, []);

  const { state: peer_state, connect, send } = usePeerConnection({ onReceive });
  const { state: magic_state, setState: setMagicState } = useMagicEngine();

  const [dest_id, setDestId] = useState("");

  function handleSend(e) {
    e.preventDefault();
    send(e.target.msg.value);
    e.target.reset();
  }

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return; // dropped outside
    }

    const references = {
      library: magic_state.player.library,
      hand: magic_state.player.hand,
      battlefield: magic_state.player.battlefield,
    };

    const source = result.source.droppableId;
    const destination = result.destination.droppableId;

    // pop from the source
    const [removed] = references[source].splice(result.source.index, 1);

    // push to the destination
    references[destination].splice(result.destination.index, 0, removed);

    setMagicState((prev) => ({
      ...prev,
      player: { ...prev.player, ...references },
    }));
  }

  return (
    <>
      <h3>My peer ID is: {peer_state.id}</h3>

      {peer_state.status == CONNECTION_STATUS.JOINING && (
        <div>
          <p>Try joining by adding dest id</p>
          <input
            value={peer_state.dest_id}
            onChange={({ target }) => setDestId(target.value)}
          />
          <button disabled={!dest_id} onClick={() => connect(dest_id)}>
            Connect
          </button>
        </div>
      )}

      {peer_state.status == CONNECTION_STATUS.CONNECTED && (
        <section>
          <p>Connection established</p>
          <div>Other: {peer_state.connection.peer}</div>
          <form onSubmit={handleSend}>
            <input required name="msg" />
            <button>Send</button>
          </form>
        </section>
      )}

      <div className="board">
        <DragDropContext onDragEnd={onDragEnd}>
          {magic_state.player.library && (
            <>
              <Library cards={magic_state.player.library} />
              <Hand cards={magic_state.player.hand} />
            </>
          )}
        </DragDropContext>
      </div>
    </>
  );
}

export default Board;
