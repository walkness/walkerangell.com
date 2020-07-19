---
slug: forinstants
name: For Instants
link: https://walkandalie.com/
screenshot: ../../../../images/development/forinstants.jpg
launchDate: 2010-09-27
primaryColor: [52, 60, 39]
technologies: [react, wordpress, sass]
hosting: [linode, aws]
---
#### Background

My wife and I love travelling, and we share our travels (and some other things occasionally) on this blog, called For Instants. My wife writes the posts, usually with photos shot mostly by me, and it provides both a place for us to keep a journal of our life and travels, while also sharing some of those "instants" with others. As such, we like to keep it simple: no crazy banner ads, or hyper marketing – just a post on a page.


#### Development Work

Originally this site was just a custom WordPress theme. Wanting to improve the frontend, I migrated to a React-based frontend that consumed content served by WordPress's [REST API](https://developer.wordpress.org/rest-api/), using a Node rendering engine proxied through Apache's `mod_proxy` module to deliver fully-rendered pages. Most recently, I have moved the backend to a custom "headless" CMS on which I have been working.

I had been searching for a good Django-based CMS that would let me specify my data structures exactly as I wanted them, and lacked the complexity introduced by routing and templating (since I only wanted to use it as a REST API). I wanted a simple, customizable admin panel that focused almost exclusively on editing content. Not being able to find what I wanted, I decided to build my own. The result I am calling [Horseman](https://github.com/walkness/django-horseman). While I hope to make it an application that can be plugged into any Django project, it currently only powers this blog, and is not quite ready for primetime.

However, Horseman is currently doing an admirable job as the CMS of For Instants, and boasts some nice features: the admin is automatically generated from your Django models and is built in React, the image management is robust, and it works with Amazon CloudFront to invalidate my frontend cache whenever content is changed. With the CloudFront feature, I have been able to improve the site's availability and performance by serving the main site directly from CloudFront's caches, significantly reducing the load on my server, while making the site more immune to traffic spikes.
