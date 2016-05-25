var mysql = require('mysql');

var connection = mysql.createConnection({
	database: 'linky_test',
	host: 'localhost',
	user: 'root',
	password: ''
});

var db = connection.connect(function(error, result) {
	if(error) {
	console.error(error);
	return;
	}
	console.log(result);
	console.log('MySQL is now running')
});

module.exports.db = db;
module.exports.connection = connection;