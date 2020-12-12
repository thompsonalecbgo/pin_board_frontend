import React, { useState, useEffect } from "react";
import Head from "next/head";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

import normalizeArray from "../lib/normalize-array";
import { getNotesData } from "../lib/notes";
import { getLinksData } from "../lib/links";
import { NotesProviderContext } from "../lib/notes-provider";
import { LinksProviderContext } from "../lib/links-provider";
import CrimeBoard from "../components/crime-board";
import CrimeBoardDragLayer from "../components/crime-board-drag-layer";

function prepareNotes(notes) {
  const notEditingNotes = notes.map((note) => {
    return { ...note, toEdit: false };
  });
  return normalizeArray(notEditingNotes, "id");
}

function prepareLinks(links) {
  return normalizeArray(links, "id");
}

export default function Home(props) {
  const [notes, setNotes] = useState(props.notes);
  const [links, setLinks] = useState(props.links);

  useEffect(() => {
    const cachedNotesDateUpdated = Date.parse(notes.dateUpdated)
    const cachedLinksDateUpdated = Date.parse(links.dateUpdated)
    
    const savedNotes = localStorage.getItem('_notes')
    const savedLinks = localStorage.getItem("_links")
    
    if (!savedNotes) {
      localStorage.setItem("_notes", JSON.stringify(notes));
    } else {
      const localNotes = JSON.parse(savedNotes)
      const localNotesDateUpdated = Date.parse(localNotes.dateUpdated)
      console.log('')
      console.log(`cachedNotes ${cachedNotesDateUpdated}`)
      console.log(` localNotes ${localNotesDateUpdated}`)
      if (localNotesDateUpdated > cachedNotesDateUpdated) {
        console.log("local storage used")
        setNotes(localNotes)
      } else {
        console.log("local storage not used")
        localStorage.setItem("_notes", JSON.stringify(notes));
      }
    }
    
    if (!savedLinks) {
      localStorage.setItem("_links", JSON.stringify(links));
    } else {
      const localLinks = JSON.parse(savedLinks)
      const localLinksDateUpdated = Date.parse(localLinks.dateUpdated)
      // console.log('')
      // console.log(`cachedLinks ${cachedLinksDateUpdated}`)
      // console.log(`localLinks ${localLinksDateUpdated}`)
      if (localLinksDateUpdated > cachedLinksDateUpdated) {
        // console.log("local storage used")
        setLinks(localLinks)
      } else {
        // console.log("local storage not used")
        localStorage.setItem("_links", JSON.stringify(links));
      }
    }
  }, [notes, links]);

  return (
    <>
      <Head>
        <title>Pin Board</title>
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

  const preparedNotes = {
    ...prepareNotes(notes),
    dateUpdated: (new Date()).toString()
  }
  const preparedLinks = {
    ...prepareLinks(links),
    dateUpdated: (new Date()).toString()
  }

  // console.log(preparedNotes)
  // console.log(preparedLinks)

  return {
    props: { 
      notes: preparedNotes, 
      links: preparedLinks,
    },
    revalidate: 1,
  };
}

// ADD DATE UPDATED
// COMPARE WHICH IS LATEST AND USE THAT
