
/**
 * Module dependencies.
 */

var express = require('express'),
	mongo = require('mongoskin'),
	mongostore = require('connect-mongodb')
	routes = require('./routes')

var app = module.exports = express.createServer();

// Configuration
var configuartion = {
	name: 'TEAMSCORE - The backend',
	version: '0.0.1',
	server: {
		port: 8080
	},

	database: {
		url: 'localhost/teamscore?auto_reconnect',
		connection: null
	}
};

app.configure(function(){
	console.log('\n\nBooting...........');

	console.log('> creating Database connection');

	configuartion.database.connection = mongo.db(configuartion.database.url);

	console.log('> Database connection established');

	app.set('config', configuartion);

	app.set('views', __dirname + '/views');
  	app.set('view engine', 'jade');

  	app.use(express.bodyParser());
  	app.use(express.methodOverride());
  	app.use(express.cookieParser());
  	app.use(express.session({
  		secret: 'foo',
  		store: mongostore({
  			url: 'mongodb://' + app.set('config').database.url
  		})
	}));
  	app.use(app.router);
	app.use(express.static(__dirname + '/public'));

	console.log('Boot finished............')
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.configure('development', function() {
    app.use(express.logger());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
    app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

//
// -- i18n --
//
var i18n = require('./app/i18n/de.js').TextResources();

//
// -- Middleware --
//
//var middleware = require('./app/middleware/middleware').bootstrap(app, i18n);

//
// -- Controllers --
//
require('./app/controllers').bootstrap(app, i18n);

/**
 * The 'home' route.
 *
 */
//app.get('/', function(req, res) {
//    res.render('site/index', {
//        title: app.set('config').name,
//        description: 'API-Dokumentation: ',
//        doc: 'http://donut.idira.de',
//        adminDescription: 'Administrationsbereich: ',
//        adminUrl: '/admin',
//        version: app.set('config').version
//    });
//});

//
// Delivers the admin frontend.
//
//app.get('/admin', function(req, res) {
//	res.render('admin/index', {
//		title: app.set('config').name
//	});
//});

if (!module.parent) {
  app.listen(app.set('config').server.port);
  console.log("\n\n'" + app.set('config').name + "' listening on port %d", app.address().port);
}