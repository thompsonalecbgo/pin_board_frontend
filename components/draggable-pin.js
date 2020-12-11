import { useRef, useEffect, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import update from "immutability-helper";

import { ItemTypes } from "../lib/item-types";
import { pinWidth, pinFromTop } from "../lib/item-sizes";
import { useLinks } from "../lib/links-provider";
import { findLink } from "../lib/links";
import { addLink } from "../lib/links";
import getDictValues from "../lib/get-dict-values";

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
    async (note1, note2) => {
      const linksAsDict = getDictValues(links);
      const linksFound = findLink(linksAsDict, note1, note2);
      if (linksFound.length == 0) {
        const addedLink = await addLink({ note1: note1.id, note2: note2.id });
        setLinks(
          update(links, {
            [addedLink.id]: {
              $set: {
                ...addedLink,
              },
            },
          })
        );
        // setLinks(
        //   update(links, {
        //     $push: [{ note1: note1.id, note2: note2.id }],
        //   })
        // );
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
