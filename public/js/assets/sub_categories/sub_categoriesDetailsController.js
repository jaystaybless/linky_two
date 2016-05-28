app.controller('sub_categoriesDetailsController', function($scope, $http, $routeParams){
    console.log("sub_categoriesDetailsController is now in action")
	
	var sub_categories_id = $routeParams.sub_categories_id
	console.log($routeParams)
	
	var refresh = function () {
		//console.log('test')
		//console.log(sub_categories_id)
		$http.get('/sub_categories/'  + sub_categories_id).success(function(response) {
			//console.log(response)
			$scope.subCategoryList = response;
			$scope.subCategory = "";
		})
	}
	refresh()
	//need to start working on this route/controller
	
	$scope.remove = function(subCategory) {
		console.log(subCategory)
		console.log(subCategory.sub_categories_id)

		alert('are you sure')
		$http.delete('/sub_categories/' + subCategory.sub_categories_id).success(function(response) {
			console.log(response)
			//$scope.subCategoryList = response;
			refresh();
		})
	}
	
	$scope.update = function(subCategory) {
		console.log('client put ')
		console.log(subCategory)
		$http.put('/sub_categories/' + subCategory.sub_categories_id, subCategory).success(function(response) {
			console.log('put')
			refresh();
		})
	}
	
	$scope.getLinks = function (subCategory) {
		console.log('get links for subfolder')
		console.log(subCategory)
		console.log(subCategory.sub_categories_id)
		
		$http.get('/sub_categories/' + subCategory.sub_categories_id + '/links').success(function (response) {
			console.log(response)
			$scope.linksList = response;
			refresh()
		})
	}
	
	$scope.addLink = function () {
		console.log(sub_categories_id)
		console.log($scope.links)

		$http.post('/sub_categories/' + sub_categories_id + '/links', $scope.links).success(function (response) {
			console.log(response)
			$scope.linksList = response;
			refresh()
		})
	}
	
	$scope.editLink = function (links) {
		console.log(links)
		console.log('clicked')
		$scope.hideInfo = true
		console.log($scope.hideInfo)

	}
	
	$scope.removeLink = function (links) {
		console.log(links)
		console.log(links.links_id)
		console.log(links.sub_categories_id)
		$http.delete('/sub_categories/' + links.sub_categories_id + '/links/' links.links_id).success(function (response) {
			console.log(response)
		})
	}
	/*
	$scope.change = function (hideInfo) {
		console.log('clicked')
		$scope.hideInfo = true
		console.log($scope.hideInfo)
	}
	*/
	
	
	
	
    $scope.message = "Welcome to the Sub Category " + sub_categories_id + " Details Page"; 
	$scope.subMessage = "Sub Category"	  
});