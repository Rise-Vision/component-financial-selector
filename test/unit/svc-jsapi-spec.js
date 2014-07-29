/*jshint expr:true */
"use strict";

describe("Services: jsapiLoader", function() {

  beforeEach(module("risevision.widget.common.financial.service"));

  it("should exist", function(done) {
    inject(function(jsapiLoader) {
      expect(jsapiLoader).be.defined;
      done();
    });
  });

  it("should return visualization", function(done) {
    inject(function(jsapiLoader) {
      expect(jsapiLoader.getVisualization).be.defined;
      done();
    });
  });

});
