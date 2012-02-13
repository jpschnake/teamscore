var step = require('step');

var ResponseHelper = require('../helpers/ResponseHelper');
var DatabaseHelper = require('../helpers/MongoHelper');
var ExceptionHelper = require('../helpers/ExceptionHelper');

exports.boot = function(app, i18n){
	var exceptioHelper = new ExceptionHelper(i18n);
	var databaseHelper = new DatabaseHelper();

	var Games = require('../models/games')(app);

	app.get('/games', function(req, res){
		var response = new ResponseHelper(res);
		var answer = response.generateBody();
		var games = null;

		step(
			function list(){
				Games.find({}, this)
			},
			function afterList(error, games) {
				if (!error) {
					if (games.length !== 0) {
						answer.success = true;
						answer.data = games;

						response.send(answer);
					} else {
						answer.success = false;
						answer.exception = exceptioHelper.get(102);
						response.send(answer);
					}
				} else {
					answer.success = false;
					answer.exception = exceptioHelper.get(1) + error.message;

					response.send(answer);
				}
			}
		);
	});


	app.get('/games/mp', function(req, res){
		var response = new ResponseHelper(res);
		var answer = response.generateBody();
		var games = null;

		step(
			function list(){
				Games.findmode({mode: 'mp'}, this)
			},
			function afterList(error, games) {
				if (!error) {
					if (games.length !== 0) {
						answer.success = true;
						answer.data = games;

						response.send(answer);
					} else {
						answer.success = false;
						answer.exception = exceptioHelper.get(102);
						response.send(answer);
					}
				} else {
					answer.success = false;
					answer.exception = exceptioHelper.get(1) + error.message;

					response.send(answer);
				}
			}
		);

	});

	app.post('/games/:game', function(req, res){
		var response = new ResponseHelper(res);
		var answer = response.generateBody();
		var gameNew = {title: req.params.game, modes: {mp: true, sp: true}};
		
		step(
			function save(){
				Games.create(gameNew, this);
			},
			function afterSave(error, game) {
                if (!error) {
                    answer.success = true;
                    answer.data = game;
                } else if (databaseHelper.recordExists(error)) {
                    answer.success = false;
                    answer.exception = exceptioHelper.get(101);
                } else {
                    answer.success = false;
                    answer.exception = exceptioHelper.get(1) + error.message;
                }

                response.send(answer);
            }
        
		);
		
	});

};