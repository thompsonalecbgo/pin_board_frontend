import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { ItemTypes } from "../lib/item-types";
import EditableNote from "../components/editable-note";

function getStyles(left, top, isDragging) {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: "absolute",
    transform,
    WebkitTransform: transform,
    opacity: isDragging ? 0.5 : 1,
    height: isDragging ? 0 : "",
  };
}

export default function DraggableNote({ note }) {
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: ItemTypes.NOTE,
      note: note,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: !note.isEdit,
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  });

  return (
    <div ref={drag} style={getStyles(note.left, note.top, isDragging)}>
      <EditableNote note={note} />
    </div>
  );
}
