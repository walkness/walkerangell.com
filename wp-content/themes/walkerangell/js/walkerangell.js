jQuery(document).ready(function(){
	
// 	jQuery('#background_img').hide();
	
	// Locking sidebar
	var sidebar = jQuery('#sidebar');
	var mainContent = jQuery('#main-content');

	var adminHeight = 0;
	if(jQuery('body').hasClass('admin-bar')) { adminHeight = 32; } else { adminHeight = 0; }

	var initPos = sidebar.offset().top - adminHeight;
	var contentWidth = mainContent.width();
	
	jQuery(window).scroll(function(e){
		var scrl = jQuery(window).scrollTop();
		if(scrl > initPos){
			sidebar.css({'position':'fixed', 'top':0 + adminHeight});
			mainContent.css({'width':contentWidth, 'float':'right'});
		} else {
			sidebar.css({'position':'relative', 'top':''});
			mainContent.css({'width':'','float':''});
		}
	});
	
	// Navigation animation
	jQuery('ul.sub-menu').filter(":not(:has(li.current-menu-item))").hide();
	
	jQuery("ul.menu li.menu-item a, ul.sub-menu li.menu-item a").click(function(event){
		if ( jQuery(this).closest('li').hasClass('menu-item-has-children') ){
			event.preventDefault();
			jQuery(this).siblings('ul').slideToggle();
		}
	});
	
	jQuery('#gallery_nav li.album a').filter(':not(#gallery_nav li.gallery a)').click(function(event){
		event.preventDefault();
		jQuery(this).siblings('ul.menu').slideToggle();
	});
	
	
	// Home Page Background
	jQuery('#background_img_dummy').load(function(){
		jQuery('#background_img').fadeIn(1000);
	});

    	var mainContentWidth	= jQuery('#main-content').width();
    	var adminHeight = 0;
    	if(jQuery('body').hasClass('admin-bar')) { adminHeight = 32; } else { adminHeight = 0; }
    	var mainContentHeight	= jQuery(window).height() - 15 - adminHeight;
    	
		jQuery('.gallery').galleryView({
			transition_speed: 800, 									//INT - duration of panel/frame transition (in milliseconds)
// 			transition_interval: 4000, 								//INT - delay between panel/frame transitions (in milliseconds)
// 			easing: 'easeInQuart',									//STRING - easing method to use for animations (jQuery provides 'swing' or 'linear', more available with jQuery UI or Easing plugin)
// 			show_panels: true, 										//BOOLEAN - flag to show or hide panel portion of gallery
// 			show_panel_nav: false, 									//BOOLEAN - flag to show or hide panel navigation buttons
// 			enable_overlays: true, 									//BOOLEAN - flag to show or hide panel overlays
			
			panel_width: Math.min(mainContentWidth, 1650),		//INT - width of gallery panel (in pixels)
			panel_height: Math.min(mainContentHeight - 85, 1098),	//INT - height of gallery panel (in pixels)
			panel_animation: 'crossfade',							//STRING - animation method for panel transitions (crossfade,fade,slide,none)
			panel_scale: 'fit', 									//STRING - cropping option for panel images (crop = scale image and fit to aspect ratio determined by panel_width and panel_height, fit = scale image and preserve original aspect ratio)
// 			overlay_position: 'bottom', 							//STRING - position of panel overlay (bottom, top)
// 			pan_images: true,										//BOOLEAN - flag to allow user to grab/drag oversized images within gallery
// 			pan_style: 'drag',										//STRING - panning method (drag = user clicks and drags image to pan, track = image automatically pans based on mouse position
// 			pan_smoothness: 15,										//INT - determines smoothness of tracking pan animation (higher number = smoother)
// 			start_frame: 1, 										//INT - index of panel/frame to show first when gallery loads
// 			show_filmstrip: true, 									//BOOLEAN - flag to show or hide filmstrip portion of gallery
			show_filmstrip_nav: false, 								//BOOLEAN - flag indicating whether to display navigation buttons
// 			enable_slideshow: false,								//BOOLEAN - flag indicating whether to display slideshow play/pause button
// 			autoplay: false,										//BOOLEAN - flag to start slideshow on gallery load
// 			show_captions: true, 									//BOOLEAN - flag to show or hide frame captions	
// 			filmstrip_size: 3, 										//INT - number of frames to show in filmstrip-only gallery
// 			filmstrip_style: 'scroll', 								//STRING - type of filmstrip to use (scroll = display one line of frames, scroll filmstrip if necessary, showall = display multiple rows of frames if necessary)
// 			filmstrip_position: 'bottom', 							//STRING - position of filmstrip within gallery (bottom, top, left, right)
			frame_width: 130, 										//INT - width of filmstrip frames (in pixels)
			frame_height: 70, 										//INT - width of filmstrip frames (in pixels)
// 			frame_opacity: 0.5, 									//FLOAT - transparency of non-active frames (1.0 = opaque, 0.0 = transparent)
// 			frame_scale: 'crop', 									//STRING - cropping option for filmstrip images (same as above)
// 			frame_gap: 5, 											//INT - spacing between frames within filmstrip (in pixels)
			show_infobar: true,										//BOOLEAN - flag to show or hide infobar
// 			infobar_opacity: 1										//FLOAT - transparency for info bar
		});


});