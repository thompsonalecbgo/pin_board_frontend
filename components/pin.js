import { useNotes } from "../lib/notes-provider";
import { useLinks } from "../lib/links-provider";
import { LinkTo } from "../components/link-to";
import DraggablePin from "../components/draggable-pin";

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

export default function Pin({ note }) {
  return (
    <>
      <DraggablePin>{renderLink(note.id)}</DraggablePin>
    </>
  );
}
