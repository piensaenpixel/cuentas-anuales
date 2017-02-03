var $ = require('jquery');
var Query = require('./query');

var query = new Query();

function getJsonURL () {
  if (window.siteLang === 'es') {
    return '/pages.json';
  } else {
    return '/' + window.langSite + '/pages.json';
  }
}

function onSubmitHandler (e) {
  e.preventDefault();

  // set the query, and go to the search page with our query URL
  query
    .set($('.search-box').val().trim())
    .getJSON(getJsonURL())
    .done(function (data) {
      console.log(data);
      // show our results
    });
}

module.exports = {
  init: function () {
    $('.js-search').on('submit', onSubmitHandler);
  }
};
