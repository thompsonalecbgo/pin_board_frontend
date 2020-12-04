import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { ItemTypes } from "../lib/item-types";
import EditableNote from "../components/editable-note";

function getStyles(left, top) {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: 'absolute',
    transform
  }
}

export default function DraggableNote({ note }) {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.NOTE, left: note.left, top: note.top },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

//   useEffect(() => {
//       preview(getEmptyImage(), { captureDraggingState: true });
//   })

  return (
    <div 
    ref={drag}
    style={getStyles(note.left, note.top)}
    >
      <EditableNote note={note} />
    </div>
  );
}
