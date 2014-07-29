angular.module("risevision.widget.common.financial")
  .directive("instrumentSelect", ["financialService",
  function(financialService) {
    return {
      restrict: "A",
      link: function ( $scope, $element ) {
        var $elem = $($element);

        // This adds the new tag to the tags array
        function add() {
          var value = $elem.val();
          if (value && $.inArray(value, $scope.instruments) === -1) {
            $scope.instruments.push(value);

            $elem.select2("val", "");
          }
        };

        $elem.bind("change", function(event) {
          // There's probably a better way to handle this...
          $scope.$apply(add());
        });

        $elem.select2({
          minimumInputLength: 1,
          placeholder: "Add an instrument...",
          query: function (query) {
            if (query.term) {
              financialService.getInstruments({"search": query.term}).then(
                function (result) {
                  if (result) {
                    query.callback({results: result});
                  }
                },
                function (reason) {
                  // TODO
                }
              );
            }
          }
        });

      }
    };
  }]);
