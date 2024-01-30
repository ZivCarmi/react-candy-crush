import { Candy, Lollipop } from "lucide-react";
import { useScore } from "./ScoreProvider";

export default function Score() {
  const { score } = useScore();

  return (
    <div className="bg-blue-500 text-blue-100 text-lg sm:text-4xl text-center rounded-sm my-4 p-4 font-bold tracking-tight flex  items-center justify-center gap-3">
      <Lollipop className="text-red-300" />
      {score}
      <Candy className="text-green-300" />
    </div>
  );
}
