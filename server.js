var angularApp = 'angular linky app';
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var path = require('path');
var express = require('express');
//var mysql = require('mysql');
//var db = require('./database/db');

var app = express();

app.locals.pagetitle = 'Angular Linky App';

//app.set('view engine', 'html');
//app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

//use middleware
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/categories', function (req, res) {
	
	console.log('categories route has been called')
	
	categories1 = {
		name: "test1",
		description: "test1"
	}
	
	categories2 = {
		name: "test1",
		description: "test1"
	}
	
	categories3 = {
		name: "test1",
		description: "test1"
	}
	
	var categorieslist = [categories1, categories2, categories3]
	console.log(categorieslist)
	res.json(categorieslist)
})

//define routes

//app.use('/', require('./routes/blogs'));
//app.use('/dashboard', require('./routes/dashboard'));
//app.use('/', require('./routes/test'));

app.listen(port, function () {
	console.log('Server for ' + angularApp + ' is now running on port ' + port)	
})