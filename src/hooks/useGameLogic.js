import { useState, useEffect } from "react";
import { candyColors, firstRowIndexes, width } from "@/lib/constants";
import Blank from "../images/blank.png";
import { useScore } from "@/components/ScoreProvider";

export const useGameLogic = (isDragging) => {
  const [board, setBoard] = useState([]);
  const { score, setScore } = useScore();

  const createBoard = () => {
    const randomBoard = [];
    for (let i = 0; i < width * width; i++) {
      randomBoard.push(
        candyColors[Math.floor(Math.random() * candyColors.length)]
      );
    }
    setBoard(randomBoard);
  };

  const checkForColumnOfFive = (currentBoard) => {
    for (let i = 0; i < width * width - width * 4; i++) {
      const candiesToCheck = [
        i,
        i + width,
        i + width * 2,
        i + width * 3,
        i + width * 4,
      ];
      const colorToBeCheck = currentBoard[i];
      const isBlank = currentBoard[i] === Blank;

      if (
        candiesToCheck.every(
          (candyToCheck) => currentBoard[candyToCheck] === colorToBeCheck
        ) &&
        !isBlank
      ) {
        candiesToCheck.forEach(
          (candyToCheck) => (currentBoard[candyToCheck] = Blank)
        );
        setScore((prev) => prev + 5);
        return true;
      }
    }
  };

  const checkForRowOfFive = (currentBoard) => {
    for (let i = 0; i < width * width - 4; i++) {
      const candiesToPassCheck = [
        4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38,
        39, 44, 45, 46, 47, 52, 53, 54, 55,
      ];

      if (candiesToPassCheck.includes(i)) continue;

      const candiesToCheck = [i, i + 1, i + 2, i + 3, i + 4];
      const colorToBeCheck = currentBoard[i];
      const isBlank = currentBoard[i] === Blank;

      if (
        candiesToCheck.every(
          (candyToCheck) => currentBoard[candyToCheck] === colorToBeCheck
        ) &&
        !isBlank
      ) {
        candiesToCheck.forEach(
          (candyToCheck) => (currentBoard[candyToCheck] = Blank)
        );
        setScore((prev) => prev + 5);
        return true;
      }
    }
  };

  const checkForColumnOfFour = (currentBoard) => {
    for (let i = 0; i < width * width - width * 3; i++) {
      const candiesToCheck = [i, i + width, i + width * 2, i + width * 3];
      const colorToBeCheck = currentBoard[i];
      const isBlank = currentBoard[i] === Blank;

      if (
        candiesToCheck.every(
          (candyToCheck) => currentBoard[candyToCheck] === colorToBeCheck
        ) &&
        !isBlank
      ) {
        candiesToCheck.forEach(
          (candyToCheck) => (currentBoard[candyToCheck] = Blank)
        );
        setScore((prev) => prev + 4);
        return true;
      }
    }
  };

  const checkForRowOfFour = (currentBoard) => {
    for (let i = 0; i < width * width - 3; i++) {
      const candiesToPassCheck = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55,
      ];

      if (candiesToPassCheck.includes(i)) continue;

      const candiesToCheck = [i, i + 1, i + 2, i + 3];
      const colorToBeCheck = currentBoard[i];
      const isBlank = currentBoard[i] === Blank;

      if (
        candiesToCheck.every(
          (candyToCheck) => currentBoard[candyToCheck] === colorToBeCheck
        ) &&
        !isBlank
      ) {
        candiesToCheck.forEach(
          (candyToCheck) => (currentBoard[candyToCheck] = Blank)
        );
        setScore((prev) => prev + 4);
        return true;
      }
    }
  };

  const checkForColumnOfThree = (currentBoard) => {
    for (let i = 0; i < width * width - width * 2; i++) {
      const candiesToCheck = [i, i + width, i + width * 2];
      const colorToBeCheck = currentBoard[i];
      const isBlank = currentBoard[i] === Blank;

      if (
        candiesToCheck.every(
          (candyToCheck) => currentBoard[candyToCheck] === colorToBeCheck
        ) &&
        !isBlank
      ) {
        candiesToCheck.forEach(
          (candyToCheck) => (currentBoard[candyToCheck] = Blank)
        );
        setScore((prev) => prev + 3);
        return true;
      }
    }
  };

  const checkForRowOfThree = (currentBoard) => {
    for (let i = 0; i < width * width - 2; i++) {
      const candiesToPassCheck = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55,
      ];

      if (candiesToPassCheck.includes(i)) continue;

      const candiesToCheck = [i, i + 1, i + 2];
      const colorToBeCheck = currentBoard[i];
      const isBlank = currentBoard[i] === Blank;

      if (
        candiesToCheck.every(
          (candyToCheck) => currentBoard[candyToCheck] === colorToBeCheck
        ) &&
        !isBlank
      ) {
        candiesToCheck.forEach(
          (candyToCheck) => (currentBoard[candyToCheck] = Blank)
        );
        setScore((prev) => prev + 3);
        return true;
      }
    }
  };

  const moveDownASquare = (currentBoard) => {
    for (let i = currentBoard.length - 1; i >= 0; i--) {
      if (firstRowIndexes.includes(i) && currentBoard[i] === Blank) {
        currentBoard[i] =
          candyColors[Math.floor(Math.random() * candyColors.length)];
      }

      if (currentBoard[i] === Blank) {
        currentBoard[i] = currentBoard[i - width];
        currentBoard[i - width] = Blank;
      }
    }
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    if (isDragging) return;
    const timer = setInterval(() => {
      const newBoard = [...board];
      checkForColumnOfFive(newBoard);
      checkForRowOfFive(newBoard);
      checkForColumnOfFour(newBoard);
      checkForRowOfFour(newBoard);
      checkForColumnOfThree(newBoard);
      checkForRowOfThree(newBoard);
      moveDownASquare(newBoard);
      setBoard(newBoard);
    }, 200);

    return () => clearInterval(timer);
  }, [board, isDragging]);

  return {
    board,
    setBoard,
    score,
    setScore,
    checkForColumnOfFive,
    checkForRowOfFive,
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
  };
};