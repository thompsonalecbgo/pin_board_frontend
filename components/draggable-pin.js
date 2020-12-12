import { useRef, useEffect, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import update from "immutability-helper";

import { ItemTypes } from "../lib/item-types";
import { useLinks } from "../lib/links-provider";
import { findLink, addLink } from "../lib/links";
import { pinWidth, pinFromTop } from "../lib/item-sizes";
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
        console.log("Link added")
        setLinks(
          update(links, {
            [addedLink.id]: {
              $set: {
                ...addedLink,
              },
            },
            ["dateUpdated"]: {
              $set: new Date().toString(),
            },
          })
        );
      }
    },
    [links]
  );

  const [, drag, preview] = useDrag({
    item: { type: ItemTypes.PIN, note },
  });

  const [{ droppedItem }, drop] = useDrop({
    accept: ItemTypes.PIN,
    drop: () => connectNotes(note, droppedItem.note),
    collect: (monitor) => ({
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
