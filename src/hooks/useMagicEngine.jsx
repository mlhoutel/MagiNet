import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
    const library = cards.map((card) => ({ ...card, uuid: uuidv4() }));

    setState((prev) => ({
      ...prev,
      player: { ...prev.player, hand: library },
    }));
  }

  /**
   * Update the player value
   * @param {function(string)} fn
   */
  function setPlayer(fn) {
    setState((prev) => {
      const player = fn(prev.player);
      return { ...prev, player: player };
    });
  }

  /**
   * Update the opponent value
   * @param {function(string)} fn
   */
  function setOpponent(fn) {
    setState((prev) => {
      const opponent = fn(prev.opponent);
      return { ...prev, opponent: opponent };
    });
  }

  const { isLoading, isError } = useCards(onDataFetched, Deck);

  return { state, setState, setPlayer, setOpponent, isLoading, isError };
}

export { useMagicEngine, CARD_STATUS };
