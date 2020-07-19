---
slug: chargerville
name: Chargerville
link: https://chargerville.com/
screenshot: ../../../../images/development/chargerville.jpg
launchDate: 2016-05-13
primaryColor: [0, 99, 157]
technologies: [react, django, sass]
hosting: [aws]
---
#### Background

Chargerville is a platform for electric vehicle drivers to share reviews, tips, and comments about charger locations and nearby amenities.

#### Development Work

I built a simple Django backend that serves a JSON API consumed by a React application in the browser. To improve initial page load speeds, and to optimize the site for SEO, the Django application also renders the React application "isomorphically" on the server, allowing Chargerville to reap all of the benefits of an interactive client-side application, and fully-rendered server responses, using the same codebase on both the client and the server.
