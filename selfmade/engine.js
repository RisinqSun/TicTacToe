var engine = {
	move : function(position) { // checks if move is valid (position: {x:[0,2],
		// y:[0,2]})
	},
	getBoard : function() { // returns board to update status
	},
	getTurn : function() { // returns current turn to update messages
	},
	isGameOver : function() { // checks if game has ended
	},
	getWinner : function() { // returns winner, if there is one
	}
};

var TicTacToe = function() {
	var player = null, board = null, turn = null;

	this.isValid = function(pos) {
		if (0 <= pos.x && pos.x < 3 && 0 <= pos.y && pos.y < 3) {
			return board[pos.y][pos.x] == null;
		} else {
			return false;
		}
	};

	this.mark = function(pos) {
		board[pos.y][pos.x] = player[turn];
	};

	this.definePlayer = function(players) {
		player = players;
	};

	this.countTurn = function() {
		turn = turn ^ 1;
	};

	this.resetBoard = function() {
		board = [ [ null, null, null ], [ null, null, null ],
				[ null, null, null ] ];
	};

	this.resetTurn = function() {
		turn = 0;
	};

	this.getBoardPrivate = function() {
		return board;
	};

	this.getTurnPrivate = function() {
		return turn;
	};

	this.getWinnerPrivate = function() {
		return player[turn ^ 1];
	};

	this.winner = function() {
		// horizontal
		if (board[0][0] == player[turn ^ 1] && board[0][1] == player[turn ^ 1]
				&& board[0][2] == player[turn ^ 1]) {
			loserRow = [ "id-0-1", "id-1-1", "id-2-1", "id-0-2", "id-1-2",
					"id-2-2" ];
			return true;
		}
		if (board[1][0] == player[turn ^ 1] && board[1][1] == player[turn ^ 1]
				&& board[1][2] == player[turn ^ 1]) {
			loserRow = [ "id-0-0", "id-1-0", "id-2-0", "id-0-2", "id-1-2",
					"id-2-2" ];
			return true;

		}
		if (board[2][0] == player[turn ^ 1] && board[2][1] == player[turn ^ 1]
				&& board[2][2] == player[turn ^ 1]) {
			loserRow = [ "id-0-0", "id-1-0", "id-2-0", "id-0-1", "id-1-1",
					"id-2-1" ];
			return true;

		}

		// vertical
		if (board[0][0] == player[turn ^ 1] && board[1][0] == player[turn ^ 1]
				&& board[2][0] == player[turn ^ 1]) {
			loserRow = [ "id-1-0", "id-1-1", "id-1-2", "id-2-0", "id-2-1",
					"id-2-2" ];
			return true;

		}
		if (board[0][1] == player[turn ^ 1] && board[1][1] == player[turn ^ 1]
				&& board[2][1] == player[turn ^ 1]) {
			loserRow = [ "id-0-0", "id-0-1", "id-0-2", "id-2-0", "id-2-1",
					"id-2-2" ];
			return true;

		}
		if (board[0][2] == player[turn ^ 1] && board[1][2] == player[turn ^ 1]
				&& board[2][2] == player[turn ^ 1]) {
			loserRow = [ "id-0-0", "id-0-1", "id-0-2", "id-1-0", "id-1-1",
					"id-1-2" ];
			return true;

		}

		// diagonal left-right
		if (board[0][0] == player[turn ^ 1] && board[1][1] == player[turn ^ 1]
				&& board[2][2] == player[turn ^ 1]) {
			loserRow = [ "id-1-0", "id-2-0", "id-0-1", "id-2-1", "id-0-2",
					"id-1-2" ];
			return true;

		}

		// diagonal right-left
		if (board[0][2] == player[turn ^ 1] && board[1][1] == player[turn ^ 1]
				&& board[2][0] == player[turn ^ 1]) {
			loserRow = [ "id-0-0", "id-1-0", "id-0-1", "id-2-1", "id-1-2",
					"id-2-2" ];
			return true;
		}

		return false;
	};

	this.getLoserRowPrivate = function() {
		return loserRow;
	};

	this.full = function() {
		for (var i = 0; i < board.length; i++) {
			for (var j = 0; j < board[0].length; j++) {
				if (board[i][j] == null) {
					return false;
				}
			}
		}
		return true;
	};
};

TicTacToe.prototype = Object.create(engine);

TicTacToe.prototype.init = function(players) {
	this.definePlayer(players);
	this.resetBoard();
	this.resetTurn();
};

TicTacToe.prototype.getBoard = function() {
	return this.getBoardPrivate();
};

TicTacToe.prototype.getTurn = function() {
	return this.getTurnPrivate();
};

TicTacToe.prototype.move = function(pos) {
	if (this.isValid(pos)) {
		this.mark(pos);
		this.countTurn();
		return true;
	} else {
		return false;
	}

};

TicTacToe.prototype.isGameOver = function(pos) {
	return this.winner() || this.full();
};

TicTacToe.prototype.getWinner = function() {
	if (this.winner()) {
		return [ this.getWinnerPrivate(), this.getLoserRowPrivate() ];
	}
};