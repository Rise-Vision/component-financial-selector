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
        viewId: "@"
      },
      template: $templateCache.get("financial-selector-template.html"),
      link: function ($scope, $element, attrs) {
        var document = $document[0];
        var viewId = attrs.viewId || "docs";

        $scope.openFinancialSelector = function() {
          alert("opened");
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
    "<button class=\"btn btn-link btn-google\" type=\"button\" ng-click=\"openFinancialSelector()\">Financial Selector</button>\n" +
    "");
}]);
})();
