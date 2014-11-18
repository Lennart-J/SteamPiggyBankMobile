'use strict';
angular.module('SteamPiggyBank.controllers', ['ngAnimate'])

.controller('IntroCtrl', function($scope, requestService, $state, $http, $q, $ionicSideMenuDelegate, $ionicBackdrop, $ionicSlideBoxDelegate, $ionicPopover, $ionicGesture, $ionicNavBarDelegate) {
	$ionicPopover.fromTemplateUrl('templates/popover.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});
	var mainSlider = angular.element(document.querySelector('.slider-slides')),
		swipeGesture = null;

	//DEBUG
	$scope.dailyDail = {
		appid: "313740",
		discount: "-66%",
		finalprice: "3,39€",
		originalprice: "9,99€",
		packageid: undefined,
		timeremaining: ""
	};
	$scope.featuredDeals = [{
		appid: null,
		discount: 85,
		finalprice: 599,
		imageUrl: "http://cdn.akamai.steamstatic.com/steam/subs/19282/capsule_616x353.jpg?t=1397250555",
		name: "Tropico 4 Collector's Bundle",
		originalprice: 3999,
		packageid: "19282"
	}, {
		appid: null,
		discount: 85,
		finalprice: 599,
		imageUrl: "http://cdn.akamai.steamstatic.com/steam/apps/245170/capsule_616x353.jpg?t=1412184944",
		name: "Tropico 4 Collector's Bundle",
		originalprice: 3999,
		packageid: "19282"
	}];
	$scope.appItems = [{
		appid: "57690",
		discount: "-85%",
		finalprice: "5,99€",
		imageUrl: "http://cdn.akamai.steamstatic.com/steam/apps/57690/capsule_184x69.jpg",
		name: "Tropico 4: Steam Special Edition",
		originalprice: "39,99€ ",
		packageid: undefined,
		released: "1 Sep, 2011",
		urcClass: "positive",
		urcScore: 3623.1800000000003,
		urcText: "Very Positive<br>93% of the 4,213 user reviews for this game are positive."
	}, {
		appid: "57690",
		discount: "-100%",
		finalprice: "55,99€",
		imageUrl: "http://cdn.akamai.steamstatic.com/steam/apps/57690/capsule_184x69.jpg",
		name: "Tropico 4: Steam Special Edition",
		originalprice: "39,99€ ",
		packageid: undefined,
		released: "1 Sep, 2011",
		urcClass: "positive",
		urcScore: 3623.1800000000003,
		urcText: "Very Positive<br>93% of the 4,213 user reviews for this game are positive."
	}, {
		appid: "57690",
		discount: "-10%",
		finalprice: "55,99€",
		imageUrl: "http://cdn.akamai.steamstatic.com/steam/apps/57690/capsule_184x69.jpg",
		name: "Tropico 4: Steam Special Edition",
		originalprice: "39,99€ ",
		packageid: undefined,
		released: "1 Sep, 2011",
		urcClass: "positive",
		urcScore: 3623.1800000000003,
		urcText: "Very Positive<br>93% of the 4,213 user reviews for this game are positive."
	}, {
		appid: "57690",
		discount: "-50%",
		finalprice: "55,99€",
		imageUrl: "http://cdn.akamai.steamstatic.com/steam/apps/57690/capsule_184x69.jpg",
		name: "Tropico 4: Steam Special Edition",
		originalprice: "39,99€ ",
		packageid: undefined,
		released: "1 Sep, 2011",
		urcClass: "positive",
		urcScore: 3623.1800000000003,
		urcText: "Very Positive<br>93% of the 4,213 user reviews for this game are positive."
	}];

	var promiseDailyDeal = requestService.getFrontPageDeals();
	promiseDailyDeal.then(function(data) {
		$scope.dailyDeal = data;
		console.log("DailyDeal: ", data);
	});

	var promiseFeaturedDeals = requestService.getFeaturedDeals();
	promiseFeaturedDeals.then(function(data) {
		$scope.featuredDeals = data;

		// $ionicSlideBoxDelegate.$getByHandle('gallery-slider').update();
		console.log("FeaturedDeals: ", data);
	});

	var promiseAllApps = requestService.getAllApps();
	promiseAllApps.then(function(data) {
		console.log(data);
	}, function(reason) {
		console.log(reason);
	}, function(update) {
		console.log(update);
		$scope.appItems = update;
	});


	// Called to navigate to the main app
	$scope.startApp = function() {
		$state.go('main');
	};
	$scope.next = function() {
		$ionicSlideBoxDelegate.select($ionicSlideBoxDelegate.next());
	};
	$scope.previous = function() {
		$ionicSlideBoxDelegate.select($ionicSlideBoxDelegate.previous());
	};
	$scope.slide = function(index) {
		$ionicSlideBoxDelegate.select(index);
	};

	$scope.openPopover = function($event) {
		var promise = requestService.getAllApps();
		promise.then(function(data) {
			console.log(data);
		}, function(reason) {
			console.log(reason);
		}, function(update) {
			console.log(update);
			$scope.popoverContent = update;
			console.log($scope.popoverContent.length);
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

	var showSideMenuOnSwipe = function() {
		$scope.toggleLeft();
	};

	// Called each time the slide changes
	$scope.slideChanged = function(index) {
		$scope.slideIndex = index;
		if (index === 0) {
			setNavTitle('Special Deals');

		} else if (index === 1) {
			setNavTitle('All Current Deals');

		}
	};

	var setNavTitle = function(title) {
		$ionicNavBarDelegate.setTitle(title);
	};

	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.$watch($ionicSideMenuDelegate.isOpenLeft, function(bool) {
		if (bool) {
			$ionicSlideBoxDelegate.$getByHandle('main-slider').enableSlide(false);
			$ionicSlideBoxDelegate.$getByHandle('gallery-slider').enableSlide(false);
		} else {
			$ionicSlideBoxDelegate.$getByHandle('main-slider').enableSlide(true);
			$ionicSlideBoxDelegate.$getByHandle('gallery-slider').enableSlide(true);
		}
	});

	$scope.$watch($ionicSlideBoxDelegate.selected, function(index) {
		if (index === 0) {
			swipeGesture = $ionicGesture.on('swiperight', showSideMenuOnSwipe, mainSlider);
		} else if (swipeGesture !== null) {
			$ionicGesture.off(swipeGesture, 'swiperight', showSideMenuOnSwipe);
		}
	});
})

.controller('MainCtrl', function($scope, $state) {
	console.log('MainCtrl');

	$scope.toIntro = function() {
		$state.go('intro');
	};
})

.controller('GalleryCtrl', function($scope, $ionicSlideBoxDelegate) {
	$scope.showNext = function() {
		$ionicSlideBoxDelegate.select( $ionicSlideBoxDelegate.next() );
	};
	$scope.showPrev = function() {
		$ionicSlideBoxDelegate.select( $ionicSlideBoxDelegate.previous() );
	};
	$scope.slide = function(index) {
		$ionicSlideBoxDelegate.select(index);
	};
	$scope.slideChanged = function(index) {
		$scope.slideIndex = index;
	};
	$scope.onTouch = function() {
		$ionicSlideBoxDelegate.$getByHandle('main-slider').enableSlide(false);
	};
	$scope.onRelease = function() {
		$ionicSlideBoxDelegate.$getByHandle('main-slider').enableSlide(true);
	};
	$scope.data = [{
		'id': 286140,
		'name': 'Test_0'
	}, {
		'id': 286140,
		'name': 'Test_1'
	}, {
		'id': 286140,
		'name': 'Test_2'
	}];

	$scope.getDealName = function() {
		return "Featured Deals";
		/*if (weekday.toString() === 'Sunday' || 'Saturday' || 'Friday') {
			return 'Weekend Deals';
		} else {
			return 'Weeklong Deals';
		}*/
	};
})

.controller('PigCtrl', function($scope) {
	$scope.pigs = [{
		'src': '../images/loadingPigStay.png'
	}, {
		'src': '../images/loadingPigMid.png'
	}, {
		'src': '../images/loadingPigJump.png'
	}, {
		'src': '../images/loadingPigMid.png'
	}];



});