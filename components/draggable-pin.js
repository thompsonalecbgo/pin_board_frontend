import { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { ItemTypes } from "../lib/item-types";

export default function DraggablePin() {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.PIN },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop({
    accept: ItemTypes.PIN,
    // drop: () => moveKnight(x, y),
  });
  const styles = {
    position: "absolute",
    right: "50%",
    left: "50%",
    top: "10px",
  };
  const ref = useRef(null);
  drag(drop(ref));
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  });
  return <span ref={ref} className="pin" style={styles}></span>;
}
