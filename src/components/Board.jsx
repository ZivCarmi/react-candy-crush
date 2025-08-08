import { candyColors, firstRowIndexes, width } from "@/lib/constants";
import { useEffect, useState } from "react";
import Blank from "../images/blank.png";
import Hints from "./Hints";
import { useScore } from "./ScoreProvider";

export default function Board() {
  const [board, setBoard] = useState([]);
  const [draggedCandy, setDraggedCandy] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const { score, setScore } = useScore();
  const [isHintClicked, setIsHintClicked] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [candyToHammer, setCandyToHammer] = useState(null);
  const [lastCandyReplaced, setLastCandyReplaced] = useState(null);
  const [boardBeforeDrag, setBoardBeforeDrag] = useState([]);
  const [draggedTouchId, setDraggedTouchId] = useState(null);

  const createBoard = () => {
    const randomBoard = [];
    for (let i = 0; i < width * width; i++) {
      randomBoard.push(
        candyColors[Math.floor(Math.random() * candyColors.length)]
      );
    }

    setBoard(randomBoard);
  };

  const checkForColumnOfFive = (board) => {
    for (let i = 0; i < width * width - width * 4; i++) {
      const candiesToCheck = [
        i,
        i + width,
        i + width * 2,
        i + width * 3,
        i + width * 4,
      ];
      const colorToBeCheck = board[i];
      const isBlank = board[i] === Blank;

      if (
        candiesToCheck.every(
          (candyToCheck) => board[candyToCheck] === colorToBeCheck
        ) &&
        !isBlank
      ) {
        candiesToCheck.forEach((candyToCheck) => (board[candyToCheck] = Blank));
        setScore(score + 5);
        return true;
      }
    }
  };

  const checkForRowOfFive = (board) => {
    for (let i = 0; i < width * width - 4; i++) {
      const candiesToPassCheck = [
        4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38,
        39, 44, 45, 46, 47, 52, 53, 54, 55,
      ];

      if (candiesToPassCheck.includes(i)) continue;

      const candiesToCheck = [i, i + 1, i + 2, i + 3, i + 4];
      const colorToBeCheck = board[i];
      const isBlank = board[i] === Blank;

      if (
        candiesToCheck.every(
          (candyToCheck) => board[candyToCheck] === colorToBeCheck
        ) &&
        !isBlank
      ) {
        candiesToCheck.forEach((candyToCheck) => (board[candyToCheck] = Blank));
        setScore(score + 5);
        return true;
      }
    }
  };

  const checkForColumnOfFour = (board) => {
    for (let i = 0; i < width * width - width * 3; i++) {
      const candiesToCheck = [i, i + width, i + width * 2, i + width * 3];
      const colorToBeCheck = board[i];
      const isBlank = board[i] === Blank;

      if (
        candiesToCheck.every(
          (candyToCheck) => board[candyToCheck] === colorToBeCheck
        ) &&
        !isBlank
      ) {
        candiesToCheck.forEach((candyToCheck) => (board[candyToCheck] = Blank));
        setScore(score + 4);
        return true;
      }
    }
  };

  const checkForRowOfFour = (board) => {
    for (let i = 0; i < width * width - 3; i++) {
      const candiesToPassCheck = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55,
      ];

      if (candiesToPassCheck.includes(i)) continue;

      const candiesToCheck = [i, i + 1, i + 2, i + 3];
      const colorToBeCheck = board[i];
      const isBlank = board[i] === Blank;

      if (
        candiesToCheck.every(
          (candyToCheck) => board[candyToCheck] === colorToBeCheck
        ) &&
        !isBlank
      ) {
        candiesToCheck.forEach((candyToCheck) => (board[candyToCheck] = Blank));
        setScore(score + 4);
        return true;
      }
    }
  };

  const checkForColumnOfThree = (board) => {
    for (let i = 0; i < width * width - width * 2; i++) {
      const candiesToCheck = [i, i + width, i + width * 2];
      const colorToBeCheck = board[i];
      const isBlank = board[i] === Blank;

      if (
        candiesToCheck.every(
          (candyToCheck) => board[candyToCheck] === colorToBeCheck
        ) &&
        !isBlank
      ) {
        candiesToCheck.forEach((candyToCheck) => (board[candyToCheck] = Blank));
        setScore(score + 3);
        return true;
      }
    }
  };

  const checkForRowOfThree = (board) => {
    for (let i = 0; i < width * width - 2; i++) {
      // need to rethink that array to be dynamic
      const candiesToPassCheck = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55,
      ];

      if (candiesToPassCheck.includes(i)) continue;

      const candiesToCheck = [i, i + 1, i + 2];
      const colorToBeCheck = board[i];
      const isBlank = board[i] === Blank;

      if (
        candiesToCheck.every(
          (candyToCheck) => board[candyToCheck] === colorToBeCheck
        ) &&
        !isBlank
      ) {
        candiesToCheck.forEach((candyToCheck) => (board[candyToCheck] = Blank));
        setScore(score + 3);
        return true;
      }
    }
  };

  const moveDownASquare = () => {
    for (let i = board.length - 1; i >= 0; i--) {
      // generate random candy into blank squares
      if (firstRowIndexes.includes(i) && board[i] === Blank) {
        board[i] = candyColors[Math.floor(Math.random() * candyColors.length)];
      }

      // move candy to square below
      if (board[i] === Blank) {
        board[i] = board[i - width];
        board[i - width] = Blank;
      }
    }
  };

  const onDragStart = (e) => {
    if (board.includes(Blank)) return;
    setDraggedCandy(e.target);
    setIsDragging(true);
    setBoardBeforeDrag([...board]);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    if (isDragging) {
      const candyBeingDraggedIndex = parseInt(
        draggedCandy.getAttribute("data-index")
      );
      const candyBeingReplacedIndex = parseInt(
        e.target.getAttribute("data-index")
      );

      if (candyBeingReplacedIndex === lastCandyReplaced) return;

      const validMoves = [
        candyBeingDraggedIndex - width,
        candyBeingDraggedIndex + 1,
        candyBeingDraggedIndex + width,
        candyBeingDraggedIndex - 1,
      ];
      const isValidMove = validMoves.includes(candyBeingReplacedIndex);

      if (isValidMove) {
        const newBoard = [...board];
        newBoard[candyBeingDraggedIndex] = e.target.getAttribute("src");
        newBoard[candyBeingReplacedIndex] = draggedCandy.getAttribute("src");
        setBoard(newBoard);
        setLastCandyReplaced(candyBeingReplacedIndex);
      }
    }
  };

  const onTouchStart = (e) => {
    if (board.includes(Blank)) return;
    const touch = e.touches[0];
    setDraggedCandy(touch.target);
    setIsDragging(true);
    setBoardBeforeDrag([...board]);
    setDraggedTouchId(touch.identifier);
  };

  const onTouchMove = (e) => {
    e.preventDefault();
    if (isDragging) {
      const touch = Array.from(e.touches).find(
        (t) => t.identifier === draggedTouchId
      );
      if (!touch) return;

      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element) {
        const candyBeingDraggedIndex = parseInt(
          draggedCandy.getAttribute("data-index")
        );
        const candyBeingReplacedIndex = parseInt(
          element.getAttribute("data-index")
        );

        if (candyBeingReplacedIndex === lastCandyReplaced) return;

        const validMoves = [
          candyBeingDraggedIndex - width,
          candyBeingDraggedIndex + 1,
          candyBeingDraggedIndex + width,
          candyBeingDraggedIndex - 1,
        ];
        const isValidMove = validMoves.includes(candyBeingReplacedIndex);

        if (isValidMove) {
          const newBoard = [...board];
          newBoard[candyBeingDraggedIndex] = element.getAttribute("src");
          newBoard[candyBeingReplacedIndex] = draggedCandy.getAttribute("src");
          setBoard(newBoard);
          setLastCandyReplaced(candyBeingReplacedIndex);
        }
      }
    }
  };

  const onTouchEnd = (e) => {
    const touch = Array.from(e.changedTouches).find(
      (t) => t.identifier === draggedTouchId
    );
    if (!touch) return;

    onDragEnd();
    setIsDragging(false);
    setDraggedTouchId(null);
  };

  const onDragEnd = () => {
    if (draggedCandy && lastCandyReplaced) {
      const candyBeingDraggedIndex = parseInt(
        draggedCandy.getAttribute("data-index")
      );
      const candyBeingReplacedIndex = lastCandyReplaced;

      const validMoves = [
        candyBeingDraggedIndex - width,
        candyBeingDraggedIndex + 1,
        candyBeingDraggedIndex + width,
        candyBeingDraggedIndex - 1,
      ];
      const isValidMove = validMoves.includes(candyBeingReplacedIndex);

      if (isValidMove) {
        const newBoard = [...boardBeforeDrag];
        const temp = newBoard[candyBeingDraggedIndex];
        newBoard[candyBeingDraggedIndex] = newBoard[candyBeingReplacedIndex];
        newBoard[candyBeingReplacedIndex] = temp;

        const isAColumnOfFive = checkForColumnOfFive(newBoard);
        const isARowOfFive = checkForRowOfFive(newBoard);
        const isAColumnOfFour = checkForColumnOfFour(newBoard);
        const isARowOfFour = checkForRowOfFour(newBoard);
        const isAColumnOfThree = checkForColumnOfThree(newBoard);
        const isARowOfThree = checkForRowOfThree(newBoard);

        if (
          isAColumnOfFive ||
          isARowOfFive ||
          isAColumnOfFour ||
          isARowOfFour ||
          isAColumnOfThree ||
          isARowOfThree
        ) {
          setBoard(newBoard);
        } else {
          setBoard(boardBeforeDrag);
        }
      } else {
        setBoard(boardBeforeDrag);
      }
    }

    setIsDragging(false);
    setDraggedCandy(null);
    setLastCandyReplaced(null);
    setBoardBeforeDrag([]);
  };

  const setCandyToHammerTarget = (e) => {
    setCandyToHammer(e.target);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    if (isDragging) return;
    const timer = setInterval(() => {
      checkForColumnOfFive(board);
      checkForRowOfFive(board);
      checkForColumnOfFour(board);
      checkForRowOfFour(board);
      checkForRowOfThree(board);
      checkForRowOfThree(board);
      moveDownASquare();
      setBoard([...board]);
    }, 200);

    return () => clearInterval(timer);
  }, [board, isDragging]);

  return (
    <div
      className={`touch-none ${cursor ? "custom-cursor" : ""}`}
      style={{ cursor: cursor ? `${cursor}, auto` : "" }}
    >
      <div className="grid grid-cols-8">
        {board.map((candy, index) => {
          return (
            <img
              src={candy}
              alt="Candy"
              width={70}
              height={70}
              data-index={index}
              key={index}
              draggable={!board.includes(Blank)}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDragEnd={onDragEnd}
              onClick={isHintClicked ? setCandyToHammerTarget : null}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            />
          );
        })}
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