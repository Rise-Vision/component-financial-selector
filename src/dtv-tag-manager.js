angular.module("risevision.widget.common.tag-manager", [])
  .directive("tagManager", ["$templateCache", function($templateCache) {
    return {
      restrict: "E",
      scope: {
        tags: "="
      },
      template: $templateCache.get("tag-manager-template.html"),
      link: function ($scope) {
        // This is the ng-click handler to remove an item
        $scope.remove = function ( idx ) {
          $scope.tags.splice( idx, 1 );
        };
      }
    };
  }]);
