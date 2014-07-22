angular.module("risevision.widget.common.financial")
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
