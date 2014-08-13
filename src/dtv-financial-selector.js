"use strict";

angular.module("risevision.widget.common.financial", [
  "risevision.widget.common.financial.service",
  "risevision.widget.common.tag-manager"
  ])
  .directive("financialSelector", ["$templateCache",
    function ($templateCache) {
    return {
      restrict: "AE",
      require: "?ngModel",
      scope: {
        instruments: "=",
        viewId: "@"
      },
      template: $templateCache.get("financial-selector-template.html"),
      link: function($scope, elm, attrs, ctrl) {
        if (ctrl) {
          // Adding watch to populate model with number of instruments
          $scope.$watch("instruments", function (instruments) {
            if (instruments) {
              ctrl.$setValidity("required", instruments.length);
            }
          }, true);
        }
      }
    };
  }]);
