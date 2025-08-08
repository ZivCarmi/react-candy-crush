import { candyColors, firstRowIndexes, width } from "@/lib/constants";
import { useEffect, useState } from "react";
import Blank from "../images/blank.png";
import Hints from "./Hints";
import { useScore } from "./ScoreProvider";

export default function Board() {
  const [board, setBoard] = useState([]);
  const [draggedCandy, setDraggedCandy] = useState(null);
  const [candyToBeSwitch, setCandyToBeSwitch] = useState(null);
  const { score, setScore } = useScore();
  const [isHintClicked, setIsHintClicked] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [candyToHammer, setCandyToHammer] = useState(null);

  const createBoard = () => {
    const randomBoard = [];
    for (let i = 0; i < width * width; i++) {
      randomBoard.push(
        candyColors[Math.floor(Math.random() * candyColors.length)]
      );
    }

    setBoard(randomBoard);
  };

  const checkForColumnOfFive = () => {
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

  const checkForRowOfFive = () => {
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

  const checkForColumnOfFour = () => {
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

  const checkForRowOfFour = () => {
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

  const checkForColumnOfThree = () => {
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

  const checkForRowOfThree = () => {
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
    setDraggedCandy(e.target);
  };

  const onDragDrop = (e) => {
    setCandyToBeSwitch(e.target);
  };

  const onTouchStart = (e) => {
    setDraggedCandy(e.touches[0].target);
  };

  const onTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element) {
      setCandyToBeSwitch(element);
    }
  };

  const onDragEnd = () => {
    if (draggedCandy && candyToBeSwitch) {
      const candyBeingDraggedIndex = parseInt(
        draggedCandy.getAttribute("data-index")
      );
      const candyBeingReplacedIndex = parseInt(
        candyToBeSwitch.getAttribute("data-index")
      );

      const validMoves = [
        candyBeingDraggedIndex - width,
        candyBeingDraggedIndex + 1,
        candyBeingDraggedIndex + width,
        candyBeingDraggedIndex - 1,
      ];
      const isValidMove = validMoves.includes(candyBeingReplacedIndex);

      if (isValidMove) {
        board[candyBeingDraggedIndex] = candyToBeSwitch.getAttribute("src");
        board[candyBeingReplacedIndex] = draggedCandy.getAttribute("src");

        const isAColumnOfFive = checkForColumnOfFive();
        const isARowOfFive = checkForRowOfFive();
        const isAColumnOfFour = checkForColumnOfFour();
        const isARowOfFour = checkForRowOfFour();
        const isAColumnOfThree = checkForColumnOfThree();
        const isARowOfThree = checkForRowOfThree();

        if (
          candyToBeSwitch &&
          (isAColumnOfFive ||
            isARowOfFive ||
            isAColumnOfFour ||
            isARowOfFour ||
            isAColumnOfThree ||
            isARowOfThree)
        ) {
          setDraggedCandy(null);
          setCandyToBeSwitch(null);
        } else {
          board[candyBeingDraggedIndex] = draggedCandy.getAttribute("src");
          board[candyBeingReplacedIndex] = candyToBeSwitch.getAttribute("src");
          setBoard([...board]);
        }
      }
    }
  };

  const setCandyToHammerTarget = (e) => {
    setCandyToHammer(e.target);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFive();
      checkForRowOfFive();
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveDownASquare();
      setBoard([...board]);
    }, 200);

    return () => clearInterval(timer);
  }, [
    checkForColumnOfFive,
    checkForRowOfFive,
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveDownASquare,
    board,
  ]);

  return (
    <div
      className={`${cursor ? "custom-cursor" : ""}`}
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
              draggable="true"
              onDragStart={onDragStart}
              onDrop={onDragDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDragEnd={onDragEnd}
              onClick={isHintClicked ? setCandyToHammerTarget : null}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onDragEnd}
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
