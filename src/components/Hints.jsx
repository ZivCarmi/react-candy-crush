import HammerHint from "./HammerHint";

export default function Hints({
  boardState,
  cursorState,
  isHintClickedState,
  candyToHammerState,
}) {
  return (
    <ul className="hints">
      <HammerHint
        boardState={boardState}
        cursorState={cursorState}
        isHintClickedState={isHintClickedState}
        candyToHammerState={candyToHammerState}
      />
    </ul>
  );
}
