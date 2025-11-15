import {createContext, useContext, type ReactNode} from "react";
import {usePageState} from "./usePageState";
import type {Page} from "../utils/types";

type AppStateContextType = ReturnType<typeof usePageState>;

const AppStateContext = createContext<AppStateContextType>({} as AppStateContextType);
type AppStateProviderProps = {
    children: ReactNode;
    initialState: Page;
}

export const AppStateProvider = ({children, initialState}: AppStateProviderProps) => {

    const pageStateHandlers = usePageState(initialState)
    return (
        <AppStateContext.Provider value={pageStateHandlers}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppState = () => useContext(AppStateContext);

