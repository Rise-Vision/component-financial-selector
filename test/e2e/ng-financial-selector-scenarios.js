/* jshint expr: true */

(function() {

  "use strict";

  /* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);
  var expect = chai.expect;

  browser.driver.manage().window().setSize(1024, 768);

  describe("Financial Selector Component", function() {
    beforeEach(function (){
      browser.get("/test/e2e/ng-financial-selector-scenarios.html");
    });

    xit("Should correctly save settings", function (done) {
      //TODO
    });

  });

})();
