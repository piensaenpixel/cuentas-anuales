var $ = require('jquery');

module.exports = {
  init: function () {
    $('table').tableHover({colClass: 'hover', ignoreCols: [1]});
  }
};
