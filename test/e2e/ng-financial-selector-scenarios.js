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

    it("Should initialize list correctly", function () {
      element.all(by.css(".tags span.label")).then(function (elements) {
        expect(elements.length).to.equal(2);

        expect(elements[1].getText()).to.eventually.equal("initial2");
      });
    });

    it("Should open selector when clicked", function () {
      element(by.css("a.select2-choice.select2-default")).click();

      element(by.id("select2-drop")).then(function (element) {
        expect(element.isPresent()).to.eventually.be.true;

        expect(element.getCssValue("display")).to.eventually.equal("block");
      });

    });

    it("Should show results when search query is entered", function () {
      element(by.css("a.select2-choice.select2-default")).click();

      element(by.id("select2-drop")).element(by.css("div input")).sendKeys("a");

      expect(element.all(by.css(".select2-results li")).count())
        .to.eventually.equal(3);
    });

    it("Should add instrument when selected", function () {
      element(by.css("a.select2-choice.select2-default")).click();

      element(by.id("select2-drop")).element(by.css("div input")).sendKeys("a");

      element.all(by.css(".select2-results li")).then(function (elements) {
        elements[1].click();
      });

      expect(element(by.css(".select2-drop.select2-display-none"))
        .getCssValue("display"))
        .to.eventually.equal("none");

      element.all(by.css(".tags span.label")).then(function (elements) {
        expect(elements.length).to.equal(3);

        expect(elements[2].getText()).to.eventually.equal("test2name");
      });

    });

    xit("Should correctly save settings", function (done) {
      //TODO
    });

  });

})();
