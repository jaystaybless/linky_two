// THE CATEGORIES_ID / USER_ID WILL BE OBTAINED VIA COOKIES.

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

// SUB CATEGORIES for CATEGORY route (still CATEGORIES route)

router.get('/categories/:categories_id/sub_categories/', function (req, res) {
	console.log('SUB CATEGORIES page recieved a GET request');
	var categories_id = req.params.categories_id;
	//console.log(categories_id)

	var selectAllSubCategoriesForCategory = 'SELECT * FROM sub_categories WHERE categories_id = ?';

	connection.query(selectAllSubCategoriesForCategory, categories_id, function(error, result) {
		res.json(result)
		console.log(result)
	})
})

router.post('/categories/:id/sub_categories/', function (req, res) {
	console.log('SUB CATEGORIES page recieved a POST request');
	var id = req.params.id;
	console.log(id)
	
	var createSubCategories = 'INSERT INTO sub_categories SET ?';
	var selectAllSubCategoriesForCategory = 'SELECT * FROM sub_categories WHERE categories_id = ?';
	
	var subCategory = {
		name: req.body.name,
		description: req.body.description,
		user_id: "1",//req.session.user.id //this needs changing to req.session.user.id
		categories_id: id
	};
	console.log(subCategory)
		
	connection.query(createSubCategories, subCategory, function(error, result) {
		if(error) {
			console.error(error);
			return;
		}
		connection.query(selectAllSubCategoriesForCategory, subCategory.categories_id, function(error, result) {
			res.json(result)
			console.log(result)
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
/*
router.get('/sub_categories/:categories_id', function(req, res) {
	console.log('SUB CATEGORIES page recieved a GET request with categories_id');
	var categories_id = req.params.categories_id;	
	console.log(categories_id)
	
	var selectAllSubCategoriesForCategory = 'SELECT * FROM sub_categories WHERE categories_id = ?';
	
	connection.query(selectAllSubCategoriesForCategory, categories_id, function(error, result) {
			res.json(result)
			console.log(result)
	})	
})
*/

router.get('/sub_categories/:id', function(req, res) {
	console.log('SUB CATEGORIES page recieved a GET request with sub_categories_id');
	var id = req.params.id;	
	var sub_categories_id = id;
	console.log(sub_categories_id)
	
	var selectSubCategory = 'SELECT * FROM sub_categories WHERE sub_categories_id = ?';
	
	connection.query(selectSubCategory, sub_categories_id, function(error, result) {
			res.json(result)
			console.log(result)
	})	
})

router.get('/sub_categories/:id/links', function (req, res) {
	console.log('SUB CATEGORIES / LINKS page recieved a GET request');
	var id = req.params.id;
	var sub_categories_id = id;
	console.log(id)
	console.log(sub_categories_id)
	
	var selectAllLinksForSubCategory = 'SELECT * FROM links WHERE sub_categories_id = ?';
			
	connection.query(selectAllLinksForSubCategory, sub_categories_id, function(error, result) {
		res.json(result)
		console.log(result)
	})
})

router.post('/sub_categories/:id/links', function (req, res) {
	console.log('SUB CATEGORIES / LINKS page recieved a POST request');
	var id = req.params.id;
	var sub_categories_id = id;
	console.log(id)
	console.log(sub_categories_id)
	
	var createSubCategoriesLinks = 'INSERT INTO links SET ?';
	var selectAllLinksForSubCategory = 'SELECT * FROM links WHERE sub_categories_id = ?';
	
	var links = {
		name: req.body.name,
		description: req.body.description,
		url: req.body.url,
		user_id: "1",//req.session.user.id //this needs changing to req.session.user.id
		categories_id: "1",
		sub_categories_id: id
	};
	console.log(links)
		
	connection.query(createSubCategoriesLinks, links, function(error, result) {
		if(error) {
			console.error(error);
			return;
		}
		connection.query(selectAllLinksForSubCategory, links.sub_categories_id, function(error, result) {
			res.json(result)
			console.log(result)
		})
	})
})



router.get('*', function (req, res) {
	res.json('404')
});


module.exports = router;