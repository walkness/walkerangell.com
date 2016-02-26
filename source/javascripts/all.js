import 'babel-polyfill';

import jQuery from 'jquery';

import 'jquery.easing';
import './vendor/jquery.timers';
import './vendor/jquery.galleryview';

import '../stylesheets/all.scss';


jQuery(document).ready(function () {
  // Home Page Background
  jQuery('#background_img_dummy').load(function () {
    jQuery('#background_img').fadeIn(1000);
  });

  // Mobile nav
  const collapseButton = jQuery('#menu-collapse-button');
  const navMenu = jQuery('#menu-main-nav');

  collapseButton.click(function () {
    navMenu.slideToggle();
    collapseButton.toggleClass('open');
  });

  let headerHeight = 0;
  const footerHeight = jQuery('.site-footer').height();
  const mainContent = jQuery('#main-content');
  const mainContentPadding = parseInt(mainContent.css('padding-top').replace('px', ''), 10) + parseInt(mainContent.css('padding-bottom').replace('px', ''), 10);
  const frameGap = 5;
  let frameWidth = 130;
  const frameHeight = 70;

  let mainContentWidth;
  const windowWidth = jQuery(window).width();
  if (windowWidth < 769) {
    if (windowWidth < 480) {
      frameWidth = windowWidth / 3 - frameGap;
    } else {
      frameWidth = windowWidth / 5 - frameGap;
    }
    mainContentWidth = windowWidth;
    headerHeight = jQuery('#sidebar').outerHeight(true);
  } else {
    mainContentWidth = mainContent.width();
  }
  const mainContentHeight = jQuery(window).height() - headerHeight - footerHeight - frameHeight - mainContentPadding - frameGap;

  jQuery('.gallery').galleryView({
    transition_speed: 800,                                // INT - duration of panel/frame transition (in milliseconds)
    // transition_interval: 4000,                         // INT - delay between panel/frame transitions (in milliseconds)
    // easing: 'easeInQuart',                             // STRING - easing method to use for animations (jQuery provides 'swing' or 'linear', more available with jQuery UI or Easing plugin)
    // show_panels: true,                                 // BOOLEAN - flag to show or hide panel portion of gallery
    // show_panel_nav: false,                             // BOOLEAN - flag to show or hide panel navigation buttons
    // enable_overlays: true,                             // BOOLEAN - flag to show or hide panel overlays
    panel_width: Math.min(mainContentWidth, 1650),        // INT - width of gallery panel (in pixels)
    panel_height: Math.min(mainContentHeight, 1098),      // INT - height of gallery panel (in pixels)
    panel_animation: 'crossfade',                         // STRING - animation method for panel transitions (crossfade,fade,slide,none)
    panel_scale: 'fit',                                   // STRING - cropping option for panel images (crop = scale image and fit to aspect ratio determined by panel_width and panel_height, fit = scale image and preserve original aspect ratio)
    // overlay_position: 'bottom',                        // STRING - position of panel overlay (bottom, top)
    // pan_images: true,                                  // BOOLEAN - flag to allow user to grab/drag oversized images within gallery
    // pan_style: 'drag',                                 // STRING - panning method (drag = user clicks and drags image to pan, track = image automatically pans based on mouse position
    // pan_smoothness: 15,                                // INT - determines smoothness of tracking pan animation (higher number = smoother)
    // start_frame: 1,                                    // INT - index of panel/frame to show first when gallery loads
    show_filmstrip: true,                                 // BOOLEAN - flag to show or hide filmstrip portion of gallery
    show_filmstrip_nav: false,                            // BOOLEAN - flag indicating whether to display navigation buttons
    // enable_slideshow: false,                           // BOOLEAN - flag indicating whether to display slideshow play/pause button
    // autoplay: false,                                   // BOOLEAN - flag to start slideshow on gallery load
    // show_captions: true,                               // BOOLEAN - flag to show or hide frame captions
    // filmstrip_size: 3,                                 // INT - number of frames to show in filmstrip-only gallery
    // filmstrip_style: 'scroll',                         // STRING - type of filmstrip to use (scroll = display one line of frames, scroll filmstrip if necessary, showall = display multiple rows of frames if necessary)
    // filmstrip_position: 'bottom',                      // STRING - position of filmstrip within gallery (bottom, top, left, right)
    frame_width: frameWidth,                              // INT - width of filmstrip frames (in pixels)
    frame_height: frameHeight,                            // INT - width of filmstrip frames (in pixels)
    // frame_opacity: 0.5,                                // FLOAT - transparency of non-active frames (1.0 = opaque, 0.0 = transparent)
    // frame_scale: 'crop',                               // STRING - cropping option for filmstrip images (same as above)
    frame_gap: frameGap,                                  // INT - spacing between frames within filmstrip (in pixels)
    show_infobar: true,                                   // BOOLEAN - flag to show or hide infobar
    // infobar_opacity: 1                                 // FLOAT - transparency for info bar
  });
});
