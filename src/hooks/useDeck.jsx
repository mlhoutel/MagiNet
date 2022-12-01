import { useQuery } from "@tanstack/react-query";

/**
 * Fetch cards datas from names
 * @param {string[]} names of the cards to fetch
 * @returns {object[]} arrayf of card datas
 */
const getCards = async (names) => {
  const response = await fetch("https://api.scryfall.com/cards/collection", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifiers: names.map((name) => ({ name })),
    }),
  });

  const list = await response.json();
  return list.data;
};

function useDecks(onSuccess, names) {
  // Queries
  return useQuery({
    queryKey: ["decks", names],
    queryFn: () => getCards(names),
    onSuccess,
    onError: (err) => {
      console.error(err.message);
    },
  });
}

export default useDecks;
