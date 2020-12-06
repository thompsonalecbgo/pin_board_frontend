import { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { ItemTypes } from "../lib/item-types";
import { pinWidth, pinFromTop } from "../lib/item-sizes";

const styles = {
  position: "absolute",
  top: `${pinFromTop}px`,
  left: "50%",
  height: `${pinWidth}px`,
  width: `${pinWidth}px`,
};

export default function DraggablePin({ note }) {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.PIN, note },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const [{ droppedNote, didDrop }, drop] = useDrop({
    accept: ItemTypes.PIN,
    // drop: () => console.log("hello"),
    collect: (monitor) => ({
      didDrop: !!monitor.didDrop(),
      droppedNote: monitor.getItem(),
    }),
  });
  
  const ref = useRef(null);
  drag(drop(ref));
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  });
  
  return (
    <>
      <span ref={ref} className="pin" style={styles}></span>
    </>
  );
}
