var engine = new TicTacToe();

//functions 
function setMessage(message) {
    $("#messageText").html(message);
}

function changeToId(posKI) {
    if (posKI == {
	x : 0,
	y : 0
    }) {
	return "a";
    }
    if (posKI == {
	x : 0,
	y : 1
    }) {
	return "b";
    }
    if (posKI == {
	x : 0,
	y : 2
    }) {
	return "c";
    }
    if (posKI == {
	x : 1,
	y : 0
    }) {
	return "d";
    }
    if (posKI == {
	x : 1,
	y : 1
    }) {
	return "e";
    }
    if (posKI == {
	x : 1,
	y : 2
    }) {
	return "f";
    }
    if (posKI == {
	x : 2,
	y : 0
    }) {
	return "g";
    }
    if (posKI == {
	x : 2,
	y : 1
    }) {
	return "h";
    }
    if (posKI == {
	x : 2,
	y : 2
    }) {
	return "i";
    }
}

function setMark(id) {
    if (engine.getTurn() == 0) {
	$("#" + id + " img").attr("src", "media/x_mark.png").attr("width",
		"90%");
    }
    if (engine.getTurn() == 1) {
	$("#" + id + " img").attr("src", "media/o_mark.png").attr("width",
		"90%");

    }
    var players = engine.getNames();
    var player = players[engine.getTurn() ^ 1];
    setMessage(player + ", your turn.");
}

function publishWinner() {
    winner = engine.getWinner();
    setMessage("Congrats! " + winner + ", you won.");
    alert("Congrats! " + winner + ", you won.");
    restart();

}

function checksStatus() {
    if (engine.isGameOver()) {
	if (engine.getWinner()) {
	    publishWinner();
	} else {
	    setMessage("No winner!");
	    alert("No winner!");
	    restart();
	}
    }
}

function restart() {
    window.location.reload();
}

function move(pos, id) {
    if (engine.move(pos)) {
	setMark(id);
    } else {
	setMessage("Gosh, invalid move!");
    }
    checksStatus();
};

// run game
function run() {

    // get player names
    var x = prompt("Player X, please enter your name here!", "");
    var o = prompt(
	    "Now it's your turn, Player O. Go ahead and enter your name!", "");
    var names = [ x, o ];

    // initialize player and board
    engine.init(names);
    if (x == null || x == "" || o == null || o == "") {
	alert("Missing name(s)!");
	restart();
    }
    // sets message in news box
    player = names[engine.getTurn() ^ 1];
    setMessage("Game is ready. " + player + ", your turn.");
}

function activateKI() {
    var enemy = new KI();
    idKI = changeToId(enemy.execute(board));
    document.setTimeout($("#" + idKI).trigger("click"), 2000);
}

$(document).ready(run);
//$.when(engine.move(pos)).then(activateKI);