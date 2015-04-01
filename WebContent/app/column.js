(function() {
	'use strict';

	angular.module('Console', [ 'ui.bootstrap' ]);

	angular.module('Console').factory('columnData', function() {
		return [ {
			'checked' : false,
			'columnName' : "Column1",
			'columnType' : "Number",
			'editable' : true
		}, {
			'checked' : false,
			'columnName' : "Column2",
			'columnType' : "String",
			'editable' : true
		}, {
			'checked' : false,
			'columnName' : "Column3",
			'columnType' : "Date",
			'editable' : false
		}, {
			'checked' : false,
			'columnName' : "Column4",
			'columnType' : "Boolean",
			'editable' : true
		} ];

	});

	angular.module('Console').filter('trueOrFalse', function() {
		return function(input) {
			if (input === true) {
				return 'Yes';
			} else {
				return 'No';
			}
		}
	});

	angular.module('Console').filter('emptyOrNot', function() {
		return function(input) {
			if (input) {
				return 'editing';
			} else {
				return 'editing = true';
			}
		};
	});

	angular.module('Console').controller(
			'ColumnMstrCtrl',
			function($scope, $modal, $log, columnData) {
				$scope.columnData = columnData;

				$scope.open = function(size) {

					var modalInstance = $modal.open({
						templateUrl : 'addColumn.html',
						controller : 'AddColumnCtrl',
						size : size,
						resolve : {
							columnData : function() {
								return $scope.columnData;
							}
						}
					});

					modalInstance.result.then(function(columnData) {
						$scope.columnData = columnData;
					});
				};

				$scope.checkedIndexes = [];

				$scope.checkedIndex = function(data) {
					if ($scope.checkedIndexes.indexOf(data) === -1) {
						$scope.checkedIndexes.push(data);
					} else {
						$scope.checkedIndexes.splice($scope.checkedIndexes
								.indexOf(data), 1);
					}
				};

				$scope.remove = function() {
					angular.forEach($scope.checkedIndexes, function(value,
							index) {
						var index = $scope.columnData.indexOf(value);
						$scope.columnData.splice($scope.columnData
								.indexOf(value), 1);
					});
					$scope.checkedIndexes = [];
				};
			});

	angular.module('Console').controller('AddColumnCtrl',
			function($scope, $modalInstance, columnData) {
				$scope.columnData = columnData;

				$scope.ok = function() {
					$scope.columnData.push({
						'checked' : false,
						'columnName' : $scope.columnName,
						'columnType' : $scope.columnType,
						'editable' : $scope.editable
					});
					$modalInstance.close(columnData);
				};

				$scope.cancel = function() {
					$modalInstance.dismiss('cancel');
				};
			});
})();