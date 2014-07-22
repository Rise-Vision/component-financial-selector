"use strict";

angular.module("risevision.widget.common.financial")
  .directive("instrumentList", ["$document", "$window", "financialService", "$log", "$templateCache",
    function ($document, $window, financialService, $log, $templateCache) {
    return {
      restrict: "A",
      scope: {
        search: "="
      },
      template: $templateCache.get("instrument-list-template.html"),
      link: function ($scope, $element, attrs) {
        var document = $document[0];
        var $elem = $($element);

        function callbackError(message) {

        }

        $scope.$watch("search", function(search) {
          if (search) {
            financialService.getInstruments(search).then(function (result) {
              if (result) {
                $scope.instruments = result;
              }
            });
          }
        });

      }
    };
  }]);
