var $ = require('jquery');
window.jQuery = $;

require('jquery-parallax.js');

$(function () {
  require('./vendor/jquery.tablehover')($);
  require('./components/dropdown').init();
  require('./components/table').init();
  require('./components/search').init();
  require('./components/header').init();

  var highlight = require('./components/highlight');
  highlight();
});
