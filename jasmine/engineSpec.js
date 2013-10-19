describe("Engine-Engine Testing", function() {
    var e = null;
    
    function setup(){
	e = new TicTacToe();
	    e.init([ "Thomas", "Jens" ]);
    };
    
// returnBoard
    	it("returnBoard: returns board with 3x3 empty entries", function() {
	setup();
	expect(e.getBoard()).toEqual(
	[ [ null, null, null ], [ null, null, null ], [ null, null, null ] ]);
    	});

// returnTurn
    	it("returnTurn: returns current player for turn", function() {
	setup();
	expect(e.getTurn()).toEqual(1);
	pos = {x:0, y:0};
	e.move(pos);
	expect(e.getTurn()).toEqual(0);
	pos = {x:1, y:0};
	e.move(pos);
	expect(e.getTurn()).toEqual(1);
    	});

// move
    	it("move: field unmarked and position valid", function() {
	setup();
	pos = {x : 0, y : 0};
	expect(e.move(pos)).toBe(true);
    	});
	
	it("move: position(+) invalid", function() {
	setup();
	pos = {x : 3, y : 3};
	expect(e.move(pos)).toBe(false);
	});
	
	it("move: position(-) invalid", function() {
		setup();
		pos = {x : -3, y : -3};
		expect(e.move(pos)).toBe(false);
		});

	it("move: position is valid, field marked", function() {
	setup();
	pos = {x : 0, y : 0};
	e.move(pos);
	pos = {x : 0, y : 0};
	expect(e.move(pos)).toBe(false);
	});

// isGameOver
	it("isGameOver: game has not started", function() {
	setup();
	expect(e.isGameOver()).toBe(false);
    	});
	
    	it("isGameOver: game has started, not ended yet", function() {
    	setup();
    	pos = {x : 0, y : 0};
	e.move(pos);
	expect(e.isGameOver()).toBe(false);
    	});
	
	it("isGameOver: game has started, x won", function() {
	setup();
	pos = {x : 0, y : 0}; // 1, x
	e.move(pos);
	pos = {x : 0, y : 1}; // 2, o
	e.move(pos);
	pos = {x : 1, y : 0}; // 3, x
	e.move(pos);
	pos = {x : 1, y : 1}; // 4, o
	e.move(pos);
	pos = {x : 2, y : 0}; // 5, x
	e.move(pos);
	expect(e.isGameOver()).toBe(true);
	});
	
	it("isGameOver: game has ended because of full board, no winner", function() {
	setup();
	pos = {x : 0, y : 0}; // 1, x
	e.move(pos);
	pos = {x : 0, y : 1}; // 2, o
	e.move(pos);
	pos = {x : 1, y : 0}; // 3, x
	e.move(pos);
	pos = {x : 2, y : 0}; // 4, o
	e.move(pos);
	pos = {x : 1, y : 2}; // 5, x
	e.move(pos);
	pos = {x : 1, y : 1}; // 6, o
	e.move(pos);
	pos = {x : 2, y : 1}; // 7, x
	e.move(pos);
	pos = {x : 2, y : 2}; // 8, o
	e.move(pos);
	pos = {x : 0, y : 2}; // 9, x
	e.move(pos);
	expect(e.isGameOver()).toBe(true);
	});

	it("isGameOver: game has ended because full board, x won", function() {
	setup();
	pos = {x : 0, y : 0}; // 1, x
	e.move(pos);
	pos = {x : 0, y : 1}; // 2, o
	e.move(pos);
	pos = {x : 1, y : 0}; // 3, x
	e.move(pos);
	pos = {x : 2, y : 0}; // 4, o
	e.move(pos);
	pos = {x : 1, y : 2}; // 5, x
	e.move(pos);
	pos = {x : 1, y : 1}; // 6, o
	e.move(pos);
	pos = {x : 0, y : 2}; // 7, x
	e.move(pos);
	pos = {x : 2, y : 1}; // 8, o
	e.move(pos);
	pos = {x : 2, y : 2}; // 9, x
	e.move(pos);
	expect(e.isGameOver()).toBe(true);
	expect(e.getWinner()[0]).toBe("Thomas");
	});

// getWinner	
	it("getWinner: correct winner", function() {
	setup();
	pos = {x : 0, y : 0}; // 1, x
	e.move(pos);
	pos = {x : 0, y : 1}; // 2, o
	e.move(pos);
	pos = {x : 1, y : 0}; // 3, x
	e.move(pos);
	pos = {x : 1, y : 1}; // 4, o
	e.move(pos);
	pos = {x : 2, y : 0}; // 5, x
	e.move(pos);
	expect(e.getWinner()[0]).toBe("Thomas");

	});

// resetBoard    
	it("resetBoard: checks if board is empty after reset", function() {
	setup();
	pos = {x : 0, y : 0}; // 1, x
	e.move(pos);
	pos = {x : 0, y : 1}; // 2, o
	e.move(pos);
	pos = {x : 1, y : 0}; // 3, x
	e.move(pos);
	pos = {x : 1, y : 1}; // 4, o
	e.move(pos);
	pos = {x : 2, y : 0}; // 5, x
	e.move(pos);
	e.resetBoard();
	expect(e.getBoard()).toEqual(
		[ [ null, null, null ], [ null, null, null ],
			[ null, null, null ] ]);
	});
});