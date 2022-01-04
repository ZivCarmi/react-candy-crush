import {useState, useEffect} from 'react'
import RedCandy from '../images/red-candy.png'
import GreenCandy from '../images/green-candy.png'
import PurpleCandy from '../images/purple-candy.png'
import BlueCandy from '../images/blue-candy.png'
import YellowCandy from '../images/yellow-candy.png'
import OrangeCandy from '../images/orange-candy.png'
import Blank from '../images/blank.png'

const width = 8;

const candyColors = [
    RedCandy,
    GreenCandy,
    PurpleCandy,
    BlueCandy,
    YellowCandy,
    OrangeCandy
];

const firstRowIndexes = [...Array(width).keys()];

export default function Board() {
    const [board, setBoard] = useState([]);
    const [draggedCandy, setDraggedCandy] = useState(null);
    const [candyToBeSwitch, setCandyToBeSwitch] = useState(null);

    const createBoard = () => {
        const randomBoard = [];
        for (let i = 0; i < width * width; i++) {
            randomBoard.push(candyColors[Math.floor(Math.random() * candyColors.length)]);
        }

        setBoard(randomBoard);
    }
    
    const checkForColumnOfFour = () => {
        for (let i = 0; i < (width * width) - (width * 3); i++) {
            const candiesToCheck = [i, i + width, i + width * 2, i + width * 3];
            const colorToBeCheck = board[i];
            const isBlank = board[i] === Blank;

            if (candiesToCheck.every(candyToCheck => board[candyToCheck] === colorToBeCheck) && !isBlank) {
                candiesToCheck.forEach(candyToCheck => board[candyToCheck] = Blank);
                return true;
            }
        }
    }

    const checkForRowOfFour = () => {
        for (let i = 0; i < (width * width) - 3; i++) {
            const candiesToPassCheck = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55];

            if (candiesToPassCheck.includes(i)) continue;

            const candiesToCheck = [i, i + 1, i + 2, i + 3];
            const colorToBeCheck = board[i];
            const isBlank = board[i] === Blank;
            
            if (candiesToCheck.every(candyToCheck => board[candyToCheck] === colorToBeCheck) && !isBlank) {
                candiesToCheck.forEach(candyToCheck => board[candyToCheck] = Blank);
                return true;
            }
        }
    }

    const checkForColumnOfThree = () => {
        for (let i = 0; i < (width * width) - (width * 2); i++) {
            const candiesToCheck = [i, i + width, i + width * 2];
            const colorToBeCheck = board[i];
            const isBlank = board[i] === Blank;

            if (candiesToCheck.every(candyToCheck => board[candyToCheck] === colorToBeCheck) && !isBlank) {
                candiesToCheck.forEach(candyToCheck => board[candyToCheck] = Blank);
                return true;
            }
        }
    }

    const checkForRowOfThree = () => {
        for (let i = 0; i < (width * width) - 2; i++) {
            // need to rethink that array to be dynamic
            const candiesToPassCheck = [6,7,14,15,22,23,30,31,38,39,46,47,54,55];

            if (candiesToPassCheck.includes(i)) continue;

            const candiesToCheck = [i, i + 1, i + 2];
            const colorToBeCheck = board[i];
            const isBlank = board[i] === Blank;
            
            if (candiesToCheck.every(candyToCheck => board[candyToCheck] === colorToBeCheck) && !isBlank) {
                candiesToCheck.forEach(candyToCheck => board[candyToCheck] = Blank);
                return true;
            }
        }
    }

    const moveDownASquare = () => {
        for (let i = 0; i < board.length - width; i++) {

            // generate random candy into blank squares
            if (firstRowIndexes.includes(i) && board[i] === Blank) {
                board[i] = candyColors[Math.floor(Math.random() * candyColors.length)];
            }

            // move candy to square below
            if (board[i + width] === Blank) {
                board[i + width] = board[i];
                board[i] = Blank;
            }
        }
    }

    const onDragStart = e => {
        setDraggedCandy(e.target);
    }

    const onDragDrop = e => {
        setCandyToBeSwitch(e.target);
    }

    const onDragEnd = () => {
        const candyBeingDraggedIndex = parseInt(draggedCandy.getAttribute('data-index'));
        const candyBeingReplacedIndex = parseInt(candyToBeSwitch.getAttribute('data-index'));

        const validMoves = [
            candyBeingDraggedIndex - width,
            candyBeingDraggedIndex + 1,
            candyBeingDraggedIndex + width,
            candyBeingDraggedIndex - 1
        ];
        const isValidMove = validMoves.includes(candyBeingReplacedIndex);

        if (isValidMove) {
            board[candyBeingDraggedIndex] = candyToBeSwitch.getAttribute('src');
            board[candyBeingReplacedIndex] = draggedCandy.getAttribute('src');

            const isAColumnOfFour = checkForColumnOfFour();
            const isARowOfFour = checkForRowOfFour();
            const isAColumnOfThree = checkForColumnOfThree();
            const isARowOfThree = checkForRowOfThree();

            if (candyToBeSwitch && (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree) ) {
                setDraggedCandy(null);
                setCandyToBeSwitch(null);
            } else {
                board[candyBeingDraggedIndex] = draggedCandy.getAttribute('src');
                board[candyBeingReplacedIndex] = candyToBeSwitch.getAttribute('src');
                setBoard([...board])
            }
        }
    }

    useEffect(() => {
        createBoard();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour();
            checkForRowOfFour();
            checkForColumnOfThree();
            checkForRowOfThree();
            moveDownASquare();
            setBoard([...board]);
        }, 200);
        return () => clearInterval(timer);

    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveDownASquare, board])

    return (
        <div className="board">
            {board.map((candy, index) => {
                return (
                    <img src={candy} className="candy"
                    data-index={index}
                    key={index}
                    draggable="true"
                    onDragStart={onDragStart}
                    onDrop={onDragDrop}
                    onDragOver={e => e.preventDefault()}
                    onDragEnter={e => e.preventDefault()}
                    onDragLeave={e => e.preventDefault()}
                    onDragEnd={onDragEnd}
                    />
                );
            })}
        </div>
    )
}
