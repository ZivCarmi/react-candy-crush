import { useState, useMemo } from 'react';
import Board from './components/Board';
import Score from './components/Score';
import Head from './components/Head';
import Save from './components/Save';
import Rankings from './components/Rankings';
import { ScoreContext } from './components/ScoreContext';

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      <Head />
      <ScoreContext.Provider value={{score, setScore}}>
        <div className="game-panel">
          <div className="game-container">
            <Score />
            <Board />
          </div>
          <div className="side-panel">
            {score ? <Save /> : null}
            <Rankings />
          </div>
        </div>
      </ScoreContext.Provider>
    </div>
  );
}

export default App;
