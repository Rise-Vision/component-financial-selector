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
