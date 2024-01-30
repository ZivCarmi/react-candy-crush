import { useEffect, useState } from "react";
import Hammer from "../images/hammer.png";
import Blank from "../images/blank.png";

export default function HammerHint({
  boardState,
  cursorState,
  isHintClickedState,
  candyToHammerState,
}) {
  const { board, setBoard } = boardState;
  const { setCursor } = cursorState;
  const { setIsHintClicked } = isHintClickedState;
  const { candyToHammer, setCandyToHammer } = candyToHammerState;
  const [useCount, setUseCount] = useState(3);

  const HammerHint = () => {
    if (!useCount) return;

    setCursor(`url("${Hammer}")`);
    setIsHintClicked(true);
  };

  const hammerCandy = () => {
    if (!candyToHammer) return;

    const candyToHammerIndex = candyToHammer.dataset.index;
    board[candyToHammerIndex] = Blank;
    setBoard([...board]);
    setCandyToHammer(null);
    setIsHintClicked(false);
    setCursor(null);
    setUseCount(useCount - 1);
  };

  useEffect(() => {
    hammerCandy();
  }, [hammerCandy]);

  return (
    <li>
      <button
        type="button"
        className="hint"
        onClick={HammerHint}
        disabled={!useCount}
      >
        <span className="counter">{useCount}</span>
        <img src={Hammer} alt="Hammer" />
      </button>
    </li>
  );
}
