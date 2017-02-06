module.exports = {
  createSearchTermRegExp: function (term) {
    term = term.replace(/(^ +| +$|['"‘’“”‚„*])/g, '').replace(/([+\[\](|){}\\^$])/g, '\\$1');
    var accentGroups = ['aáàäâåæ', 'cç', 'eéèëê', 'iíìïî', 'nñ', 'oóòöôøœ', 'uúùüû', 'yýÿ'];
    for (var i = 0; i < accentGroups.length; i++) {
      term = term.replace(new RegExp('[' + accentGroups[i] + ']', 'ig'), '[' + accentGroups[i] + ']');
    }
    // This has to be done after the accent handling, as '\n' is affected
    term = term.replace(/[.,:;…·\t\r\n \s]+/g, '[\'"‘’“”‚„*.,:;…·\\t\\r\\n \\s]+').replace(/[-–—]+/g, '[-–—]+');
    return new RegExp(term, 'ig');
  }
};
