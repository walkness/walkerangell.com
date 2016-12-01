/* eslint-disable */

var data = require('./index.js');

var routes = [
  '/',
  '/development/',
  '/photography/',
  '/contact/',
  '/resume/',
];

var categories = Object.keys(data.photography.portfolio.categories);

var portfolioRoutes = [];
for (var i = 0; i < categories.length; i++) {
  var category = categories[i];
  var categoryRoute = '/photography/' + category + '/';
  portfolioRoutes.push(categoryRoute);
  var galleries = Object.keys(data.photography.portfolio.categories[category].galleries);
  for (var j = 0; j < galleries.length; j++) {
    var gallery = galleries[j];
    portfolioRoutes.push(categoryRoute + gallery + '/');
  }
}

module.exports = routes.concat(portfolioRoutes);
