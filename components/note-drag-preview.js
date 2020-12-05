import { useEffect, useState, memo } from "react";

import EditableNote from "../components/editable-note";

const styles = {
  position: "absolute",
  display: "inline-block",
  transform: "rotate(-7deg)",
  WebkitTransform: "rotate(-7deg)",
};

export const NoteDragPreview = memo(({ note }) => {
  return (
    <div>
      <EditableNote note={note} />
    </div>
  );
});
