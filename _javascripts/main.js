var $ = require('jquery');

$(function () {
  require('./vendor/jquery.tablehover')($);
  require('./components/dropdown').init();
  require('./components/table').init();
  require('./components/search').init();

  var highlight = require('./components/highlight');
  highlight();
});
