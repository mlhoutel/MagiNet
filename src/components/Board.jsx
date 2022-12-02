import { useState, useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useMagicEngine, CARD_STATUS } from "../hooks/useMagicEngine";
import {
  usePeerConnection,
  CONNECTION_STATUS,
} from "../hooks/usePeerConnection";

import Hand from "./Zones/Hand";
import Library from "./Zones/Library";
import Battlefield from "./Zones/Battlefield";
import OpponentBattlefield from "./Zones/OpponentBattlefield";

function Board() {
  const onReceive = useCallback((data) => {
    setOpponent((prev) => ({ ...prev.opponent, ...data }));
  }, []);

  const { state: peer_state, connect, send } = usePeerConnection({ onReceive });
  const { state: magic_state, setPlayer, setOpponent } = useMagicEngine();

  const [dest_id, setDestId] = useState("");

  function onDragEnd(result) {
    console.log(result);

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

    // send updated battlefield
    send(references);

    setPlayer((prev) => ({ ...prev.player, ...references }));
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
        <>
          <section>
            <p>Connection established</p>
            <div>Other: {peer_state.connection.peer}</div>
          </section>

          <div className="board">
            <OpponentBattlefield cards={magic_state.opponent.battlefield} />

            <DragDropContext onDragEnd={onDragEnd}>
              <Battlefield cards={magic_state.player.battlefield} />
              <Library cards={magic_state.player.library} />
              <Hand cards={magic_state.player.hand} />
            </DragDropContext>
          </div>
        </>
      )}
    </>
  );
}

export default Board;
