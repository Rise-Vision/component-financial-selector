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
  window.pickFiles = function (files) {
    var req = {};
    req[window.google.picker.Response.ACTION] = window.google.picker.Action.PICKED;
    req[window.google.picker.Response.DOCUMENTS] = files;
    window._pickerCallbackFn.call(null, req);
  };
  window.dialogCancel = function () {
    var req = {};
    req[window.google.picker.Response.ACTION] = window.google.picker.Action.CANCEL;
    window._pickerCallbackFn.call(null, req);
  };

})(window);
