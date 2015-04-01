(function() {
	'use strict';

	angular.module('Console').controller(
			'DataGridCtrl',
			function($scope, $window, columnData) {

				$scope.columnData = columnData;
				$scope.rowData = [{
					checked: false,
					Column1: "1001",
					Column2: "String1",
					Column3: "2015/03/30",
					Column4: true
				}];

				
				var today = new Date();
				var date = today.getDate();
				var month = today.getMonth() + 1;
				var year = today.getFullYear();

				if (month < 10) {
					month = '0' + month;
				}

				$scope.addRow = function() {
					var row = {
						'checked' : false
					};
					var ColumnNames = [];
					angular.forEach($scope.columnData, function(Column) {
						row[Column.columnName] = '';
						if (Column.columnType === 'Date') {
							row[Column.columnName] = year + '/' + month + '/'
									+ date;
						}
					});

					$scope.rowData.push(row);
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
					angular.forEach($scope.checkedIndexes,
							function(value, index) {
								var index = $scope.rowData.indexOf(value);
								$scope.rowData.splice($scope.rowData
										.indexOf(value), 1);
							});
					$scope.checkedIndexes = [];
				};

				
				
				$scope.today = function() {
					$scope.dt = new Date();
				};
				$scope.today();

				$scope.clear = function() {
					$scope.dt = null;
				};

				$scope.toggleMin = function() {
					$scope.minDate = $scope.minDate ? null : new Date();
				};
				$scope.toggleMin();

				$scope.openDP = function($event) {
					$event.preventDefault();
					$event.stopPropagation();
					if (typeof($scope.mydp) === 'undefined'){
					    $scope.mydp = {};
					}
					$scope.mydp.opened = true;
				};

				$scope.dateOptions = {
					formatYear : 'yy',
					startingDay : 1
				};

				$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy',
						'shortDate' ];
				$scope.format = $scope.formats[1];
				

				
				
				$scope.exportData = function() {

					var json = angular.toJson($scope.rowData);
					var blob = new Blob([ json ], {
						type : "application/json"
					});
					saveAs(blob, "rowdata.txt")
				};

			});
})();