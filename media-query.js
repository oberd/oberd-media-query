/*global define, Modernizr, document, window */
define(function (require) {

  'use strict';
  var _ = require('underscore');
  var $ = require('jquery');
  var Backbone = require('backbone');

  function MediaQuery() {
    this._breakpoints = {
      'tablet': '(min-width: 450px)',
      'desktop': '(min-width: 769px)',
      'wide': '(min-width: 1025px)',
      'hd': '(min-width: 1401px)'
    };
  }
  _.extend(MediaQuery.prototype, Backbone.Events);

  MediaQuery.prototype.breakpoints = function (bp) {
    if (typeof bp === 'undefined') {
      return this._breakpoints;
    } else {
      this._breakpoints = bp;
      return this;
    }
  };

  MediaQuery.prototype.update = function () {
    this.prev = _.clone(this.matched || []);
    this.matched = [];
    _.each(this._breakpoints, this.testBreakPoint, this);
    return this;
  };

  MediaQuery.prototype.testBreakPoint = function (mq, key) {
    var hasMq = Modernizr.mq(mq);
    if (hasMq) {
      $(document.documentElement).addClass(key);
      if(this.prev.indexOf(key) < 0){
        this.trigger('match:' + key);
        this.trigger('match', key);
      }
      this.matched.push(key);
    } else {
      $(document.documentElement).removeClass(key);
      if(this.prev.indexOf(key) >= 0){
        this.trigger('unmatch:' + key);
        this.trigger('unmatch', key);
      }
    }
  };

  MediaQuery.prototype.watch = function (el, deb) {
    var mqUpdater = _.debounce(_.bind(this.update, this), deb);
    $(window).resize(mqUpdater);
    this.update();
  };

  MediaQuery.prototype.getMatched = function () {
    return _.unique(this.matched);
  };

  return new MediaQuery();
});
