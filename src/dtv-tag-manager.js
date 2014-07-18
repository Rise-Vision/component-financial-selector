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
