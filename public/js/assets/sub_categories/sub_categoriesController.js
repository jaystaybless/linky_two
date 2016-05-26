app.controller('sub_categoryController', function($scope, $http, $routeParams){
    console.log("sub_categoryController is now in action")
	
	var sub_categories_id = $routeParams.sub_categories_id
	//console.log($routeParams)
	
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
	
	$scope.addLink = function () {
		console.log(sub_categories_id)
		console.log($scope.links)

		$http.post('/sub_categories/' + sub_categories_id + '/links', $scope.links).success(function (response) {
			console.log(response)
			linksList = response;
			refresh()
		})
	}
	
	
	
	
      $scope.message = "Welcome to the Sub Categories Page";  
});