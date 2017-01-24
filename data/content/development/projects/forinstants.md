#### Background

My wife and I love travelling, and we share our travels (and some other things occasionally) on this blog, called For Instants. My wife writes the posts, usually with photos shot mostly by me, and it provides both a place for us to keep a journal of our life and travels, while also sharing some of those "instants" with others. As such, we like to keep it simple: no crazy banner ads, or hyper marketing – just a post on a page.


#### Development Work

Originally this site was just a custom WordPress theme, but I have since demoted WordPress to backend duties only (using [WP API](http://v2.wp-api.org/)), redeveloping the frontend using React. Since I still wanted to serve users and search engines a fully-rendered HTML page, I used Apache's `mod_proxy` to proxy all of the non-admin pages to a Node server that renders the React frontend on the server before the response is sent to the user. [`redux-saga`](https://github.com/redux-saga/redux-saga) makes it really easy to perform the WP API calls necessary to retrieve each page's content.

The WordPress backend includes several custom features, including custom taxonomies to organize our travel, as can be seen on our [travel](https://walkandalie.com/travel/) and [trips](https://walkandalie.com/trips/) pages.

Since the images are such an important part of each post, I developed a custom WordPress plugin to generate responsive images, allowing me to generate optimally-sized images for each device based on the site's media breakpoints. My plugin creates these custom image sizes on each image upload, and lets us use simple shortcodes in each post to define an image, keeping those nasty responsive image tags out of the text editor window. For example, this shortcode `[rimg id="16652" size="blog-image" align="center" alt="Sedona2015_4223"]` gets converted into an `img` tag with all of those attributes, and also `src`, `srcset` and `sizes` attributes. Additionally, this plugin works with my [S3/CloudFront](https://wordpress.org/plugins/amazon-s3-and-cloudfront/) plugin to keep all of these responsive images off my server, and distributed globally.
