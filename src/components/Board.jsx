import { useState } from "react";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import Hints from "./Hints";
import Candy from "./Candy";

export default function Board() {
  const [isHintClicked, setIsHintClicked] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [candyToHammer, setCandyToHammer] = useState(null);

  const { isDragging, ...dragHandlers } = useDragAndDrop(gameLogic);
  const { board, setBoard } = useGameLogic(isDragging);

  const setCandyToHammerTarget = (e) => {
    setCandyToHammer(e.target);
  };

  return (
    <div
      className={`touch-none ${cursor ? "custom-cursor" : ""}`}
      style={{ cursor: cursor ? `${cursor}, auto` : "" }}
    >
      <div className="grid grid-cols-8">
        {board.map((candy, index) => (
          <Candy
            key={index}
            candy={candy}
            index={index}
            isHintClicked={isHintClicked}
            setCandyToHammerTarget={setCandyToHammerTarget}
            {...dragHandlers}
          />
        ))}
      </div>
      <Hints
        boardState={{ board, setBoard }}
        cursorState={{ cursor, setCursor }}
        isHintClickedState={{ isHintClicked, setIsHintClicked }}
        candyToHammerState={{ candyToHammer, setCandyToHammer }}
      />
    </div>
  );
}
