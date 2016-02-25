Middleman Simple Thumbnailer [![Build Status](https://travis-ci.org/kubenstein/middleman-simple-thumbnailer.png?branch=master)](https://travis-ci.org/kubenstein/middleman-simple-thumbnailer)
=============

Middleman Simple Thumbnailer is a [Middleman](http://middlemanapp.com/) extension that allows you to create image thumbnails by providing `resize_to` option to image_tag helper.


Installation
-------
Put this line into your `Gemfile`:
```
gem 'middleman-simple-thumbnailer'
```

Usage
-----
Enable the extension in `config.rb`:
```
activate :middleman_simple_thumbnailer
```

And modify your `image_tag`'s by adding `resize_to` parameter:
```
= image_tag image, resize_to: '50x50', class: 'thumbnail'
```

Build/Development modes
-----
  During development thumbnails will be created on fly and presented as a base64 strings.
  During build thumbnails will be created as normal files and stored in same dir as their originals.

LICENSE
-----
MIT