var express = require('express');
var router = express.Router();
var db = require('../database/db').db;
var connection = require('../database/db').connection;

router.get('/categories', function (req, res) {
	console.log('CATEGORIES page recieved a GET request');

	var selectAllCategories = 'SELECT * FROM categories';
	
	 connection.query(selectAllCategories, function(error, result) {
		if(error) {
			console.error(error);
			return;
		}
		res.json(result)
		console.log(result)
	})
	
});

router.post('/categories', function (req, res) {

	console.log('CATEGORIES page recieved a POST request');

	var createCategories = 'INSERT INTO categories SET ?';
	var selectAllCategories = 'SELECT * FROM categories';
	
	var categories = {
		name: req.body.name,
		description: req.body.description,
		user_id: "1"//req.session.user.id //this needs changing to req.session.user.id
	};
	//var createBlog = 'INSERT INTO blogs VALUES ("", ?, ?)';
	
	 connection.query(createCategories, categories, function(error, result) {
		if(error) {
			console.error(error);
			return;
		}
		connection.query(selectAllCategories, function(error, result) {
			res.json(result)
		})

	 })
})


router.get('*', function (req, res) {
	res.json('404')
});


module.exports = router;