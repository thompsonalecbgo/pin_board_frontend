import { useRef, useEffect, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import update from "immutability-helper";

import { ItemTypes } from "../lib/item-types";
import { pinWidth, pinFromTop } from "../lib/item-sizes";
import { useLinks } from "../lib/links-provider";

const styles = {
  position: "absolute",
  top: `${pinFromTop}px`,
  left: "50%",
  height: `${pinWidth}px`,
  width: `${pinWidth}px`,
};

export default function DraggablePin({ note }) {
  const [links, setLinks] = useLinks();

  const connectNotes = useCallback(
    (note1, note2) => {
      if (links[note1.id]) {
        console.log("hi sandy")
      } else if (links[note2.id]) {
        console.log("hi georgie")
      } else {
        setLinks(
          update(links, {
            [note1.id]: {
              $set: note2.id,
            },
          })
        );
      }
    },
    [links]
  );

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.PIN, note },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const [{ droppedItem, didDrop }, drop] = useDrop({
    accept: ItemTypes.PIN,
    drop: () => connectNotes(note, droppedItem.note),
    collect: (monitor) => ({
      didDrop: !!monitor.didDrop(),
      droppedItem: monitor.getItem(),
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
