<?php
/*
Plugin Name: AWS S3 Extras
Plugin URI: http://walkandalie.com/
Description: Extra functionality for using AWS S3, including checking for availability of objects in S3.
Version: 1.0
Author: Walker Angell
Author URI: http://walkerangell.com/
*/




function s3tools_init() {
	
	global $s3tools;
	
	$abspath = dirname( __FILE__ );
	require_once $abspath . '/s3tools.class.php';
	
	$s3tools = new s3tools();
	
	do_action( 's3tools_init' );
	
}
add_action( 'aws_init', 's3tools_init' );