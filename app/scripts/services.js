'use strict';
angular.module('SteamPiggyBank.services', [])

.service('requestService', function($http, $q) {

	this.getAllApps = function() {
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
			defer = $q.defer();

		// first call to access information like maxPage
		$http.get('http://store.steampowered.com/search/?specials=1')
			.success(function(data) {
				$data = $(data.replace(/<img\b[^>]*>/ig, ''));
				parent = $data.find('#search_result_container');
				maxPage = findLastSalePage($data);
				tmp_list = findSaleItems(parent);
				allUserTags = findAllUserTags($data);

				allItemsOnSale = allItemsOnSale.concat(parseDOMElementList(tmp_list));
				currentPage++;
				tmp_list = [];

				for (; currentPage <= maxPage; currentPage++) {
					XHRs.push(
						$http.get('http://store.steampowered.com/search/?specials=1&page=' + currentPage)
						.success(function(data) {
							$data = $(data.replace(/<img\b[^>]*>/ig, ''));
							parent = $data.find('#search_result_container');
							tmp_list = findSaleItems(parent);
							allItemsOnSale = allItemsOnSale.concat(parseDOMElementList(tmp_list));
							console.log(allItemsOnSale);
							defer.notify(allItemsOnSale);
							tmp_list = [];
						})
					);
				}
			});

		console.log(currentPage);
		// defer.resolve(allItemsOnSale);
		return defer.promise;
	};

	var findLastSalePage = function(parent) {
		return parent.find('.pagebtn').prev().html();
	};

	var findSaleItems = function(parent) {
		return parent.find('.search_rule').next().children('a');
	};

	var findAllUserTags = function(parent) {
		var tag_array = [],
			tag_elements = parent.find('#TagFilter_Container .tab_filter_control');

		$.each(tag_elements, function(key, el) {
			tag_array.push($(el).data('loc'));
		});

		return tag_array;
	};

	var parseDOMElementList = function(list) {
		var appitems = [],
			appitem = {};
		$.each(list, function(key, el) {
			var $el = $(el),
				urcText = getUserReviewScoreText($el);


			appitem.appid = getAppId($el);
			appitem.packageid = getPackageId($el);
			appitem.name = getName($el);
			appitem.released = getReleaseDate($el);
			appitem.oldprice = getOldPrice($el);
			appitem.newprice = getNewPrice($el);
			appitem.discount = getDiscount($el);
			appitem.urcText = urcText;
			appitem.urcScore = getUrcScore(urcText);
			appitem.urcClass = getUserReviewScoreClass($el);


			appitems.push(appitem);
			appitem = {};
		});

		return appitems;



		function getAppId(element) {
			return element.data('dsAppid').toString();
		}

		function getPackageId(element) {
			var pid = element.data('dsPackageid');
			return pid ? pid.toString() : undefined;
		}

		function getName(element) {
			return element.find('.title').html();
		}

		function getReleaseDate(element) {
			return element.find('.search_released').html();
		}

		function getOldPrice(element) {
			return element.find('strike').html();
		}

		function getNewPrice(element) {
			return element.find('.search_price.discounted').contents()
				.filter(function() {
					return this.nodeType === Node.TEXT_NODE;
				}).last().text();
		}

		function getDiscount(element) {
			return element.find('.search_discount span').text();
		}

		function getUserReviewScoreClass(element) {
			var el = element.find('.search_reviewscore span');

			if (el.hasClass('positive')) return 'positive';
			else if (el.hasClass('positive')) return 'mixed';
			else if (el.hasClass('negative')) return 'negative';
		}

		function getUserReviewScoreText(element) {
			return element.find('.search_reviewscore span').data('storeTooltip');
		}

		function getUrcScore(str) {
			if (str === undefined) return;
			var urcPercent = findUrcPercent(str) / 100,
				urcCount = findUrcCount(str.replace(/\d+%/g));

			return (urcPercent - (1 - urcPercent)) * urcCount;

			function findUrcPercent(str) {
				var pattern = /\d+%/g;
				return parseInt(pattern.exec(str)[0].replace('%', ''));
			}

			function findUrcCount(str) {
				var pattern = /\d+(,)?\d+/g,
					result = pattern.exec(str);
				if (result !== null) return parseInt(result[0].replace(',', ''));
			}
		}

		function parseUserTags(parent) {
			var arr = [];

			$.each(parent.find('.app_tag'), function(key, el) {
				arr.push($(el).html());
			});
			console.log('usertags: ', arr);

			return arr;
		}
	};

});