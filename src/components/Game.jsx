import ActionButtons from "./ActionButtons";
import Board from "./Board";
import Score from "./Score";

const Game = () => {
  return (
    <div className="h-screen flex justify-center flex-col w-full sm:max-w-[560px] mx-auto px-4">
      <ActionButtons />
      <Score />
      <Board />
    </div>
  );
};

export default Game;
