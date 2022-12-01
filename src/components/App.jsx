import { useState, useCallback } from "react";
import { useMagicEngine } from "../hooks/useMagicEngine";
import {
  usePeerConnection,
  CONNECTION_STATUS,
} from "../hooks/usePeerConnection";

import Hand from "./Zones/Hand";

function App() {
  const onReceive = useCallback((data) => {
    console.log(data);
  }, []);

  const { state: peer_state, connect, send } = usePeerConnection({ onReceive });
  const { state: magic_state } = useMagicEngine();

  const [dest_id, setDestId] = useState("");

  function handleSend(e) {
    e.preventDefault();
    send(e.target.msg.value);
    e.target.reset();
  }

  console.log(magic_state.player.library);

  return (
    <>
      <h3>My peer ID is: {peer_state.id}</h3>

      {magic_state.player.library && (
        <Hand cards={magic_state.player.library} />
      )}

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
    </>
  );
}

export default App;
