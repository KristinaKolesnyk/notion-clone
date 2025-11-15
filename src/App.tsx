import './App.css'
import {Page} from "./Page/Page";
import {createPage} from "./utils/createPage";
import {AppStateProvider} from "./state/AppStateContext";

const initialState = createPage();

function App() {
  return (
    <AppStateProvider initialState={initialState}>
        <Page />
    </AppStateProvider>
  )
}

export default App
