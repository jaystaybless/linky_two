app.controller('linksController', function($scope, $http, $routeParams){
    console.log("linksController is in action")
	
	var links_id = $routeParams.links_id;
	console.log(links_id);
	
	var refresh = function () {
		console.log(links_id);
		$http.get('/links').success(function (response) {
			console.log(response)
			$scope.linksList = response;	
			//$scope.linksList = "";
			//$scope.hideInfo = false;
			console.log($scope.hideInfo)
		});	
	};
	
refresh();
	
	$scope.edit = function () {
		$scope.hideInfo = true;
		console.log($scope.hideInfo)
	};
	
	$scope.addLink = function () {
		//console.log(categories_id)
		//console.log($scope.links)
		//console.log($scope.links.url)
		$http.post('/links', $scope.links).success(function (response) {
			console.log(response)
			$scope.linksList = response;
			$scope.hideInfo = false;
			refresh();
		});	
	};
	
	
	
	$scope.updateLink = function (links) {
		console.log(links)
		console.log(links.links_id)
		
		$http.put('/links/' + links.links_id, links).success(function (response) {
			console.log(response);
			$scope.hideInfo = false
			refresh();
			//refreshLinksList();
		});
	};
	
	$scope.removeLink = function (links) {
		console.log(links)
		console.log(links.links_id)
		console.log(links.categories_id)
		$http.delete('/links/' + links.links_id).success(function (response) {
			console.log(response)
			$scope.hideInfo = false
			refresh();
		});
	};
	
	
	
	

    $scope.message = "Links";  
});
