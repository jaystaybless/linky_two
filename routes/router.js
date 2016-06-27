// THE CATEGORIES_ID / USER_ID WILL BE OBTAINED VIA COOKIES.

var express = require('express');
var router = express.Router();
var db = require('../database/db').db;
var connection = require('../database/db').connection;


// REGISTER route

router.post('/register', function (req, res) {
	console.log('SUB CATEGORIES / LINKS page recieved a POST request');
	
	var selectUniqueUser = 'SELECT * FROM users WHERE email = ?';
	var createUser = 'INSERT INTO users SET ?';
	
	var user = {
		email: req.body.email,
		fullName: req.body.fullName,
		username: req.body.username,
		password: req.body.password
	};
	console.log(user)

	var query = connection.query(selectUniqueUser, user.email, function (error, result) {		
		var userCount = 0
		for(i in result) {
			userCount++
			console.log('userCount total = ' + userCount + ' or more')
			if(userCount = 1) {
				console.log('user already exists');
				return res.json('user already exists');
			}
		}
		connection.query(createUser, user, function (error, result) {
			console.log('user created')
			console.log(result)
			res.json(result)

		});
	});
});




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
		//user_id: "1"//req.session.user.id //this needs changing to req.session.user.id
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


/*
router.delete('/categories/:id', function(req, res) {
	console.log('CATEGORIES page recieved a DELETE request');
	var id = req.params.id;
	console.log(id);
	var categories_id = id;
	console.log(categories_id);
	
	var deleteSubCategoryLinks = 'DELETE FROM links WHERE categories_id = ?'
	var deleteSubCategory = 'DELETE FROM sub_categories WHERE categories_id = ?'
	var deleteCategory = 'DELETE FROM categories WHERE categories_id = ?'
	
	var query = connection.query(deleteCategory, categories_id, function(error, result) {
		if(error) {
			var errorMessage = 'cant delete because of relationship';
			console.error(error);
			res.json(errorMessage)
			return;
		}	
		res.json(result)
		console.log(result)
	})	
});
*/

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

router.delete('/categories/:id', function(req, res) {
	console.log('CATEGORY page recieved a DELETE request for CATEGORY and RELATIONSHIPS');
	var id = req.params.id;	
	var categories_id = id;
	console.log(categories_id)
	console.log(req.params.categories_id)

	
	var deleteCategoryLinks = 'DELETE FROM links WHERE categories_id = ?'
	var deleteCategory = 'DELETE FROM categories WHERE categories_id = ?'
		
	var  query = connection.query(deleteCategoryLinks, categories_id, function(error, result) {
		if(error) {
			console.error(error);
			return;
		}	
		connection.query(deleteCategory, categories_id, function (error, result) {
			if(error) {
				console.error(error);
				return;
			}
			res.json(result)
			console.log(result);
		});
	});
});

//LINKS route

router.get('/categories/:id/links', function(req, res) {
	console.log('CATEGORIES / LINKS page recieved a GET request');
	var id = req.params.id;
	console.log(id);
	var categories_id = id;
	console.log(categories_id);
	
	var selectAllLinksForCategory = 'SELECT * FROM links WHERE categories_id = ?';
	
	connection.query(selectAllLinksForCategory, categories_id, function(error, result) {
			res.json(result)
			console.log(result)
	});
});

router.post('/categories/:id/links', function(req, res) {
	console.log('CATEGORIES / LINKS page recieved a POST request');
	var id = req.params.id;
	//console.log(id);
	var categories_id = id;
	//console.log(categories_id);
	
	var createCategoryLinks = 'INSERT INTO links SET ?';
	var selectAllLinksForCategory = 'SELECT * FROM links WHERE categories_id = ?';
	
	var links = {
		name: req.body.name,
		description: req.body.description,
		url: req.body.url,
		categories_id: categories_id //req.session.user.id //this needs changing to req.session.user.id
	};

	connection.query(createCategoryLinks, links, function(error, result) {
		if(error) {
			console.error(error);
			return;
		}
		connection.query(selectAllLinksForCategory, links.categories_id, function(error, result) {
			res.json(result)
			console.log(result)
		});
	});
});

router.get('/links', function(req, res) {
	console.log('LINKS page recieved a GET request');
	
	//var user_id = '1'; 
	
	var selectAllLinks = 'SELECT * FROM links';
	
	connection.query(selectAllLinks, function(error, result) {
		if(error) {
			console.error(error);
			return;
		}
		res.json(result)
		console.log(result)
	})
});


router.get('/links/:id', function(req, res) {
	console.log('LINKS page recieved a specific GET request');
	var id = req.params.id;
	console.log(id)
	var links_id = id
	console.log(links_id)
	
	var selectALinks = 'SELECT * FROM links WHERE links_id = ?';
	
	connection.query(selectALinks, links_id, function(error, result) {
		if(error) {
			console.error(error);
			return;
		}
		res.json(result)
		console.log(result)
	})

	
});

router.post('/links', function(req, res) {
	console.log('LINKS page recieved a POST request');

	var createLink = 'INSERT INTO links SET ?';
	var selectAllLinks = 'SELECT * FROM links';
	
	var links = {
		name: req.body.name,
		description: req.body.description,
		url: req.body.url
	};

	connection.query(createLink, links, function(error, result) {
		if(error) {
			console.error(error);
			return;
		}
		connection.query(selectAllLinks, function(error, result) {
			res.json(result)
			console.log(result)
		});
	})
});


router.put('/links/:id', function(req, res) {
	console.log('LINKS page recieved a PUT request');
	var id = req.params.id;
	console.log(id)
	var links_id = id
	console.log(links_id)
	
	var links = {
		name: req.body.name,
		description: req.body.description,
		url: req.body.url,
		categories_id: req.body.categories_id, //req.session.user.id //this needs changing to req.session.user.id
		links_id: req.body.links_id
	};
	
	var updateLink = 'UPDATE links SET name = ?, description = ?, url = ?, categories_id = ? WHERE links_id = ?';
	console.log(links)
	var query = connection.query(updateLink, [links.name, links.description, links.url, links.categories_id, links.links_id], function (error, result) {
		if(error) {
		console.error(error);
		return;
		}
		res.json(result)
		console.log(result);
	});	

});
	

router.delete('/links/:id', function(req, res) {
	console.log('LINKS page recieved a DELETE request');
	var id = req.params.id;
	console.log(id)
	var links_id = id
	console.log(links_id)
	var deleteLink = 'DELETE FROM links WHERE links_id = ?'
		
	var query = connection.query(deleteLink, links_id, function (error, result) {
		if(error) {
			console.error(error);
			return;
		}
		res.json(result)
		console.log(result);
	});
});


router.get('*', function (req, res) {
	res.json('404')
});


module.exports = router;