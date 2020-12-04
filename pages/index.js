import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Draggable from "react-draggable";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import EditableNote from "../components/editable-note";
import DraggableNote from "../components/draggable-note";
import { getNotesData, addNote } from "../lib/notes";

export default function Home(props) {
  const savedNotes = props.notes.map((note) => {
    return { ...note, toEdit: false };
  });
  const [notes, setNotes] = useState(savedNotes);

  // const handleDoubleClick = async (e) => {
  //   const addedNote = await addNote({ text: "" });
  //   setNotes([...notes, { ...addedNote, toEdit: true }]);
  // };

  const handleDoubleClick = useCallback(async (e) => {
    const addedNote = await addNote({ text: "" });
    setNotes([...notes, { ...addedNote, toEdit: true }]);
  }, [notes]);

  // const renderNotes = ({ notes }) => {
  //   return notes.map((note) => (
  //     <EditableNote key={note.id} note={note} toEdit={note.toEdit} />
  //   ));
  // };

  const renderNotes = useCallback(({ notes }) => {
    return notes.map((note) => (
      <EditableNote key={note.id} note={note} toEdit={note.toEdit} />
    ));
  })

  return (
    <>
      <Head>
        <title>Crime Board</title>
      </Head>
      <div>Create your own crime board for fun!</div>
      <DndProvider backend={HTML5Backend}>
        <div id="crime-board" onDoubleClick={handleDoubleClick}>
          <div id="notes-container">{renderNotes({ notes })}</div>
        </div>
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
