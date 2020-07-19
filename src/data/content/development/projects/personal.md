---
slug: personal
name: Personal Site
shortName: Personal
link: http://walkerangell.com/
screenshot: ../../../../images/development/personal.jpg
launchDate: 2014-10-30
primaryColor: [118, 54, 9]
technologies: [react, sass]
hosting: [aws]
---
#### Background

You're currently looking at this site! Initially, I just wanted a simple gallery to display some of my photography, but have since converted it into a portfolio of both photography, and development work.


#### Development Work

This site has always been a place for me to experiment with different technologies.

Initially, I created a gallery using a custom WordPress theme and custom [NextGEN Gallery](https://wordpress.org/plugins/nextgen-gallery/) plugin. But, that was when I still loved WordPress.

Next, I thought it made more sense to convert this site into a static site, and also wanted to try using [Middleman](https://middlemanapp.com/) on a project, so successfully ported the WordPress site to static Middleman site. While this certainly made the site more performant, and allowed for more flexibility, I wasn't particularly happy with the Middleman workflow.

Most recently, being completely enamored with React, I thought there must be a way to use React to create a static site with Webpack. The solution was even simpler than I thought, thanks to the [Static Site Generator](https://github.com/markdalgleish/static-site-generator-webpack-plugin) plugin for Webpack. As an added bonus, I can use Webpack to convert Markdown, letting me write all of the copy for this site in Markdown.
