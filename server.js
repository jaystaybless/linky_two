var angularApp = 'angular linky app';
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var path = require('path');
var express = require('express');
var mysql = require('mysql');
var db = require('./database/db');

var app = express();

app.locals.pagetitle = 'Angular Linky App';

//app.set('view engine', 'html');
//app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

//use middleware
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//define routes

app.use('/', require('./routes/router'));
//app.use('/dashboard', require('./routes/dashboard'));
//app.use('/', require('./routes/test'));

app.listen(port, function () {
	console.log('Server for ' + angularApp + ' is now running on port ' + port)	
})