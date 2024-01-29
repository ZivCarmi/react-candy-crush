import { useScore } from "./ScoreProvider";

export default function Score() {
  const { score } = useScore();

  return <div className="score">{score}</div>;
}
