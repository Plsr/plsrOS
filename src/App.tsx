import "./App.css";

import { OpenProgramsProvider } from "./components/OpenProgramsContext";
import { OS } from "./components/OS";

function App() {
  return (
    <OpenProgramsProvider>
      <OS />
    </OpenProgramsProvider>
  );
}

export default App;
