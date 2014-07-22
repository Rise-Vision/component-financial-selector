angular.module("risevision.widget.common.financial.service", [])
  .service("financialService", ["jsapiLoader", "$q", function (jsapiLoader, $q) {
    this.getInstruments = function (search, cursor, count, sort) {
      var deferred = $q.defer();
      var obj = {
          "search": search,
          "cursor": cursor ? cursor : 0,
          "count": count ? count : 50,
          "sort": sort ? sort : "name"
      };

      function callbackSuccess(dataTable) {
        var instruments = [];
        for (i = 0; i < dataTable.getNumberOfRows(); i++) {
          var row = {
            "code": dataTable.getValue(i, 0),
            "name": dataTable.getValue(i, 1)
          };
          instruments.push(row);
        }
        return instruments;
      }

      jsapiLoader.get().then(function (gApi) {
        var url = CONFIG.FINANCIAL_SERVER_URL + "lookup/local";

        var query = new gApi.Query(url, {
          sendMethod: 'scriptInjection'
        });

        search = angular.lowercase(search);

        query.setQuery("where ((lower(code) like '%" + search + "%') or " +
        "(lower(name) like '%" + search + "%')) " +
        "order by name limit 50 offset 0");

        query.send(function(queryResponse) {
          try {
            if (queryResponse.isError()) {
              callbackError(queryResponse.getMessage());
            }
            else {
              var dataTable = queryResponse.getDataTable();
              var cursor = dataTable.getTableProperty("cursor");

              deferred.resolve(callbackSuccess(dataTable));
            }
          }
          catch (err) {
            callbackError(err.message);
          }
        });
      });

      return deferred.promise;
    };
  }]);
