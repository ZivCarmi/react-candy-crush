import { useState } from "react";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { useGameLogic } from "@/hooks/useGameLogic";
import Candy from "./Candy";

export default function Board() {
  const [isDragging, setIsDragging] = useState(false);
  const gameLogic = useGameLogic(isDragging);
  const dragHandlers = useDragAndDrop({
    ...gameLogic,
    isDragging,
    setIsDragging,
  });

  return (
    <div className="touch-none">
      <div className="grid grid-cols-8">
        {gameLogic.board.map((candy, index) => (
          <Candy key={index} candy={candy} index={index} {...dragHandlers} />
        ))}
      </div>
    </div>
  );
}
