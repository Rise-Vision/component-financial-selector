var CONFIG = {
  FINANCIAL_SERVER_URL: "http://contentfinancial2-test.appspot.com/"
};

"use strict";

angular.module("risevision.widget.common.financial", ["risevision.widget.common.financial.service"])
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
          }
          // Clear out text box
          $elem.select2("val", "");
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

angular.module("risevision.widget.common.financial")
  .directive("tagManager", ["$templateCache", function($templateCache) {
    return {
      restrict: "E",
      scope: {
        tags: "="
      },
      template: $templateCache.get("tag-manager-template.html"),
      link: function ( $scope, $element ) {
        // This is the ng-click handler to remove an item
        $scope.remove = function ( idx ) {
          $scope.tags.splice( idx, 1 );
        };
      }
    };
  }]);

angular.module("risevision.widget.common.financial.service", [])
  .service("financialService", ["jsapiLoader", "$q", function (jsapiLoader, $q) {

    var defaultObj = {
      "search": "",
      "cursor": 0,
      "count": 50,
      "sort": "code"
    };

    function processInstruments(dataTable) {
      var instruments = [];
      for (i = 0; i < dataTable.getNumberOfRows(); i++) {
        var row = {
          "id": dataTable.getValue(i, 0),
          "text": dataTable.getValue(i, 0)
          + (dataTable.getValue(i, 1) ? " - " + dataTable.getValue(i, 1) : "")
        };
        instruments.push(row);
      }
      return instruments;
    }

    function formQuerystring(obj) {
      var search = angular.lowercase(obj.search);

      var queryString = "where ((lower(code) like '%" + search + "%') or" +
        " (lower(name) like '%" + search + "%'))" +
        " order by " + obj.sort +
        " limit " + obj.count +
        " offset " + obj.cursor;

      return queryString;
    }

    this.getInstruments = function (obj) {
      var deferred = $q.defer();

      obj = angular.extend(defaultObj, obj);

      jsapiLoader.getVisualization().then(function (gApi) {
        var url = CONFIG.FINANCIAL_SERVER_URL + "lookup/local";

        var query = new gApi.Query(url, {
          sendMethod: 'scriptInjection'
        });

        query.setQuery(formQuerystring(obj));

        query.send(function(queryResponse) {
          if (!queryResponse) {
            deferred.reject("No response");
          }
          else if (queryResponse.isError()) {
            deferred.reject(queryResponse.getMessage());
          }
          else {
            var dataTable = queryResponse.getDataTable();
            deferred.resolve(processInstruments(dataTable));
          }
        });
      });

      return deferred.promise;
    };

    this.getInstrumentsRemote = function (obj) {
      var deferred = $q.defer();

      obj = angular.extend(defaultObj, obj);

      jsapiLoader.getVisualization().then(function (gApi) {
        var url = CONFIG.FINANCIAL_SERVER_URL + "lookup/remote";

        var query = new gApi.Query(url, {
          sendMethod: 'scriptInjection'
        });

        query.setQuery(formQuerystring(obj));

        query.send(function(queryResponse) {
          if (!queryResponse) {
            deferred.reject("No response");
          }
          else if (queryResponse.isError()) {
            deferred.reject(queryResponse.getMessage());
          }
          else {
            var dataTable = queryResponse.getDataTable();
            deferred.resolve(processInstruments(dataTable));
          }
        });
      });

      return deferred.promise;
    };
  }]);

angular.module("risevision.widget.common.financial.service")
  .factory("jsapiLoader", ["$q", "$window", function ($q, $window) {
    var jsapi = false;

    var factory = {
      getVisualization: function () {
        var deferred = $q.defer();

        if(jsapi || $window.google.visualization) {
          jsapi = true;
          deferred.resolve($window.google.visualization);
        }
        else {
          $window.google.setOnLoadCallback(function () {
            jsapi = true;
            deferred.resolve($window.google.visualization);
          });
        }

        return deferred.promise;
      }
    };
    return factory;

  }]);

(function(module) {
try { app = angular.module("risevision.widget.common.financial"); }
catch(err) { app = angular.module("risevision.widget.common.financial", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("financial-selector-template.html",
    "<tag-manager class=\"tag-manager\" tags=\"instruments\"></tag-manager>\n" +
    "<input type=\"hidden\" instrument-select instruments=\"instruments\" style=\"width:300px;\">\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.widget.common.financial"); }
catch(err) { app = angular.module("risevision.widget.common.financial", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("tag-manager-template.html",
    "<div class=\"tags\">\n" +
    "  <span ng-repeat=\"(idx, tag) in tags\" class=\"label label-primary\">\n" +
    "    {{tag}}\n" +
    "    <span class=\"glyphicon glyphicon-remove\" ng-click=\"remove(idx)\"></span>\n" +
    "  </span>\n" +
    "</div>\n" +
    "");
}]);
})();
