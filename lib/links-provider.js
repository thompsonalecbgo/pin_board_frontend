import { createContext, useContext } from "react";

export const LinksProviderContext = createContext([{}, () => {}]);

export const useLinks = () => useContext(LinksProviderContext);