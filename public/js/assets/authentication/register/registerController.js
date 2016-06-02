app.controller('registerController', function($scope, $http, $routeParams){
    console.log("registerController is in action")
	
	$scope.signUp = function () {
		console.log($scope.user)
		$http.post('/register', $scope.user).success(function (response) {
			console.log(response)
			$scope.user = "";
		})
	}
	
      $scope.message = "Register";  
});
