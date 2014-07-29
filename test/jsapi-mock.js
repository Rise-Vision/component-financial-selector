(function (window){
  "use strict";
  window.google = {
    visualization: {
      Query: function (options, callback) {
        var ret = {
          setQuery: function (){return ret; },
          send: function (callback) {
            if (callback) {
              var obj = {
                isError: function() {return false;},
                getDataTable: function() {
                  var values = [
                      ["test1name", "test1value"],
                      ["test2name", "test2value"],
                      ["test3name", "test3value"]
                    ];
                  var ret2 = {
                    getNumberOfRows: function() {return 3;},
                    getValue: function(i, j) {
                      return values[i][j];
                    }
                  };
                  return ret2;
                }
              };
              setTimeout(function() {
                callback(obj);
              });

              return {};
            }
          }
        };
        return ret;
      }
    }
  };
})(window);
