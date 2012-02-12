var step = require('step');

var DatabaseHelper = require('../helpers/MongoHelper');

module.exports = function(app){

	var name = 'games';

	var dbs = app.set('config').database.connection;

	var databaseHelper = new DatabaseHelper();

	return {

	find :  function(criteria, callback) {
		step(
                        function search() {
                                dbs.collection(name).find(criteria).toArray(this);
                        },
                        function afterSearch(error, articles) {
                                callback(error, articles);
                        }
                );
        },

        findmode : function(criteria, callback){
                step(
                        function search() {
                                dbs.collection(name).find().toArray(this);  
                        },
                        function afterSearchFor(error, games){
                                callback(error, games);
                        }
                );      
        },

        create : function(game, callback){
        	step(
        		function ensureIndex() {
        			dbs.collection(name).ensureIndex({title: 1}, {unique: true}, this);	
        		},
        		function preprocessing(){
        			game.clearStr = databaseHelper.createClearString(game.title);
        			game.created = databaseHelper.createTimestamp();
                                game.modes = game.modes;

                                this(game);
        		},
        		function persist(game){
        			dbs.collection(name).save(game, {safe: true}, this);
        		},
        		function afterPersist(error, game){
        			callback(error, game);
        		}
        	);
        }
		
	};
	
};