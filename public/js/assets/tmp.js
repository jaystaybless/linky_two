app.controller('categoryController', function($scope, $http, $routeParams){
    console.log("categoryController is in action")
	var categories_id = $routeParams.categories_id
	
	$http.get('/categories/' + categories_id).success(function(response) {
		console.log('specific now complete on client');
		$scope.categoryDetails = response
	})
	//delete route needs looking into (refresh function needs to be thought about)
	$scope.remove = function(categories_id) {
		console.log(categories_id)
		$http.delete('/categories/' + categories_id).success(function(response) {
			//refresh();
		})
		
	}
	
	$scope.update = function(categories) {

		console.log('client put ')
		console.log(categories)
		$http.put('/categories/' + categories_id, categories).success(function(response) {
			console.log('put')
			//refresh();
		})
	}

      $scope.message = "Welcome to the Category Page";  
});



	$scope.specific = function(categories) {
		console.log(categories.categories_id);
		$http.get('/categories/' + categories.categories_id).success(function(response) {
			console.log('specific from Categories controller');
			console.log(response)
			$scope.categories = response;
			//$scope.categories = "";
		});
	}
	
	/*			
        .when('/sub_categories', {
			templateUrl: 'js/assets/sub_categories/sub_categories.html', 
			controller: 'sub_categoryController'})
*/



	$scope.getSubCategories = function () {
		//console.log('test')
		//console.log(categories_id)
		$http.get('/sub_categories/'  + categories_id).success(function(response) {
			$scope.subCategoryList = response;
			$scope.subCategory = "";
			refresh()
		})
	}
	
	
	
	
		$scope.addLink = function () {
		console.log(sub_categories_id)
		console.log($scope.subCategory)
		console.log($scope.subCategory)
		$http.post('/sub_categories/' + sub_categories_id + '/links', $scope.subCategory).success(function (response) {
			console.log(response)
		})
	}