import Board from "./components/Board";
import Head from "./components/Head";
import Score from "./components/Score";
import SidePanel from "./components/SidePanel";

function App() {
  return (
    <div className="App">
      <Head />
      <div className="game-panel">
        <div className="game-container">
          <Score />
          <Board />
        </div>
        <SidePanel />
      </div>
    </div>
  );
}

export default App;
