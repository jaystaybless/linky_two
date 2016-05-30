app.controller('sub_categoryController', function($scope, $http, $routeParams){
    console.log("sub_categoryController is now in action")
	
	console.log($routeParams)	
	//dont add nothing on this page
	
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
	
	$scope.addSubCategory = function () {
		//console.log(sub_categories_id)
		console.log($scope.subCategory)

	}
	
	
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
	/*
	$scope.removeSubCategory = function(subCategory) {
		console.log(subCategory)
		console.log(subCategory.sub_categories_id)
		$http.delete('/sub_categories/' + subCategory.sub_categories_id).success(function(response) {
			console.log(response)
			//$scope.subCategoryList = response;
			refresh();
		})
	
	}
	*/
	
	$scope.remove = function(subCategory) {
		console.log(subCategory)
		console.log(subCategory.sub_categories_id)
		console.log(subCategory.name)
		console.log(subCategory.categories_id)

		var check = confirm('Deleting sub category ' + subCategory.name + ' will also delete all of its belongings. Are you sure you want to continue?')
		console.log(check)
		if(check == false) {
			console.log('canceled')
			return;
		}
		console.log('going to delete')	
		$http.delete('/sub_categories/' + subCategory.sub_categories_id).success(function(response) {
			console.log(response)
			//$scope.subCategoryList = response;
			var sub_categories_id = "";
			refresh();
			//refreshLinksList();
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
			$scope.hideInfo = true;
			refresh()
		})
	}
	
	$scope.updateLink = function(links) {
		console.log('client put ')
		console.log(links)
		console.log(links.links_id)
		
		$http.put('/links/' + links.links_id, links).success(function(response) {
			console.log('put')
			$scope.hideInfo = false;
			refresh();
		})
	}
	
	/*
	
	$scope.removeLink = function(links) {
		console.log('client put ')
		console.log(links)
		console.log(links.links_id)
		
		$http.delete('/links/' + links.links_id).success(function(response) {
			console.log('put')
			$scope.hideInfo = false;
			refresh();
			refreshLinksList()
		})
	}
	*/
	
      $scope.message = "Welcome to the Sub Categories Page";  
});