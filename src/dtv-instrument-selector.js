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
