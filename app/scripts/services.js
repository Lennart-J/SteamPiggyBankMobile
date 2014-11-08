'use strict';
angular.module('SteamPiggyBank.services', [])
	
	.service('requestService', function($http, $q){
	
		this.getAllApps= function(){
			var XHRs = [],
		      response = '',
		      parent = {},
		      currentPage = 1,
		      maxPage = 0,
		      tmp_list = [],
		      allItemsOnSale = [],
		      $data,
		      status = 0,
		      allUserTags = [],
		      testQ = $q.defer();
		    $http.get('http://store.steampowered.com/search/?specials=1').
				success(function() {
					maxPage = 2;
					console.log('hi');	
					testQ.resolve(maxPage);
				});

			return testQ.promise;	
		};

	});
