import "../styles/globals.css";
import { NotesProvider } from "../components/notes-provider";

function MyApp({ Component, pageProps }) {
  return (
    <NotesProvider>
      <Component {...pageProps} />
    </NotesProvider>
  );
}

export default MyApp;
