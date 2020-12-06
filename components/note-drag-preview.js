import { memo } from "react";
import { Note } from "../components/editable-note";

const styles = {
  position: "absolute",
  transform: "rotate(-7deg)",
  WebkitTransform: "rotate(-7deg)",
};

export const NoteDragPreview = memo(({ note }) => {
  return (
    <div style={styles}>
      <Note text={note.text} />
    </div>
  );
});
