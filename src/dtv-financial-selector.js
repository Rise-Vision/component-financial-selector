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
