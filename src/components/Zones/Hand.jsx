import Card from "../Cards/Card";
import { useSprings, animated, config } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useRef } from "react";
import clamp from "lodash.clamp";
import swap from "lodash-move";

const fn =
  (order, active = false, originalIndex = 0, curIndex = 0, x = 0, y = 0) =>
  (index) => {
    return active && index === originalIndex
      ? {
          x: curIndex * 100 + x,
          y,
          scale: 1.1,
          zIndex: 1,
          immediate: (key) => key === "zIndex",
          config: (key) => (key === "x" ? config.stiff : config.default),
        }
      : {
          x: order.indexOf(index) * 100,
          y: 0,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        };
  };

function Hand({ cards: items }) {
  const order = useRef(items.map((_, index) => index)); // Store indicies as a local ref, this represents the item order
  const [springs, api] = useSprings(items.length, fn(order.current)); // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useDrag(
    ({ args: [originalIndex], active, movement: [x, y], ...rest }) => {
      console.log(rest);
      const curIndex = order.current.indexOf(originalIndex);
      const curRow = clamp(
        Math.round((curIndex * 100 + x) / 100),
        0,
        items.length - 1
      );
      const newOrder = swap(order.current, curIndex, curRow);
      api.start(fn(newOrder, active, originalIndex, curIndex, x, y)); // Feed springs new style data, they'll animate the view without causing a single render
      if (!active) order.current = newOrder;
    }
  );
  return (
    <div className="hand">
      <div className="hand-items" style={{ width: items.length * 100 }}>
        {springs.map(({ zIndex, shadow, y, x, scale }, i) => (
          <animated.div
            {...bind(i)}
            key={i}
            style={{
              zIndex,
              x,
              y,
              scale,
              touchAction: "none",
            }}
            children={<Card card={items[i]} />}
          />
        ))}
      </div>
    </div>
  );
}

export default Hand;
