import { useImmer } from "use-immer";
import useCards from "../hooks/useDeck";
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
];

class Player {
  constructor({ local, name }) {
    this.local = local;
    this.name = name;
    this.health = 20;
    this.library = [];
    this.hand = [];
  }
}

class Card {
  constructor({
    id,
    name,
    lang,
    uri,
    image_uris,
    mana_cost,
    cmc,
    type_line,
    colors,
  }) {
    this.id = id;
    this.name = name;
    this.lang = lang;
    this.uri = uri;
    this.image_uris = image_uris;
    this.mana_cost = mana_cost;
    this.cmc = cmc;
    this.type_line = type_line;
    this.colors = colors;
  }
}

function useMagicEngine() {
  const [state, setState] = useImmer({
    player: new Player({ local: true, name: "player" }),
    opponent: new Player({ local: false, name: "opponent" }),
  });

  function onDataFetched(cards) {
    setState((draft) => {
      draft.player.library = cards;
    });
  }

  const { isLoading, isError } = useCards(onDataFetched, Deck);

  return { state, isLoading, isError };
}

export { useMagicEngine };
