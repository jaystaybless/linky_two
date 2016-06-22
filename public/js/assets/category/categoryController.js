app.controller('categoryController', function($scope, $http, $routeParams){
    console.log("categoryController is in action")
	

	var categories_id = $routeParams.categories_id
	
	// CATEGORY routes
	
	var refresh = function () {
		$http.get('/categories/' + categories_id).success(function(response) {
		$scope.categoryDetails = response;
		$scope.category = "";
		});
	};
refresh()

	$scope.updateCategory = function(category) {
		console.log('client put ')
		console.log(category)
		console.log(category.categories_id)
		$http.put('/categories/' + category.categories_id, category).success(function(response) {
			console.log('put on category route')
			$scope.hideInfo = false;
			refresh();
		})
	};
		
	// CATEGORY / SUB CATEGORY routes
	
	$scope.edit = function () {
		$scope.hideInfo = true;
		console.log($scope.hideInfo)
	};
		
	// CATEGORY / LINK routes
	
	refreshLinksList = function () {
		console.log(categories_id)
		$http.get('/categories/' + categories_id + '/links').success(function (response) {
			console.log(response)
			$scope.linksList = response;
			$scope.links = "";
		})	
	}
refreshLinksList()
	
	$scope.addLink = function () {
		//console.log(categories_id)
		//console.log($scope.links)
		//console.log($scope.links.url)
		$http.post('/categories/' + categories_id + '/links', $scope.links).success(function (response) {
			console.log(response)
			$scope.linksList = response;
			$scope.hideInfo = false;
			refreshLinksList();
		});	
	};
	
	// LINKS routes
	
	$scope.updateLink = function (links) {
		console.log(links)
		console.log(links.links_id)
		$http.put('/links/' + links.links_id, links).success(function (response) {
			console.log(response);
			$scope.hideInfo = false
			refreshLinksList();
		})
	}
	
	$scope.removeLink = function (links) {
		//console.log(links)
		//console.log(links.links_id)
		$http.delete('/links/' + links.links_id).success(function (response) {
			console.log(response)
			$scope.hideInfo = false
			refreshLinksList();
		});
	};
	
		// THIS WILL DELETE CATEGORY AND ALL RELATIONSHIPS
	/*
	$scope.removeCategory = function(category) {
		console.log('client delete category ')
		console.log(category)
		console.log(category.categories_id)
		console.log(categories_id)
		
		$http.delete('/categories/' + categories_id, category).success(function(response) {
			$scope.hideInfo = false;
			refresh();
		})
	};
	*/
	
	$scope.removeCategory = function(category) {
		console.log(category)
		console.log(category.categories_id)
		console.log(category.name)

		var check = confirm('Deleting sub category ' + category.name + ' will also delete all of its belongings. Are you sure you want to continue?')
		console.log(check)
		if(check == false) {
			console.log('canceled')
			return;
		}
		console.log('going to delete')	
		$http.delete('/categories/' + category.categories_id).success(function(response) {
			console.log(response)
			//$scope.subCategoryList = response;
			var sub_categories_id = "";
			refresh();
			//refreshLinksList();
		})
	}
	

    $scope.message = "Category";  
});