/*jshint expr:true */
"use strict";

describe("Services: financialService", function() {

  beforeEach(module("risevision.widget.common.financial.service"));

  beforeEach(module(function ($provide) {
      $provide.service("$q", function() {return Q;});
  }));

  it("should exist", function(done) {
    inject(function(financialService) {
      expect(financialService).be.defined;
      done();
    });
  });

  it("should return instruments", function(done) {
    inject(function(financialService) {
      financialService.getInstruments().then(function (instruments) {
        expect(instruments).to.be.defined;
        expect(instruments.length).to.equal(3);
        expect(instruments[1].id).to.equal("test2name");
        done();
      });
    });
  });
});
