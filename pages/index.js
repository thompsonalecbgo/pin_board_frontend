import React, { useState } from "react";
import Head from "next/head";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import normalizeArray from "../lib/normalize-array";
import { getNotesData } from "../lib/notes";
import { NotesProviderContext } from "../lib/notes-provider";
import CrimeBoard from "../components/crime-board";
import CrimeBoardDragLayer from "../components/crime-board-drag-layer";

function prepareNotes(notes) {
  const savedNotes = notes.map((note) => {
    return { ...note, toEdit: false };
  });
  return normalizeArray(savedNotes, "id");
}

export default function Home(props) {
  const [notes, setNotes] = useState(prepareNotes(props.notes));

  return (
    <>
      <Head>
        <title>Crime Board</title>
      </Head>
      <div>Create your own crime board for fun!</div>
      <DndProvider backend={HTML5Backend}>
        <NotesProviderContext.Provider value={[notes, setNotes]}>
          <CrimeBoard />
          <CrimeBoardDragLayer />
        </NotesProviderContext.Provider>
      </DndProvider>
    </>
  );
}

export async function getStaticProps() {
  const notes = (await getNotesData()) || [];
  return {
    props: { notes },
    revalidate: 1,
  };
}
