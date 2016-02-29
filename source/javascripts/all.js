import 'babel-polyfill';

import jQuery from 'jquery';

import '../stylesheets/all.scss';

class Gallery {
  constructor(el) {
    this.filmstripClass = 'filmstrip';
    this.gallery = jQuery(el);
    this.display = jQuery(el + ' > ul:first-child');
    this.images = this.display.children('li');
    jQuery(this.images[0]).addClass('current');

    this.buildFilmstrip();
    this.updateDimensions();
    this.addListeners();
  }

  updateDimensions() {
    this.displayWidth = this.display.width();
    this.filmstripWidth = this.filmstrip.width();
  }

  buildFilmstrip() {
    this.display.after('<ul class="' + this.filmstripClass + '"></ul>');
    const filmstrip = jQuery('.' + this.filmstripClass);
    const self = this;
    self.images.each(function () {
      const image = jQuery(this);
      const clone = self.cloneImage(image);
      filmstrip.append(clone);
    });
    self.filmstrip = filmstrip;
  }

  cloneImage(image) {
    const clone = image.clone();
    return clone;
  }

  addListeners() {
    this.addKeyboardListener();
    this.addFilmstripListener();
    this.addArrowListener();
    this.addWindowResizeListener();
    this.addImageChangedListener();
  }

  addWindowResizeListener() {
    const self = this;
    jQuery(window).resize(function () {
      self.updateDimensions();
    });
  }

  addFilmstripListener() {
    const filmstrip = jQuery('.' + this.filmstripClass);
    const self = this;
    filmstrip.children('li').each(function () {
      jQuery(this).on('click', function () {
        self.goToFilmstripImage(this);
      });
    });
  }

  addKeyboardListener() {
    const self = this;
    jQuery(document).keydown(function (e) {
      if (e.which === 37) {
        self.goToPreviousImage();
      } else if (e.which === 39) {
        self.goToNextImage();
      }
    });
  }

  addArrowListener() {
    const self = this;
    const arrowWidth = 1 / 3;
    self.display.click(function (e) {
      if (e.offsetX <= self.displayWidth * arrowWidth) {
        self.goToPreviousImage();
      } else if (e.offsetX >= self.displayWidth * (1 - arrowWidth)) {
        self.goToNextImage();
      }
    });
  }

  addImageChangedListener() {
    const self = this;
    this.gallery.on('image-changed', function () {
      self.scrollFilmstrip();
    });
  }

  goToNextImage() {
    const current = this.display.find('li.current');
    const currentFilmstrip = this.filmstrip.find('li.current');
    current.removeClass('current');
    currentFilmstrip.removeClass('current');
    if (current.is(':last-child')) {
      this.display.find('li:first-child').addClass('current');
      this.filmstrip.find('li:first-child').addClass('current');
    } else {
      current.next().addClass('current');
      currentFilmstrip.next().addClass('current');
    }
    this.gallery.trigger('image-changed');
    this.gallery.trigger('next-image');
  }

  goToPreviousImage() {
    const current = this.display.find('li.current');
    const currentFilmstrip = this.filmstrip.find('li.current');
    current.removeClass('current');
    currentFilmstrip.removeClass('current');
    if (current.is(':first-child')) {
      this.display.find('li:last-child').addClass('current');
      this.filmstrip.find('li:last-child').addClass('current');
    } else {
      current.prev().addClass('current');
      currentFilmstrip.prev().addClass('current');
    }
    this.gallery.trigger('image-changed');
    this.gallery.trigger('previous-image');
  }

  goToImageWithSrc(src) {
    this.display.find('li.current').removeClass('current');
    this.filmstrip.find('li.current').removeClass('current');
    this.display.find('img[src="' + src + '"]').parent().addClass('current');
    this.filmstrip.find('img[src="' + src + '"]').parent().addClass('current');
    this.gallery.trigger('image-changed');
  }

  goToFilmstripImage(image) {
    const src = jQuery(image).find('img').attr('src');
    this.goToImageWithSrc(src);
  }

  scrollFilmstrip() {
    const currentImage = this.filmstrip.find('.current').first();
    const scrollLeft = this.filmstrip.scrollLeft();
    const left = currentImage.position().left + scrollLeft;
    const currentImageWidth = currentImage.width();
    const center = left + currentImageWidth / 2;
    const filmstripCenter = this.filmstripWidth / 2;
    if (left >= filmstripCenter) {
      this.scrollFilmstripWithOffset(center - filmstripCenter);
    } else {
      this.scrollFilmstripWithOffset(0);
    }
  }

  scrollFilmstripWithOffset(offset) {
    this.filmstrip.animate({ scrollLeft: offset });
  }
}

jQuery(document).ready(function () {
  // Home Page Background
  jQuery('#background_img_dummy').load(function () {
    jQuery('#background_img').fadeIn(1000);
  });

  const gallery = new Gallery('.gallery');

  // Mobile nav
  const collapseButton = jQuery('#menu-collapse-button');
  const navMenu = jQuery('#menu-main-nav');

  collapseButton.click(function () {
    navMenu.slideToggle();
    collapseButton.toggleClass('open');
  });
});
