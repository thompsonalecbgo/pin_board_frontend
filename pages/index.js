import React from "react";
import Head from "next/head";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getNotesData } from "../lib/notes";
import CrimeBoard from "../components/crime-board";
import CrimeBoardDragLayer from "../components/crime-board-drag-layer";

export default function Home({ notes }) {
  return (
    <>
      <Head>
        <title>Crime Board</title>
      </Head>
      <div>Create your own crime board for fun!</div>
      <DndProvider backend={HTML5Backend}>
        <CrimeBoard notes={notes} />
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
