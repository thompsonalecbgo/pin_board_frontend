import { useState, createContext, useContext } from "react";

export const NotesProviderContext = createContext([{}, () => {}]);

export const useNotes = () => useContext(NotesProviderContext);

export function NotesProvider(props) {
  const [notes, setNotes] = useState(props.notes);
  return (
    <NotesProviderContext.Provider value={[notes, setNotes]}>
      {props.children ? props.children : ""}
    </NotesProviderContext.Provider>
  );
}