import { createContext, useContext } from "react";

export const NotesProviderContext = createContext([{}, () => {}]);

export const useNotes = () => useContext(NotesProviderContext);