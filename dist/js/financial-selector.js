var CONFIG = {
  FINANCIAL_SERVER_URL: "http://contentfinancial2-test.appspot.com/"
};

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

      }
    };
  }]);

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

angular.module("risevision.widget.common.financialSelector")
  .directive("instrumentSelector", ["$templateCache", function($templateCache) {
    return {
      restrict: "E",
      scope: {
        instruments: "="
      },
      template: $templateCache.get("instrument-selector-template.html"),
      link: function ( $scope, $element ) {
        var $elem = $($element);
        var $input = $elem.find("input");

        var input = angular.element($input);

        // This adds the new tag to the tags array
        $scope.add = function() {
          $scope.instruments.push( $scope.newInstrument );
          $scope.newInstrument = "";
        };

        // Capture all keypresses
        input.bind( "keypress", function ( event ) {
          // But we only care when Enter was pressed
          if ( event.keyCode == 13 ) {
            // There's probably a better way to handle this...
            $scope.$apply( $scope.add );
          }
        });

        // Note: Can also use directive on the dropdown-menu
        $scope.dropdown = function(show) {
          if (show) {
            $(".instrument-selector.dropdown").addClass("open");
          }
          else {
            $(".instrument-selector.dropdown").removeClass("open");
          }
        };

        $scope.$watch("newInstrument", function(newInstrument) {
          $scope.dropdown(newInstrument);
        });

      }
    };
  }]);

angular.module("risevision.widget.common.financialSelector")
  .directive("tagManager", ["$templateCache", function($templateCache) {
    return {
      restrict: "E",
      scope: {
        tags: "="
      },
      template: $templateCache.get("tag-manager-template.html"),
      link: function ( $scope, $element ) {
        // This is the ng-click handler to remove an item
        $scope.remove = function ( idx ) {
          $scope.tags.splice( idx, 1 );
        };
      }
    };
  }]);

(function(module) {
try { app = angular.module("risevision.widget.common.financialSelector"); }
catch(err) { app = angular.module("risevision.widget.common.financialSelector", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("financial-selector-template.html",
    "<tag-manager class=\"tag-manager\" tags=\"instruments\"></tag-manager>\n" +
    "<instrument-selector instruments=\"instruments\"></instrument-selector>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.widget.common.financialSelector"); }
catch(err) { app = angular.module("risevision.widget.common.financialSelector", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("instrument-list-template.html",
    "<li class=\"dropdown-header\">Instruments</li>\n" +
    "<li class=\"divider\"></li>\n" +
    "<li ng-repeat=\"item in instruments\">\n" +
    "  <a href=\"#\">{{item.code}}</a>{{item.name}}\n" +
    "</li>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.widget.common.financialSelector"); }
catch(err) { app = angular.module("risevision.widget.common.financialSelector", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("instrument-selector-template.html",
    "<div class=\"row\">\n" +
    "	<div class=\"col-md-6\">\n" +
    "    <div class=\"instrument-selector dropdown\">\n" +
    "      <input class=\"form-control\" type=\"text\" placeholder=\"Add an instrument...\"\n" +
    "      ng-model=\"newInstrument\" ng-blur=\"dropdown(false)\"></input>\n" +
    "      <ul instrument-list class=\"dropdown-menu\" role=\"menu\">\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-1\">\n" +
    "    <a class=\"btn\" ng-click=\"add()\">Add</a>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.widget.common.financialSelector"); }
catch(err) { app = angular.module("risevision.widget.common.financialSelector", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("tag-manager-template.html",
    "<div class=\"tags\">\n" +
    "  <span ng-repeat=\"(idx, tag) in tags\" class=\"label label-primary\">\n" +
    "    {{tag}}\n" +
    "    <span class=\"glyphicon glyphicon-remove\" ng-click=\"remove(idx)\"></span>\n" +
    "  </span>\n" +
    "</div>\n" +
    "");
}]);
})();