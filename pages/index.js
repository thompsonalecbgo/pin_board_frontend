import React, { useEffect } from "react";
import Head from "next/head";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getNotesData } from "../lib/notes";
import CrimeBoard, {prepareNotes} from "../components/crime-board";
import CrimeBoardDragLayer from "../components/crime-board-drag-layer";
import { useNotes } from "../components/notes-provider";

export default function Home(props) {
  const [notes, setNotes] = useNotes();

  useEffect(async () => {
    await setNotes({ ...prepareNotes(props.notes)});
    console.log(notes)
  }, [props]);

  return (
    <>
      <Head>
        <title>Crime Board</title>
      </Head>
      <div>Create your own crime board for fun!</div>
      <DndProvider backend={HTML5Backend}>
        <CrimeBoard notes={props.notes} />
        <CrimeBoardDragLayer />
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
