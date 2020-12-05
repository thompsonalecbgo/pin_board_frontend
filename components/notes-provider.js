import { useState, createContext } from "react";

export const NotesProviderContext = createContext([{}, () => {}]);

export function NotesProvider(props) {
  const [notes, setNotes] = useState(props.notes);
  return (
    <NotesProviderContext.Provider value={[notes, setNotes]}>
      {props.notes ? props.notes : ""}
    </NotesProviderContext.Provider>
  );
}
