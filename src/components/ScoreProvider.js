import { createContext, useContext, useState } from "react";

export const ScoreContext = createContext(null);

export function useScore() {
  const score = useContext(ScoreContext);

  if (!score) {
    throw new Error("useScore must be used within a ScoreProvider");
  }

  return score;
}

const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);

  const scoreValues = { score, setScore };

  return (
    <ScoreContext.Provider value={scoreValues}>
      {children}
    </ScoreContext.Provider>
  );
};

export default ScoreProvider;
