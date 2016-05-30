app.controller('sub_categoryController', function($scope, $http, $routeParams){
    console.log("sub_categoryController is now in action")
	
	console.log($routeParams)	
	
	var refresh = function () {
		//console.log('test')
		//console.log(sub_categories_id)
		$http.get('/sub_categories').success(function(response) {
			console.log(response)
			$scope.subCategoryList = response;
			$scope.subCategory = "";
		})
	}
	refresh()
	//need to start working on this route/controller
	
	$scope.edit = function () {
		$scope.hideInfo = true;
		console.log($scope.hideInfo)
	}
	
	$scope.update = function(subCategory) {
		console.log('client put ')
		console.log(subCategory)
		$http.put('/sub_categories/' + subCategory.sub_categories_id, subCategory).success(function(response) {
			console.log('put')
			$scope.hideInfo = false;
			refresh();
		})
	}
	
	$scope.removeSubCategory = function(subCategory) {
		console.log(subCategory)
		console.log(subCategory.sub_categories_id)
		$http.delete('/sub_categories/' + subCategory.sub_categories_id).success(function(response) {
			console.log(response)
			//$scope.subCategoryList = response;
			refresh();
		})
	
	}
	
	/*
	$scope.addLink = function (subCategory) {
		var element = angular.element('.sub_categories_id').find('subCategory.sub_categories_id');
		console.log(element)
		console.log($scope.links)
		refresh()
	}
	*/
	
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
	
	
	
	
      $scope.message = "Welcome to the Sub Categories Page";  
});