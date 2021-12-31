let chessBoard = [
    ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN','BR'],
    ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP','BP'],
    ['', '', '', '', '', '', '',''],
    ['', '', '', '', '', '', '',''],
    ['', '', '', '', '', '', '',''],
    ['', '', '', '', '', '', '',''],
    ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP','WP'],
    ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN','WR'],
];

const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
	console.log(`Listening on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

io.on("connection", function(socket) {
	console.log('Created socket connection successfully!');

	// Send board for client to locally initialize the pieces
	socket.emit('board_state', chessBoard);

	socket.on('server_move', move => {
		// If valid move, update server-side chessBoard and emit move to opponent
		chessBoard[move.end.row][move.end.col] = chessBoard[move.start.row][move.start.col];
        chessBoard[move.start.row][move.start.col] = '';
		socket.broadcast.emit("client_move", move)
	});
});