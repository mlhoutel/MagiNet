import { useState } from "react";
import useCards from "../hooks/useDeck";

const CARD_STATUS = {};

const Deck = [
  "Island",
  "Island",
  "Island",
  "Island",
  "Island",
  "Island",
  "Island",
  "Island",
  "Cavern of Souls",
  "Cavern of Souls",
  "Mutavault",
  "Mutavault",
  "Mutavault",
  "Mutavault",
  "Strefan, Maurer Progenitor",
];

class Player {
  constructor({ local, name }) {
    this.local = local;
    this.name = name;
    this.health = 20;

    this.library = [];
    this.hand = [];
    this.battlefield = [];
  }
}

function useMagicEngine() {
  const [state, setState] = useState({
    player: new Player({ local: true, name: "player" }),
    opponent: new Player({ local: false, name: "opponent" }),
  });

  function onDataFetched(cards) {
    setState((prev) => ({
      ...prev,
      player: { ...prev.player, library: cards },
    }));
  }

  const { isLoading, isError } = useCards(onDataFetched, Deck);

  return { state, setState, isLoading, isError };
}

export { useMagicEngine, CARD_STATUS };
