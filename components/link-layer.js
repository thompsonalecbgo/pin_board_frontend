import { useNotes } from "../lib/notes-provider";
import { useLinks } from "../lib/links-provider";
import { LinkTo } from "../components/link-to";

function renderLink(note1, note2) {
  const x = note1.left;
  const y = note1.top;
  const x1 = note2.left;
  const y1 = note2.top;
  return <LinkTo key={note1.id} x={x} y={y} x1={x1} y1={y1} />;
}

export default function LinkLayer() {
  const [notes, setNotes] = useNotes();
  const [links, setLinks] = useLinks();

  const styles = {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "200",
  };
  return (
    <span style={styles}>
      {Object.keys(links).map((key) =>
        renderLink(notes[key], notes[links[key]])
      )}
    </span>
  );
}
