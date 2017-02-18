var $ = require('jquery');
var _t = require('./template');

var state = {
  open: false
};

var TEMPLATE = '<li class="content-dropdownitem"><a href="#{{id}}">{{title}}</a></li>';

var stripAccents = (function () {
  var in_chrs = 'àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ';
  var out_chrs = 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY';
  var chars_rgx = new RegExp('[' + in_chrs + ']', 'g');
  var transl = {};
  var i;
  var lookup = function (m) { return transl[m] || m; };

  for (i = 0; i < in_chrs.length; i++) {
    transl[ in_chrs[i] ] = out_chrs[i];
  }

  return function (s) {
    return s.replace(chars_rgx, lookup);
  };
})();

var openHandler = function (e) {
  if (state.open === false) {
    e.preventDefault();

    state.open = true;
    $('.content-dropdown').toggleClass('is-open');
  }
};

var closeHandler = function (e) {
  e.stopPropagation();
  state.open = !state.open;
  $('.content-dropdown').toggleClass('is-open', state.open);
};

var generatePermalinks = function () {
  $('h2').each(function (i, el) {
    var $el;
    var id;
    var title;

    $el = $(el);
    title = $el.text();
    id = stripAccents(title)
          .replace(/([^A-Za-z0-9[\]{}_.:-])\s?/g, '-')
          .toLowerCase();
    $el.attr('id', id);
    generateDropdownOption(id, title);
  });
};

var generateDropdownOption = function (id, title) {
  var $el = $('.js-dropdown-content');
  var node = _t(TEMPLATE, {
    id: id,
    title: title
  });

  $el.append($(node));
};

module.exports = {
  init: function () {
    generatePermalinks();
    $('.js-dropdown').on('click', openHandler);
    $('.js-dropdown-chevron').on('click', closeHandler);
  }
};
