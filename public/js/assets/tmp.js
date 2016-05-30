router.delete('/categories/:id', function(req, res) {
	console.log('CATEGORIES page recieved a DELETE request');
	var id = req.params.id;
	console.log(id);
	var categories_id = id;
	console.log(categories_id);
	
	var deleteSubCategoryLinks = 'DELETE FROM links WHERE categories_id = ?'
	var deleteSubCategory = 'DELETE FROM sub_categories WHERE categories_id = ?'
	var deleteCategory = 'DELETE FROM categories WHERE categories_id = ?'

	var query = connection.query(deleteSubCategoryLinks, categories_id, function (error, result) {
		if(error) {
			console.error(error);
			return;
		}
		connection.query(deleteSubCategory, categories_id, function(error, result) {
			if(error) {
				console.error(error);
				return;
			}		
			connection.query(deleteCategory, categories_id, function(error, result) {
				if(error) {
					console.error(error);
					return;
				}	
				res.json(result)
				console.log(result)
			})
		})
	})	
});