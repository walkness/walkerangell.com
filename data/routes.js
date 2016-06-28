var data = require('./index.js');

var routes = [
  '/',
  '/portfolio/',
];

var categories = Object.keys(data.portfolio.categories);

var portfolioRoutes = [];
for (var i = 0; i < categories.length; i++) {
  var category = categories[i];
  var categoryRoute = '/portfolio/' + category + '/';
  portfolioRoutes.push(categoryRoute);
  var galleries = Object.keys(data.portfolio.categories[category].galleries);
  for (var j = 0; j < galleries.length; j++) {
    var gallery = galleries[j];
    portfolioRoutes.push(categoryRoute + gallery + '/');
  }
}

module.exports = routes.concat(portfolioRoutes);
