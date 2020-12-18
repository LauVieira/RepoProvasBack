const stripHtml = require('string-strip-html');

function sanitiseObjStrings (obj) {
  const objEntries = Object.entries(obj);
  const newObj = {};

  objEntries.forEach( entry => {
    if (typeof(entry[1]) === 'string') {
      const sanitisedString = stripHtml(entry[1]).result;
      newObj[entry[0]] = sanitisedString;
    }
    else {
      newObj[entry[0]] = entry[1];
    }
  });

  return newObj;
}

module.exports = { sanitiseObjStrings };
