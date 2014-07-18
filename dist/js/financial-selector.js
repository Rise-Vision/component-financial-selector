var CONFIG = {
  GOOGLE_CLIENT_ID: "614513768474.apps.googleusercontent.com"
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

angular.module("risevision.widget.common.financialSelector")
  .directive("instrumentSelector", ["$templateCache", function($templateCache) {
    return {
      restrict: "E",
      scope: { tags: "=" },
      template: $templateCache.get("instrument-selector-template.html"),
      link: function ( $scope, $element ) {

      }
    };
  }]);

angular.module("risevision.widget.common.financialSelector")
  .directive("tagManager", ["$templateCache", function($templateCache) {
    return {
      restrict: "E",
      scope: { tags: "=" },
      template: $templateCache.get("tag-manager-template.html"),
      link: function ( $scope, $element ) {
        var $elem = $($element);
        var $input = $elem.find("input");

        var input = angular.element($input);

        // This adds the new tag to the tags array
        $scope.add = function() {
          $scope.tags.push( $scope.new_value );
          $scope.new_value = "";
        };

        // This is the ng-click handler to remove an item
        $scope.remove = function ( idx ) {
          $scope.tags.splice( idx, 1 );
        };

        // Capture all keypresses
        input.bind( "keypress", function ( event ) {
          // But we only care when Enter was pressed
          if ( event.keyCode == 13 ) {
            // There's probably a better way to handle this...
            $scope.$apply( $scope.add );
          }
        });
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
    "\n" +
    "<button class=\"btn btn-link btn-google\" type=\"button\" ng-click=\"openFinancialSelector()\">Financial Selector</button>\n" +
    "\n" +
    "<!-- Stock selector -->\n" +
    "<div class=\"financial-selector modal fade\" tabindex=\"-1\" role=\"dialog\"\n" +
    "  aria-hidden=\"true\" data-backdrop=\"false\">\n" +
    "  <div class=\"modal-dialog\">\n" +
    "    <div class=\"modal-content\">\n" +
    "      <div class=\"modal-header\">\n" +
    "        <button class=\"close\" type=\"button\" aria-hidden=\"true\"\n" +
    "          data-dismiss=\"modal\">\n" +
    "          <i class=\"glyphicons remove_2\"></i>\n" +
    "        </button>\n" +
    "        <h2 class=\"modal-title\">Instrument Selector</h2>\n" +
    "      </div>\n" +
    "      <div class=\"modal-body\">\n" +
    "      </div>\n" +
    "      <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">\n" +
    "          <span data-i18n=\"cancel\"></span>\n" +
    "          <i class=\"glyphicons white remove_2 icon-right\"></i>\n" +
    "        </button>\n" +
    "      </div>\n" +
    "    </div>\n" +
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
    "<input type=\"text\" placeholder=\"Add an instrument...\" ng-model=\"new_value\"></input>\n" +
    "<a class=\"btn\" ng-click=\"add()\">Add</a>\n" +
    "");
}]);
})();
