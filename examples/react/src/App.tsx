import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CardStoreWatcher } from "./CardStore";
import { useWatcher } from "@wal.js/react";

function App() {
  const state = useWatcher(CardStoreWatcher);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Wal.js + React</h1>
      <div className="card">
        <button onClick={() => CardStoreWatcher.value++}>
          count is {state}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
