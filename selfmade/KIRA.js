var intelligence = {
	execute : function(board) {
	}, // expects board and returns pos
	getID : function() {
	},
	getName : function() {
	}
};

var KIRA = function() {

	var possibleFields = new Array();

	this.cleanBoard = function() {
		possibleFields = [];
	};

	this.checkBoard = function(board) {
		for (var i = 0; i < board.length; i++) {
			for (var j = 0; j < board[0].length; j++) {
				if (board[i][j] == null) {
					possibleFields.push({
						x : j,
						y : i
					});
				}
			}
		}
	};

	this.setField = function() {

		random = Math.floor(Math.random() * possibleFields.length);

		return possibleFields[random];
	};
};

KIRA.prototype = Object.create(intelligence);

KIRA.prototype.execute = function(board) {
	this.checkBoard(board);
	return this.setField();
};

KIRA.prototype.clean = function() {
	this.cleanBoard();
};

KIRA.prototype.getID = function() {
	return "0";
};

KIRA.prototype.getName = function() {
	return "KIRA";
};