var intelligence = {
	execute : function(board, name) {
	}, // expects board and returns pos
	getID : function() {
	},
	getName : function() {
	}
};

var KITE = function() {
	var isFirst = true, possibleChains = {
		none : [],
		one : [],
		two : [],
		enemy : []
	};

	this.cleanBoard = function() {
		possibleChains = {
			none : [],
			one : [],
			two : [],
			enemy : []
		};
	};
	this.checkBoard = function(board, name, enemy) {

		// horizontal
		for (var y = 0; y < board.length; y++) { // y
			var chain = {
				fields : [],
				ownCount : 0,
				enemyCount : 0
			};
			for (var x = 0; x < board[0].length; x++) { // x
				var field = {
					x : x,
					y : y,
				};
				if (board[y][x] == null) {
					chain.fields.push(field);
				}
				if (board[y][x] == name) {
					chain.ownCount++;
				}
				if (board[y][x] == enemy) {
					chain.enemyCount++;
				}
			}

			if (chain.fields.length + chain.ownCount == 3) {
				if (chain.ownCount == 0) {
					possibleChains.none.push(chain);
				}
				if (chain.ownCount == 1) {
					possibleChains.one.push(chain);
				}
				if (chain.ownCount == 2) {
					possibleChains.two.push(chain);
				}

			}
			if (chain.fields.length + chain.enemyCount == 3) {
				if (chain.enemyCount == 2) {
					possibleChains.enemy.push(chain);
				}
			}
		}

		// vertical
		for (var x = 0; x < board.length; x++) { // x
			var chain = {
				fields : [],
				ownCount : 0,
				enemyCount : 0
			};
			for (var y = 0; y < board[0].length; y++) { // y
				var field = {
					x : x,
					y : y,
				};
				if (board[y][x] == null) {
					chain.fields.push(field);
				}
				if (board[y][x] == name) {
					chain.ownCount++;
				}
				if (board[y][x] == enemy) {
					chain.enemyCount++;
				}
			}
			if (chain.fields.length + chain.ownCount == 3) {
				if (chain.ownCount == 0) {
					possibleChains.none.push(chain);
				}
				if (chain.ownCount == 1) {
					possibleChains.one.push(chain);
				}
				if (chain.ownCount == 2) {
					possibleChains.two.push(chain);
				}
			}
			if (chain.fields.length + chain.enemyCount == 3) {
				if (chain.enemyCount == 2) {
					possibleChains.enemy.push(chain);
				}
			}
		}

		// diagonal left-right
		for (var j = 0; j < 1; j++) {
			var chain = {
				fields : [],
				ownCount : 0,
				enemyCount : 0
			};

			var field1 = {
				x : 0,
				y : 0,
			};
			if (board[0][0] == null) {
				chain.fields.push(field1);
			}
			if (board[0][0] == name) {
				chain.ownCount++;
			}
			if (board[0][0] == enemy) {
				chain.enemyCount++;
			}
			var field2 = {
				x : 1,
				y : 1,
			};
			if (board[1][1] == null) {
				chain.fields.push(field2);
			}
			if (board[1][1] == name) {
				chain.ownCount++;
			}
			if (board[1][1] == enemy) {
				chain.enemyCount++;
			}
			var field3 = {
				x : 2,
				y : 2,
			};
			if (board[2][2] == null) {
				chain.fields.push(field3);
			}
			if (board[2][2] == name) {
				chain.ownCount++;
			}
			if (board[2][2] == enemy) {
				chain.enemyCount++;
			}

			if (chain.fields.length + chain.ownCount == 3) {
				if (chain.ownCount == 0) {
					possibleChains.none.push(chain);
				}
				if (chain.ownCount == 1) {
					possibleChains.one.push(chain);
				}
				if (chain.ownCount == 2) {
					possibleChains.two.push(chain);
				}
			}
			if (chain.fields.length + chain.enemyCount == 3) {
				if (chain.enemyCount == 2) {
					possibleChains.enemy.push(chain);
				}
			}
		}

		// diagonal right-left
		for (var j = 0; j < 1; j++) {
			var chain = {
				fields : [],
				ownCount : 0,
				enemyCount : 0
			};

			var field4 = {
				x : 2,
				y : 0,
			};
			if (board[0][2] == null) {
				chain.fields.push(field4);
			}
			if (board[0][2] == name) {
				chain.ownCount++;
			}
			if (board[0][2] == enemy) {
				chain.enemyCount++;
			}
			var field5 = {
				x : 1,
				y : 1,
			};
			if (board[1][1] == null) {
				chain.fields.push(field5);
			}
			if (board[1][1] == name) {
				chain.ownCount++;
			}
			if (board[1][1] == enemy) {
				chain.enemyCount++;
			}
			var field6 = {
				x : 0,
				y : 2,
			};
			if (board[2][0] == null) {
				chain.fields.push(field6);
			}
			if (board[2][0] == name) {
				chain.ownCount++;
			}
			if (board[2][0] == enemy) {
				chain.enemyCount++;
			}

			if (chain.fields.length + chain.ownCount == 3) {
				if (chain.ownCount == 0) {
					possibleChains.none.push(chain);
				}
				if (chain.ownCount == 1) {
					possibleChains.one.push(chain);
				}
				if (chain.ownCount == 2) {
					possibleChains.two.push(chain);
				}
			}
			if (chain.fields.length + chain.enemyCount == 3) {
				if (chain.enemyCount == 2) {
					possibleChains.enemy.push(chain);
				}
			}
		}

	};

	this.setField = function(board, types) {

		function choose() {
			random = Math.floor(Math.random() * 4);
			console.log(random);
			if (random == 0) {
				return {
					x : 0,
					y : 0
				};
			}
			if (random == 1) {
				return {
					x : 2,
					y : 0
				};
			}
			if (random == 2) {
				return {
					x : 0,
					y : 2
				};
			}
			if (random == 3) {
				return {
					x : 2,
					y : 2
				};
			}
		}

		// all turn after first
		if (isFirst == false) {
			// search longest chains and then choose random
			if (possibleChains.two.length > 0) {
				while (true) {
					randomChain = Math.floor(Math.random()
							* possibleChains.two.length);
					randomField = Math.floor(Math.random()
							* possibleChains.two[randomChain].fields.length);
					console.log("2");
					return possibleChains.two[randomChain].fields[randomField];
				}
			}

			// // if enemy is at winning, destroy him!
			if (possibleChains.enemy.length > 0) {
				for (var i = 0; i < possibleChains.enemy.length; i++) {
					if (possibleChains.enemy[i].enemyCount == 2) {
						console.log("enemy");
						return possibleChains.enemy[i].fields[0];
					}
				}
			}
			if (possibleChains.one.length > 0) {
				while (true) {
					randomChain = Math.floor(Math.random()
							* possibleChains.one.length);
					randomField = Math.floor(Math.random()
							* possibleChains.one[randomChain].fields.length);
					console.log("1");
					return possibleChains.one[randomChain].fields[randomField];
				}
			}
			if (possibleChains.none.length > 0) {
				while (true) {
					randomChain = Math.floor(Math.random()
							* possibleChains.none.length);
					randomField = Math.floor(Math.random()
							* possibleChains.none[randomChain].fields.length);
					console.log("0");
					return possibleChains.none[randomChain].fields[randomField];
				}
			}
			for (var i = 0; i < board.length; i++) {
				for (var j = 0; j < board[0].length; j++) {
					if (board[i][j] == null) {
						console.log("random");
						return {
							x : j,
							y : i,
						};
					}
				}
			}
		}

		// first turn, choose middle if valid - if not, choose random corner
		if (isFirst) {
			if (board[1][1] == null) {
				if (types[0] != types[1]) {
					isFirst = false;
				}
				console.log("first, middle");
				return {
					x : 1,
					y : 1
				};
			} else {

				isFirst = false;
				console.log("first, corner");
				return choose();
			}
		}
	};
};

KITE.prototype = Object.create(intelligence);

KITE.prototype.execute = function(board, name, enemy, types) {
	this.checkBoard(board, name, enemy);
	return this.setField(board, types);
};

KITE.prototype.getID = function() {
	return "1";
};

KITE.prototype.clean = function() {
	this.cleanBoard();
};

KITE.prototype.getName = function() {
	return "KITE";
};