import { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { ItemTypes } from "../lib/item-types";
import { useNotes } from "../lib/notes-provider";
import { useLinks } from "../lib/links-provider";
import { LinkTo } from "../components/link-to";

function renderLink(noteId) {
  const [notes, setNotes] = useNotes();
  const [links, setLinks] = useLinks();
  if (!links[noteId]) {
    return null;
  } else {
    const note1 = notes[links[noteId]];
    const note2 = notes[noteId];
    const x = note1.left;
    const y = note1.top;
    const x1 = note2.left;
    const y1 = note2.top;
    return <LinkTo key={note1.id} x={x} y={y} x1={x1} y1={y1} />;
  }
}

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
      droppedNote: monitor.getItem()
    }),
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
  return (
    <>
      <span ref={ref} className="pin" style={styles}>
        {renderLink(note.id)}
      </span>
    </>
  );
}
