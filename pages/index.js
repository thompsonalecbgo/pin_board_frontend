import React, { useState } from "react";
import Head from "next/head";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import normalizeArray from "../lib/normalize-array";
import { getNotesData } from "../lib/notes";
import { getLinksData } from "../lib/links"
import { NotesProviderContext } from "../lib/notes-provider";
import { LinksProviderContext } from "../lib/links-provider";
import CrimeBoard from "../components/crime-board";
import CrimeBoardDragLayer from "../components/crime-board-drag-layer";

function prepareNotes(notes) {
  const savedNotes = notes.map((note) => {
    return { ...note, toEdit: false };
  });
  return normalizeArray(savedNotes, "id");
}

function prepareLinks(links) {
  return normalizeArray(links, "id")
}

export default function Home(props) {
  const [notes, setNotes] = useState(prepareNotes(props.notes));
  const [links, setLinks] = useState(prepareLinks(props.links));

  return (
    <>
      <Head>
        <title>Crime Board</title>
      </Head>
      {/* <div>Create your own crime board for fun!</div> */}
      <NotesProviderContext.Provider value={[notes, setNotes]}>
        <LinksProviderContext.Provider value={[links, setLinks]}>
          <DndProvider backend={HTML5Backend}>
            <CrimeBoard />
            <CrimeBoardDragLayer />
          </DndProvider>
        </LinksProviderContext.Provider>
      </NotesProviderContext.Provider>
    </>
  );
}

export async function getStaticProps() {
  const notes = (await getNotesData()) || [];
  const links = (await getLinksData()) || [];
  return {
    props: { notes, links },
    revalidate: 1,
  };
}

// ADD INSTRUCTIONS
