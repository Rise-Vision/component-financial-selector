"use strict";

angular.module("risevision.widget.common.financialSelector")
  .directive("instrumentList", ["$document", "$window", "$log", "$templateCache",
    function ($document, $window, $log, $templateCache) {
    return {
      restrict: "A",
      scope: {
        search: "="
      },
      template: $templateCache.get("instrument-list-template.html"),
      link: function ($scope, $element, attrs) {
        var document = $document[0];
        var $elem = $($element);

        function callbackSuccess(dataTable) {
          $scope.instruments = [];
          for (i = 0; i < dataTable.getNumberOfRows(); i++) {
            var row = {
              "code": dataTable.getValue(i, 0),
              "name": dataTable.getValue(i, 1)
            };
            $scope.instruments.push(row);
          }
        }

        function callbackError(message) {

        }

        google.setOnLoadCallback(function() {
          isVisualizationLoaded = true;

          var url = CONFIG.FINANCIAL_SERVER_URL + "lookup/local";

          var query = new google.visualization.Query(url, {
            sendMethod: 'scriptInjection'
          });

          query.setQuery("where ((lower(code) like '%" + $scope.search + "%') or " +
          "(lower(name) like '%aa%')) " +
          "order by name limit 50 offset 0");

          query.send(function(queryResponse) {
            try {
              if (queryResponse.isError()) {
                callbackError(queryResponse.getMessage());
              }
              else {
                var dataTable = queryResponse.getDataTable();
                var cursor = dataTable.getTableProperty("cursor");

                callbackSuccess(dataTable);
              }
            }
            catch (err) {
              callbackError(err.message);
            }
          });
        });

      }
    };
  }]);
