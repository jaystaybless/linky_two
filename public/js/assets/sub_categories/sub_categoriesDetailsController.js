app.controller('sub_categoriesDetailsController', function($scope, $http, $routeParams){
    console.log("sub_categoriesDetailsController is now in action")
	
	var sub_categories_id = $routeParams.sub_categories_id
	console.log($routeParams)
	
	/*
	var testing = ''
	testing += response[0].categories_id
	console.log(response[0].categories_id)
	console.log(testing)
	*/
	
	var refresh = function () {
		//console.log('test')
		//console.log(sub_categories_id)
		$http.get('/sub_categories/'  + sub_categories_id).success(function(response) {
			$scope.subCategoryList = response;	
			$scope.subCategory = "";
		})
	}
	refresh()
	//need to start working on this route/controller
	
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
			refreshLinksList();
		})
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
	
	var refreshLinksList = function () {
		console.log('get links for subfolder')
		//console.log(subCategory)
		console.log(sub_categories_id)
		
		$http.get('/sub_categories/' + sub_categories_id + '/links').success(function (response) {
			console.log(response)
			$scope.linksList = response;
			$scope.links = "";
			
		})
		
	}

refreshLinksList()

//this route can be changed to post directly to the link resource 
	
	$scope.addLink = function () {
		console.log(sub_categories_id)
		console.log($scope.links)

		$http.post('/sub_categories/' + sub_categories_id + '/links', $scope.links).success(function (response) {
			console.log(response)
			$scope.linksList = response;
			refreshLinksList();
		})
	}
	
	$scope.editLink = function (links) {
		console.log(links)
		console.log('clicked')
		$scope.hideInfo = true
		console.log($scope.hideInfo)
	}
	
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
		console.log(links)
		console.log(links.links_id)
		console.log(links.sub_categories_id)
		$http.delete('/links/' + links.links_id).success(function (response) {
			console.log(response)
			$scope.hideInfo = false
			refreshLinksList();
		})
	}
	/*
	$scope.change = function (hideInfo) {
		console.log('clicked')
		$scope.hideInfo = true
		console.log($scope.hideInfo)
	}
	*/
	
	
	
	
    $scope.message = "Sub Category " + sub_categories_id; 
	$scope.subMessage = "Sub Category"	  
});