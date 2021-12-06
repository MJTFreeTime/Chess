export let chessBoard = [
    ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN','BR'],
    ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP','BP'],
    ['', '', '', '', '', '', '',''],
    ['', '', '', '', '', '', '',''],
    ['', '', '', '', '', '', '',''],
    ['', '', '', '', '', '', '',''],
    ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP','WP'],
    ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN','WR'],
];

export function initializeBoard() {
    let board = document.querySelector(".chess_board");

    for (let i = 0; i < 8; ++i) {
        let row = document.createElement("tr");
        row.className = "row";

        board.appendChild(row);
        for (let j = 0; j < 8; ++j) {
            let square = document.createElement("td");
            square.className = "square";
            square.id = (i + j) % 2 === 0 ? 'light' : 'dark';
            row.append(square);
        }
    }
}

export function elementToNotation(row, col) {
    return String.fromCharCode(97 + col) + (8 - row);
}

export function notationToElement(move) {
    return [Number(8 - move[1]), move[0].charCodeAt() - 97];
}