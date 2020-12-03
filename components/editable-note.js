import { useRef, useEffect, useState } from "react";
import { editNote, deleteNote } from "../lib/notes";

export default function EditableNote({ note, toEdit }) {
  const [text, setText] = useState(note.text);
  const [isEditing, setEditing] = useState(toEdit);

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setEditing(true);
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleBlur = async (e) => {
    await editNote({ text: e.target.value, id: note.id });
    setEditing(false);
  };

  const inputRef = useRef(null);
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const savedNote = (
    <div className="note" onDoubleClick={handleDoubleClick}>
      {text}
    </div>
  );
  const noteEditor = (
    <textarea
      className="edit-note"
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      ref={inputRef}
    />
  );
  if (!text && !isEditing) {
    return null
  } else {
    return <>{isEditing ? noteEditor : savedNote}</>;
  }
}
