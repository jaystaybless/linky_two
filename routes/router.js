var express = require('express');
var router = express.Router();
var db = require('../database/db').db;
var connection = require('../database/db').connection;

//CATEGORIES routes
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

router.get('/categories/:id', function(req, res) {
	console.log('CATEGORIES specific page recieved a GET request');
	var id = req.params.id;
	console.log(id)
	
	var selectACategory = 'SELECT * FROM categories WHERE categories_id = ?'
	
	var categories = {
		name: req.body.name,
		description: req.body.description,
		categories_id: id //req.session.user.id //this needs changing to req.session.user.id
	};

	var query = connection.query(selectACategory, categories.categories_id, function (error, result) {
	if(error) {
		console.error(error);
		return;
	}
	res.json(result)
	console.log(result);
	});
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


router.delete('/categories/:id', function(req, res) {
	console.log('CATEGORIES page recieved a DELETE request');
	var id = req.params.id;
	console.log(id)
	
	var deleteCategory = 'DELETE FROM categories WHERE categories_id = ?'
	
	var categories = {
		name: req.body.name,
		description: req.body.description,
		categories_id: id //req.session.user.id //this needs changing to req.session.user.id
	};

	var query = connection.query(deleteCategory, categories.categories_id, function (error, result) {
	if(error) {
		console.error(error);
		return;
	}
	res.json(result)
	console.log(result);
	});
});


router.put('/categories/:id', function(req, res) {
	console.log('CATEGORIES page recieved a PUT request');	
	var id = req.params.id;
	
	var categories = {
		name: req.body.name,
		description: req.body.description,
		categories_id: id //req.session.user.id //this needs changing to req.session.user.id
	};
	
	var updateCategory = 'UPDATE categories SET name = ?, description = ? WHERE categories_id = ?';
	var query = connection.query(updateCategory, [categories.name, categories.description, categories.categories_id], function (error, result) {
	if(error) {
		console.error(error);
		return;
	}
	res.json(result)
	console.log(result);
	});
});


//SUB CATEGORIES routes

router.post('/categories/:id/sub_categories/', function (req, res) {
	console.log('SUB CATEGORIES page recieved a POST request');
	
	var id = req.params.id;
	console.log(id)
	
})


router.get('*', function (req, res) {
	res.json('404')
});


module.exports = router;