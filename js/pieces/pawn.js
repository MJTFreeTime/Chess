import { chessBoard } from '../main/board.js'

export function validMoves(name, coords) {
    let movesArr = [];

    if (name == "WP") {
        if (chessBoard[coords.row - 1][coords.col] == '') {
            movesArr.push({row: coords.row - 1, col: coords.col});
        }

        if (coords.col > 0 && chessBoard[coords.row - 1][coords.col - 1] != '' && chessBoard[coords.row - 1][coords.col - 1][0] != 'W') {
            movesArr.push({row: coords.row - 1, col: coords.col - 1});
        }

        if (coords.col < 7 && chessBoard[coords.row - 1][coords.col + 1] != '' && chessBoard[coords.row - 1][coords.col + 1][0] != 'W') {
            movesArr.push({row: coords.row - 1, col: coords.col + 1});
        }
    }
    else if (name == "BP") {
        if (chessBoard[coords.row + 1][coords.col] == '') {
            movesArr.push({row: coords.row + 1, col: coords.col});
        }

        if (coords.col > 0 && chessBoard[coords.row + 1][coords.col - 1] != '' && chessBoard[coords.row + 1][coords.col - 1][0] != 'B') {
            movesArr.push({row: coords.row + 1, col: coords.col - 1});
        }

        if (coords.col < 8 && chessBoard[coords.row + 1][coords.col + 1] != '' && chessBoard[coords.row + 1][coords.col + 1][0] != 'B') {
            movesArr.push({row: coords.row + 1, col: coords.col + 1});
        }
    }

    return movesArr;
}

export function isValidMove(name, coords, move) {
    let legalMoves = validMoves(name, coords);
    for (let i = 0; i < legalMoves.length; ++i) {
        if (legalMoves[i].row == move.row && legalMoves[i].col == move.col) {
            return true;
        }
    }

    return false;
}