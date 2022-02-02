import { chessBoard, setBoardArr } from './board.js'
import * as Pawn from '../pieces/pawn.js'

const domain = document.domain + ':8080'
console.log(domain);
const socket = io.connect(domain);

let pieces = {
    BR : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg",
    BN : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg",
    BB : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg",
    BQ : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg",
    BK : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg",
    BP : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg",

    WR : "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg",
    WN : "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg",
    WB : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg",
    WQ : "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg",
    WK : "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg",
    WP : "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"
};

export function initializePieces() {
    let board = document.querySelector(".chess_board");
    for (let i = 0; i < board.rows.length; ++i) {
        for (let j = 0; j < board.rows[i].cells.length; ++j) {
            if (chessBoard[i][j]) {
                let piece = document.createElement("img");
                piece.src = pieces[chessBoard[i][j]];
                piece.className = "piece";
                piece.id = chessBoard[i][j];
                piece.draggable = false;

                board.rows[i].cells[j].appendChild(piece);
            }
        }
    }
}

function validMoves(name, coords) {
	return true // TEMPORARY in order to focus on NodeJS and live gameplay
}

// function validMoves(name, coords) {
//     if (name == "WP" || name == "BP") {
//         return Pawn.validMoves(name, coords);
//     }
// }

function isValidMove(name, coords, move) {
    return true; // TEMPORARY in order to focus on NodeJS and live gameplay
}

/*
function isValidMove(name, coords, move) {
    if (name == "WP" || name == "BP") {
        return Pawn.isValidMove(name, coords, move);
    }
}
*/

function displayValidMoves(validMoves) {
    return; // TEMPORARY in order to focus on NodeJS and live gameplay
}

/*
function displayValidMoves(validMoves) {
    if (!validMoves) return;

    let board = document.querySelector(".chess_board");
    for (let i = 0; i < validMoves.length; ++i) {
        board.rows[validMoves[i].row].cells[validMoves[i].col].style.backgroundColor = "red";
    }
}
*/

function clearValidMoves() {
    let squares = document.getElementsByClassName('square');
    for (let i = 0; i < squares.length; ++i) {
        if (squares[i].style.backgroundColor == "red") {
            squares[i].style.backgroundColor = '';
        }
    }
}

function sendMovePiece(start, end) {
	let startPos = {row: start.parentNode.rowIndex, col: start.cellIndex};
	let endPos = {row: end.parentNode.rowIndex, col: end.cellIndex};

    if (start.getElementsByTagName('img') && isValidMove(start.getElementsByTagName('img')[0].id, startPos, endPos)) {
        chessBoard[endPos.row][endPos.col] = chessBoard[startPos.row][startPos.col];
        chessBoard[startPos.row][startPos.col] = '';
        
        let endPiece = end.getElementsByTagName('img')[0]
        if (endPiece) endPiece.remove();
        end.appendChild(start.getElementsByTagName('img')[0]);

		socket.emit('server_move', {'start': startPos, 'end': endPos}) // socket.io emit new move to server
    }
    else {
        console.log('INVALID MOVE!')
    }
}

function receiveMovePiece(startPos, endPos) {
	let start = document.querySelector('.chess_board').rows[startPos.row].cells[startPos.col];
	let end = document.querySelector('.chess_board').rows[endPos.row].cells[endPos.col];

	if (start.getElementsByTagName('img') && isValidMove(start.getElementsByTagName('img')[0].id, startPos, endPos)) {
		console.log(startPos)
		console.log(endPos)
        chessBoard[endPos.row][endPos.col] = chessBoard[startPos.row][startPos.col];
        chessBoard[startPos.row][startPos.col] = '';
        
        let endPiece = end.getElementsByTagName('img')[0]
        if (endPiece) endPiece.remove();
        end.appendChild(start.getElementsByTagName('img')[0]);
    }
    else {
        console.log('INVALID MOVE!')
    }
}

export function initializeMoveEvents() {
    let square = document.getElementsByClassName('square');
    let squareSelected = false;

    for (let i = 0; i < square.length; ++i) {
        square[i].addEventListener('click', event => {
            if (square[i].getElementsByTagName('img').length > 0 && squareSelected == false) {
                displayValidMoves(validMoves(square[i].getElementsByTagName('img')[0].id, {row: square[i].parentNode.rowIndex, col: square[i].cellIndex}));

                for (let j = 0; j < square.length; ++j) {
                    if (square[j].style.outline != '') {
                        square[j].style.outline = '';
                    }
                }

                square[i].style.outline = '2px solid black';
                squareSelected = square[i];
            }
            else if (squareSelected && squareSelected != square[i]) {
                clearValidMoves()
                sendMovePiece(squareSelected, square[i]);
                
                squareSelected.style.outline = '';
                squareSelected = false;
            }
            else if (squareSelected) {
                clearValidMoves()
                squareSelected.style.outline = '';
                squareSelected = false;
            }
        });
    }
}

function updateBoard(sentBoard) {
	chessBoard = sentBoard;
}

/////////////////////// SOCKET.IO LISTENERS/////////////////////

socket.on('board_state', function(board) {
	console.log(board);
	setBoardArr(board);
	initializePieces();
});

socket.on('client_move', function(move) {
	receiveMovePiece(move.start, move.end);
});