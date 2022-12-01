import Peer from "peerjs";
import { useEffect, useState } from "react";

const CONNECTION_STATUS = { DISCONNECTED: 0, JOINING: 1, CONNECTED: 2 };

function usePeerConnection({ onReceive }) {
  const [state, setState] = useState({
    peer: undefined,
    id: undefined,
    connection: undefined,
    status: CONNECTION_STATUS.JOINING,
  });

  function send(msg) {
    state.connection.send(msg);
  }

  function connect(dest_id) {
    const _connection = state.peer.connect(dest_id);
    _connection.on("data", (data) => onReceive(data));
    initialize(_connection);
  }

  function initialize(_connection) {
    setState((prev) => ({
      ...prev,
      connection: _connection,
      status: CONNECTION_STATUS.CONNECTED,
    }));
  }

  useEffect(() => {
    const _peer = new Peer();

    setState((prev) => ({ ...prev, peer: _peer }));

    _peer.on("open", (_id) => setState((prev) => ({ ...prev, id: _id })));

    _peer.on("connection", (_connection) => {
      initialize(_connection);
      _connection.on("data", (data) => onReceive(data));
    });

    return () => {
      _peer.destroy();
    };
  }, []);

  return { state, setState, connect, send };
}

export { usePeerConnection, CONNECTION_STATUS };
