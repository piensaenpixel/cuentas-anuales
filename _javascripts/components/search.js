var $ = require('jquery');
var lunr = require('lunr');
var _ = require('underscore');

var Query = require('./query');
var utils = require('./utils');

var query = new Query();
var baseurl = window.baseurl;
var lang = window.lang;
var debounce = utils.debounce;

function getJsonURL () {
  if (lang === 'es') {
    return baseurl + '/pages.json';
  } else {
    return baseurl + '/' + lang + '/pages.json';
  }
}

function filterData (data) {
  return _.filter(data, function (dato) {
    return dato.url.substr(-1, 1) === '/';
  });
}

function extracto (query, result) {
  var regexp = utils.createSearchTermRegExp(query);
  var pos = regexp.exec(result.content);
  pos = pos ? pos.index : 0;
  var pre = (pos > 20) ? '&#8230 ' : '';
  pos = Math.max(0, pos - 20);
  var extract = result.content.substring(pos, pos + 50);
  extract = extract.replace(regexp, function (match) { return '<strong>' + match + '</strong>'; });
  return '<div>' + pre + extract + pre + '</div>';
}

function clearSearchResults () {
  var $results = $('.js-search-results');
  $results.empty();
}

function showResults (data, query) {
  var searchIndex;
  var results;
  var $results = $('.js-search-results');
  var totalScore = 0;
  var node;

  // PIECE 1
  // set up the allowable fields
  searchIndex = lunr(function () {
    this.field('title');
    this.field('content');
    this.ref('url');
  });

  // PIECE 2
  // add each item from page.json to the index
  _.each(data, function (item) {
    searchIndex.add(item);
  });

  results = searchIndex.search(query);

  if (results.length > 0) {
    for (var result in results) {
      node = data.filter(function (page) {
        return page.url === results[result].ref;
      })[0];

      results[result].title = node.title;
      results[result].content = node.content;
    }

    _.each(results, function (result) {
      totalScore += result.score;
    });

    _.each(results, function (result) {
      var hint = extracto(query, result);

      if (lang === 'es') {
        node = '<li><a href="' + baseurl + result.ref + '?s=' + query + '">' + result.title + '</a>' + hint + '</li>';
      } else {
        node = '<li><a href="' + baseurl + '/' + lang + result.ref + '?s=' + query + '">' + result.title + '</a>' + hint + '</li>';
      }
      $results.append(node);
    });
  } else {
    if (lang === 'es') {
      node = '<div class"no-results">No se han encontrado resultados</div>';
    } else {
      node = '<div class"no-results">Sorry, no results found</div>';
    }
    $results.append(node);
  }
}

function search (e) {
  // e.preventDefault();
  var searchQuery = $('.search-box').val().trim();
  clearSearchResults();

  if (searchQuery.length >= 3) {
    query
      .set(searchQuery)
      .getJSON(getJsonURL())
      .done(function (data) {
        var filteredData = filterData(data);
        showResults(filteredData, query.get());
      });
  }
}

module.exports = {
  init: function () {
    $('.js-search').on('keyup', debounce(search, 100));
  }
};
