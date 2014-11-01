'use strict';
angular.module('SteamPiggyBank.controllers', [])

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, $ionicPopover, $ionicGesture, $http) {
	$ionicPopover.fromTemplateUrl('templates/popover.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});

	// Called to navigate to the main app
	$scope.startApp = function() {
		$state.go('main');
	};
	$scope.next = function() {
		$ionicSlideBoxDelegate.next();
	};
	$scope.previous = function() {
		$ionicSlideBoxDelegate.previous();
	};
	$scope.slide = function(index) {
		$ionicSlideBoxDelegate.slide(index);
	};

	$scope.openPopover = function($event) {
		$http.get('http://store.steampowered.com/search/?specials=1').
			success(function(data) {
				$scope.popoverContent = data;
			});

		$scope.popover.show($event);
	};
	$scope.closePopover = function() {
    $scope.popover.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

	// Called each time the slide changes
	$scope.slideChanged = function(index) {
		$scope.slideIndex = index;
	};
})

.controller('MainCtrl', function($scope, $state) {
	console.log('MainCtrl');

	$scope.toIntro = function() {
		$state.go('intro');
	};
});