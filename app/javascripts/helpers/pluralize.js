Handlebars.registerHelper('pluralize', function(collection, singular, plural) {
  var count = (typeof collection === 'number' ? collection : collection.length)

  if (count === 1) {
    return count + ' ' + singular;
  } else {
    return (typeof plural === 'string' ? count + ' ' + plural : count + ' ' + singular + 's');
  }
});
