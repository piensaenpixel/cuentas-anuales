module.exports = {
  init: function () {
      $('.js-dropdown').click(function() {
        $('.content-dropdown').toggleClass('is-open');
      });
  }
};
