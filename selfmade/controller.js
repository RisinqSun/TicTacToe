var Controller = function() {

	this.display = function(id) {
		$(document).ready(function() {
			$("#" + id).css("visibility", "visible");
		});
	};

	this.hide = function(id) {
		$(document).ready(function() {
			$("#" + id).css("visibility", "hidden");
		});
	};

	this.next = function(state) {
		state.init();
	};

	this.mark = function(id) {
		if (engine.getTurn() == 1) {
			$("#" + id).css("background-image", "url(media/x_mark.png)");
		}
		if (engine.getTurn() == 0) {
			$("#" + id).css("background-image", "url(media/o_mark.png)");
		}
	};

	this.check = function() {
		if ($("#player_x_text").val() != "" && $("#player_o_text").val() != ""
				&& $("#player_x_text").val() != $("#player_o_text").val()) {
			return true;
		}
	};

	this.addClickHandler = function() {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if ($("#id-" + j + "-" + i).css("background-image") == "none") {
					$("#id-" + j + "-" + i).attr("onClick",
							"game.execute(this)");
				}
			}
		}
	};

	this.removeClickHandler = function() {
		$("div[class='game_field']").removeAttr("onClick");
	};
};

var Configurator = function() {
	this.init = function() {
		state = "config";
		control.display("start_page");
	};

	this.execute = function() {
		model
				.setNames([ $("#player_x_text").val(),
						$("#player_o_text").val() ]);
		model.setTypes([ $("input[name='player_x_radio']:checked").val(),
				$("input[name='player_o_radio']:checked").val() ]);
		if (control.check()) {
			control.hide("start_page");
			control.next(game);

		}
	};
};

var Game = function() {

	var aiList = {}, isAIFinished = false;
	;

	function addAI(AI) {
		aiList[AI.getID()] = AI;
	}

	var int = null, loser = null;
	this.init = function() {
		control.display("game_page");
		engine.init(model.getNames());
		addAI(new KIRA());
		addAI(new KITE());

		if (model.getTypes()[0] == "PERSON" || model.getTypes()[1] == "PERSON") {
			control.addClickHandler();
		}

		if (model.getTypes()[0] != "PERSON") {
			this.execute();
		}
	};

	this.execute = function(humanDiv) {
		var self = this, humanArray = null, humanPos = null, humanID = null;

		function initHuman(humanDiv) {
			humanArray = $(humanDiv).attr("id").split("-");
			humanID = $(humanDiv).attr("id");
			humanPos = {
				x : humanArray[1],
				y : humanArray[2]
			};
		}

		if (engine.isGameOver(humanPos) == false) {
			if (model.getTypes()[0] == "PERSON"
					&& model.getTypes()[1] == "PERSON") { // person vs. person
				initHuman(humanDiv);
				this.human(humanPos, humanID);
			} else if (model.getTypes()[0] == "PERSON"
					&& model.getTypes()[1] != "PERSON") { // person vs. KI
				initHuman(humanDiv);
				this.human(humanPos, humanID);
				control.removeClickHandler();
				if (engine.isGameOver(humanPos) == false) {
					window.setTimeout(function() {
						self.ai(aiList[model.getTypes()[1]]);
						window.setTimeout(function() {
							control.addClickHandler();
						}, 10);
					}, 1000);
				}
			} else if (model.getTypes()[0] != "PERSON"
					&& model.getTypes()[1] == "PERSON") {
				if (isAIFinished == false) {
					control.removeClickHandler();
					this.ai(aiList[model.getTypes()[0]]);
					control.addClickHandler();
					isAIFinished = true;
					return;
				}
				if (isAIFinished) {
					initHuman(humanDiv);
					this.human(humanPos, humanID);
					control.removeClickHandler();
					window.setTimeout(function() {
						self.ai(aiList[model.getTypes()[0]]);
					}, 1000);
					control.addClickHandler();

				}
			} else if (model.getTypes()[0] != "PERSON"
					&& model.getTypes()[1] != "PERSON") {
				var turn = "first";
				int = window.setInterval(function() {
					if (turn == "first") {
						self.ai(aiList[model.getTypes()[0]]);
						turn = "second";
					} else if (turn == "second") {
						self.ai(aiList[model.getTypes()[1]]);
						turn = "first";
					}
				}, 1000);
			}
		}
	};

	this.human = function(humanPos, humanID) {
		if (engine.move(humanPos)) {
			control.mark(humanID);
			if (engine.isGameOver()) {
				if (engine.getWinner()) {
					loser = engine.getWinner()[1];
					$(
							"#" + loser[0] + ", #" + loser[1] + ", #"
									+ loser[2] + ", #" + loser[3] + ", #"
									+ loser[4] + ", #" + loser[5]).css(
							"opacity", ".5");
				}
				window.setTimeout(function() {
					control.next(end);
				}, 1000);
			}
		}
	};

	this.ai = function(type) {
		var AI = type;
		AI.clean();
		synPos = AI.execute(engine.getBoard(), model.getNames()[engine
				.getTurn()], model.getNames()[engine.getTurn() ^ 1], model
				.getTypes());
		synID = "id-" + synPos.x + "-" + synPos.y;
		if (engine.move(synPos)) {
			control.mark(synID);
			if (engine.isGameOver(synPos)) {
				window.clearInterval(int);
				if (engine.getWinner()) {
					loser = engine.getWinner()[1];
					$(
							"#" + loser[0] + ", #" + loser[1] + ", #"
									+ loser[2] + ", #" + loser[3] + ", #"
									+ loser[4] + ", #" + loser[5]).css(
							"opacity", ".3");
				}
				window.setTimeout(function() {
					control.next(end);
				}, 1000);
			}
		}
	};
};

var End = function() {
	this.init = function() {
		control.display("end_page");
		if (engine.getWinner()) {
			$(".end_box").text(
					"CONGRATULATIONS " + engine.getWinner()[0].toUpperCase()
							+ ", YOU WON!");
		} else {
			$(".end_box").text("NO WINNER - TRY AGAIN!");
		}
	};
};

var engine = new TicTacToe();
var model = new Model();
var control = new Controller();
var config = new Configurator();
var game = new Game();
var end = new End();

$(document).ready(config.init());
