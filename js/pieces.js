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

function initializePieces() {
    let board = document.querySelector(".chess_board");
    for (let i = 0; i < board.rows.length; ++i) {
        for (let j = 0; j < board.rows[i].cells.length; ++j) {
            if (chess_board[i][j]) {
                let piece = document.createElement("img");
                piece.src = pieces[chess_board[i][j]];
                piece.className = "piece";
                piece.id = chess_board[i][j];
                piece.draggable = false;

                board.rows[i].cells[j].appendChild(piece);
            }
        }
    }
}