"use strict";

angular.module("risevision.widget.common.financialSelector", [])
  .directive("financialSelector", ["$document", "$window", "$log", "$templateCache",
    function ($document, $window, $log, $templateCache) {
    return {
      restrict: "AE",
      scope: {
        instruments: "=",
        viewId: "@"
      },
      template: $templateCache.get("financial-selector-template.html"),
      link: function ($scope, $element, attrs) {
        var document = $document[0];
        var $elem = $($element);
        var viewId = attrs.viewId || "docs";

        $scope.openFinancialSelector = function() {
          var $googleFonts = $elem.find(".financial-selector");
          $googleFonts.modal("show");
        };


  			var isVisualizationLoaded = false;

  			google.setOnLoadCallback(function() {
  				isVisualizationLoaded = true;

          var url = "http://contentfinancial2-test.appspot.com/lookup/local?tq=+order+by+name+limit+50+offset+0";

      		var query = new google.visualization.Query(url, {
      			sendMethod: 'scriptInjection'
      		});

      		query.send(function(queryResponse) {
      //		    debugger;


      			try {
      				if (queryResponse.isError()) {
      					callbackError(queryResponse.getMessage());
      				}
      				else {
      					var dataTable = queryResponse.getDataTable();
      					var cursor = dataTable.getTableProperty("cursor");

      					callbackSuccess(dataTable, cursor);
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
