var data = require('./index.js');

var routes = [
  '/',
];

// var attorneyRoutes = Object.keys(data.attorneys).filter(function(slug) {
//   const attorney = data.attorneys[slug];
//   return attorney.includePage;
// }).map(function(slug) {
//   return '/attorneys/' + slug + '/';
// });

// var practiceAreaRoutes = Object.keys(data.practiceAreas).map(function(slug) {
//   return '/practice-areas/' + slug + '/';
// });

module.exports = routes;
