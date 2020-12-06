import { memo } from "react";

const styles = {
  position: "absolute",
  transform: "rotate(-7deg)",
  WebkitTransform: "rotate(-7deg)",
};

export const NoteDragPreview = memo(({ note }) => {
  return (
    <div className="note" style={styles}>
      {note.text}
    </div>
  );
});
