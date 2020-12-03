import React, { useState, useEffect } from "react";
import Head from "next/head";

import EditableNote from "../components/editable-note";
import { getUnemptyNotesData, addNote } from "../lib/notes";

export default function Home(props) {
  const savedNotes = props.notes.map((note) => {
    return { ...note, toEdit: false };
  });
  const [notes, setNotes] = useState(savedNotes);

  const handleDoubleClick = async (e) => {
    const addedNote = await addNote({ text: "" });
    setNotes([...notes, { ...addedNote, toEdit: true }]);
  };

  const renderNotes = ({ notes }) => {
    return notes.map((note) => (
      <EditableNote key={note.id} note={note} toEdit={note.toEdit} />
    ));
  };

  return (
    <>
      <Head>
        <title>Crime Board</title>
      </Head>
      <div id="crime-board" onDoubleClick={handleDoubleClick}>
        <div>Create your own crime board for fun!</div>
        <div id="notes-container">{renderNotes({ notes })}</div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const notes = (await getUnemptyNotesData()) || [];
  return {
    props: { notes },
    revalidate: 1,
  };
}
