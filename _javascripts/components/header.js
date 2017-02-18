var $ = require('jquery');

var header = $('[data-header]');
var headerControl = $('[data-header-control]');
var existeHeader = header.length > 0 && headerControl.length > 0;

var scrollHandler = function () {
  var top = headerControl.get(0).getBoundingClientRect().top;
  var h = header.height();
  header.toggleClass(header.data('header'), top - h < 0);
};

var $w = $(window);

module.exports = {
  init: function () {
    if (!existeHeader) return;
    $w.on('scroll', scrollHandler);
  }
};
