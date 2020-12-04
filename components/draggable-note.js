import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { ItemTypes } from "../lib/item-types";
import EditableNote from "../components/editable-note";

export default function DraggableNote({ note, toEdit }) {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.NOTE },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

//   useEffect(() => {
//       preview(getEmptyImage(), { captureDraggingState: true });
//   })

  return (
    <div ref={drag}>
      <EditableNote note={note} toEdit={toEdit} />
    </div>
  );
}
