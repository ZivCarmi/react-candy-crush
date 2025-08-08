import { useState } from "react";
import { width } from "@/lib/constants";
import Blank from "../images/blank.png";

export const useDragAndDrop = ({
  board,
  setBoard,
  isDragging,
  setIsDragging,
  checkForColumnOfFive,
  checkForRowOfFive,
  checkForColumnOfFour,
  checkForRowOfFour,
  checkForColumnOfThree,
  checkForRowOfThree,
}) => {
  const [draggedCandy, setDraggedCandy] = useState(null);
  const [lastCandyReplaced, setLastCandyReplaced] = useState(null);
  const [boardBeforeDrag, setBoardBeforeDrag] = useState([]);
  const [draggedTouchId, setDraggedTouchId] = useState(null);

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
    if (board.includes(Blank) || isDragging) return;
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

  return {
    onDragStart,
    onDragOver,
    onDragEnd,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
