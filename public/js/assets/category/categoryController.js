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
		$http.put('/categories/' + category.categories_id).success(function(response) {
			console.log('put on category route')
			$scope.hideInfo = false;
			refresh();
		})
	};
	
	// THIS WILL DELETE CATEGORY AND ALL RELATIONSHIPS
	
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
	
	// CATEGORY / SUB CATEGORY routes
	
	var refreshSubCategoriesList = function () {
		console.log('refreshSubCategoriesList test')
		//console.log(categories_id)
		$http.get('/categories/' + categories_id + '/sub_categories').success(function(response) {
			$scope.subCategoryList = response;
			$scope.subCategory = "";
			refresh()
		});
	};
refreshSubCategoriesList()
	
	$scope.addSubCategory = function() {
		//console.log(categories_id)
		//console.log($scope.category)
		//console.log($scope.subCategory)
		$http.post('/categories/' + categories_id + '/sub_categories', $scope.subCategory).success(function(response) {
			console.log(response)
			$scope.subCategoryList = response;
			refresh()
		});
	};
		
	$scope.edit = function () {
		$scope.hideInfo = true;
		console.log($scope.hideInfo)
	};
	
	//SUB CATEGORY routes
	
	$scope.updateSubCategory = function(subCategory) {
		console.log('client put ')
		console.log(subCategory)
		console.log(subCategory.sub_categories_id)
		$http.put('/sub_categories/' + subCategory.sub_categories_id, subCategory).success(function(response) {
			console.log('put on sub category route')
			$scope.hideInfo = false;
			refresh();
		});
	};
	
	
	$scope.removeSubCategory = function(sub_categories_id) {
		console.log(sub_categories_id)
		$http.delete('/sub_categories/' + sub_categories_id).success(function(response) {
			console.log(response)
			//$scope.subCategoryList = response;
			$scope.hideInfo = false
			refreshSubCategoriesList()
		});
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

    $scope.message = "Welcome to the Category Page";  
});