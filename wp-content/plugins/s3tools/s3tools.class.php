<?php

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;

class s3tools {

	/*private static $instance = null;
	
	public static function getInstance() {
		if( self::$instance == null )
			self::$instance = new self();
		return self::$instance;
	}*/

	function __construct() {
		$this->bucket = 'walkerangell.com';
		$this->guid_uri = 'http://walkerangell.com/';
		
		add_action( 'admin_menu', array( $this, 'register_s3tools_page' ) );
	}
	
	function get_s3client() {
		if( is_null( $this->s3client ) ) {
		
			$this->s3client = S3Client::factory(array(
				'key' 		=> 'AKIAINGT5HG4UWCF36NA',
				'secret' 	=> '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',
			));
		
		}
		
		return $this->s3client;
	}
	
	
	function get_s3objects() {
		if( is_null( $this->s3objects ) ) {
			$this->s3objects = $this->get_s3client()->getIterator('ListObjects', array( 'Bucket' => $this->bucket ));
		}
		
		return $this->s3objects;
	}
	
	
	function get_s3object_keys() {
		
		if( is_null( $this->s3object_keys ) ) {
			$objectKeys = array();
			foreach( $this->get_s3objects() as $object ) {
				$objectKeys[] = $object['Key'];
			}
			$this->s3object_keys = $objectKeys;
		}
		return $this->s3object_keys;
	}
	
	
	function write_s3object_keys() {

		$text = implode( "\n", $this->get_s3object_keys() );
		
		return file_put_contents( dirname( __FILE__ ) . '/s3objects.txt', $text);
	}
	
	
	public function save_s3_image( $path ) {
		
		$s3key = $this->translate_to_key( $path );
		
		//$this->s3tools_log( 'INFO: save_s3_image: ' . print_r( $s3key, true ) );
		
		if( is_null( $s3key ) ) {
			$this->s3tools_log( 'ERROR: save_s3_image: URI passed, expecting filesystem path ' . $s3key['path'] );
			return $s3key['path'];
		}
		
		//$this->s3tools_log( 'INFO: save_s3_image: ' . $s3key['path'] );
		
		$dir = dirname( $s3key['path'] );
		if( ! file_exists( $dir ) )
			mkdir( $dir, 0775, true );
		
		try {
			$result = $this->get_s3client()->getObject(array(
				'Bucket' 	=> $this->bucket,
				'Key'		=> $s3key['key'],
				'SaveAs'	=> $s3key['path']
			));
		} catch (S3Exception $e) {
			$this->s3tools_log( 'ERROR: save_s3_image: Unable to download file to ' . $s3key['path'] . ' the message was ' . $e->getMessage() );
		}
		
		$path = $result['Body']->getUri();
		
		chmod( $path, 0744 );
		
		$this->s3tools_log( 'INFO: save_s3_image: Successfully downloaded file to ' . $path );
		
		return $path;
	}
	

	function get_all_posts() {
		
		if( is_null( $this->posts ) ) {
			$query_args = array(
				'post_type'			=> 'post',
				'post_status'		=> 'publish',
				'posts_per_page'	=> -1
			);
			
			$query = new WP_Query( $query_args );
			$this->posts = $query->posts;
		}
		
		return $this->posts;
	}
	
	function get_all_thumbnails() {
		
		if( is_null( $this->thumbnails ) ) {
			global $wpdb;
			
			$query = '
				SELECT `wp_postmeta`.`post_id` AS "post_id", `wp_postmeta`.`meta_value` AS "image_id", `wp_posts`.`guid` AS "image_path" 
				FROM `wp_postmeta` 
				LEFT JOIN `wp_posts` ON `wp_postmeta`.`meta_value` = `wp_posts`.`ID` 
				WHERE `meta_key` = "_thumbnail_id";
			';
			
			$this->thumbnails = $wpdb->get_results( $query );
		}
		
		return $this->thumbnails;
	}
	
	function serialize_thumbnails( $needle = "%2C" ) {
		
		$images = $this->get_all_thumbnails();
		
		$image_paths = array();
		
		foreach( $images as $image ) {
			
			$image_paths[] = $image->image_id;
			
		}
		
		return implode( $needle, $image_paths );
		
	}

	
	function get_all_images() {
		
		if( is_null( $this->images ) ) {
			$query_args = array(
				'post_type' 		=> 'attachment',
				'post_mime_type' 	=> 'image',
				'post_status' 		=> 'inherit',
				'posts_per_page' 	=> -1
			);
			
			$query = new WP_Query( $query_args );
			$this->images = $query->posts;
		}	
		
		return $this->images;
	}
	
	function get_all_images_translated() {
		
		
		$images = array();
		foreach( $this->get_all_images() as $image ) {
			$images[] = $this->translate_guid_to_key( $image->guid );
		}
		
		return $images;
	}
	
	
	function s3_generate_thumbnails( $id, $path ) {
		
		$file = $this->save_s3_image( $path );
		
		$data = wp_generate_attachment_metadata( $id, $file );
		
		wp_update_attachment_metadata( $id, $data );
		
		return true;
		
	}
	
	
	function s3_regenerate_all_featured_images() {
		
		$images = $this->get_all_thumbnails();
		
		$i = 0;
		
		foreach( $images as $image ) {
			
			if( $this->s3_generate_thumbnails( $image->image_id, $image->image_path ) === true )
				$i++;
			
		}
		
		return $i;
	}
	
	
	function get_image_sizes( $size = '' ) {
		
		if( is_null( $this->image_sizes ) ) {
		
	        global $_wp_additional_image_sizes;
	
	        $sizes = array();
	        $get_intermediate_image_sizes = get_intermediate_image_sizes();
	
	        // Create the full array with sizes and crop info
	        foreach( $get_intermediate_image_sizes as $_size ) {
	
	                if ( in_array( $_size, array( 'thumbnail', 'medium', 'large' ) ) ) {
	
	                        $sizes[ $_size ]['width'] = get_option( $_size . '_size_w' );
	                        $sizes[ $_size ]['height'] = get_option( $_size . '_size_h' );
	                        $sizes[ $_size ]['crop'] = (bool) get_option( $_size . '_crop' );
	
	                } elseif ( isset( $_wp_additional_image_sizes[ $_size ] ) ) {
	
	                        $sizes[ $_size ] = array( 
	                                'width' => $_wp_additional_image_sizes[ $_size ]['width'],
	                                'height' => $_wp_additional_image_sizes[ $_size ]['height'],
	                                'crop' =>  $_wp_additional_image_sizes[ $_size ]['crop']
	                        );
	
	                }
	
	        }
	
	        // Get only 1 size if found
	        if ( $size ) {
	
	                if( isset( $sizes[ $size ] ) ) {
	                        return $sizes[ $size ];
	                } else {
	                        return false;
	                }
	
	        }
	        
	        $this->image_sizes = $sizes;
        
        }
		
        return $this->image_sizes;
	}
	
	function check_s3() {
		
		return array_diff($this->get_all_images_translated(), $this->get_s3object_keys());
		
	}
	
	function translate_guid_to_key( $guid ) {
		$len = strlen( $this->guid_uri );
		
		return substr($guid, $len);
	}
	
	function translate_to_key( $path ) {
		
		$isuri = parse_url( $path );
		$homepath = get_home_path();
		
		if( $isuri['scheme'] == '' || is_null( $isuri['scheme'] ) ) {
			$homepath = get_home_path();
			$len = strlen( $homepath );
			
			$key = substr($path, $len);
			
			return array( "key" => $key, "path" => $path );
		} else {
			$key = substr( $isuri['path'], 1 );
			$path = $homepath . $key;
			
			return array( "key" => $key, "path" => $path );
		}
		
	}
	
	
	function register_s3tools_page() {
		add_submenu_page(
			'tools.php',
			'S3 Tools',
			'AWS S3 Tools',
			'manage_options',
			's3tools',
			array( $this, 'render_s3tools_page' )
		);
	}
		
	
	function render_s3tools_page() { ?>
		<h2>Amazon Web Services S3 Tools</h2>
		
		<pre><?php
		//print_r( $this->s3_regenerate_all_featured_images() ); 
		//print_r( $this->serialize_thumbnails() ); ?>
		</pre><?php
			
		//print_r( $this->save_s3_image( '/var/www/walkandalie.com/public_html/wp-content/uploads/2010/12/DSC_8792.jpg' ) );
		//wp_redirect( add_query_arg( '_wpnonce', wp_create_nonce( 'regenerate-thumbnails' ), admin_url( 'tools.php?page=regenerate-thumbnails&goback=1&ids=' . $this->serialize_thumbnails(',') ) ) );
				
		if( ! empty( $_POST['update-retina-s3'] ) ) {
			$this->write_s3object_keys();
			echo 'The S3 Retina inventory has been updated successfully!';
		} ?>
		
		<form method="post" action="">
			<?php wp_nonce_field( 'update-retina-s3' ); ?>
			<p><input class="button" type="submit" name="update-retina-s3" id="update-retina-s3" value="Update Retina S3 Catalog" /></p>
		</form><?php
			
		if( ! empty( $_POST['compare-s3'] ) ) { ?>
			<pre>
				<?php print_r( $this->check_s3() ); ?>
			</pre><?php
		} ?>
		
		<form method="post" action="">
			<?php wp_nonce_field( 'compare_s3' ); ?>
			<p><input class="button" type="submit" name="compare-s3" id="compare-s3" value="Compare Media Library and S3" /></p>
		</form><?php

		if( ! empty( $_POST['s3-regenerate-featured-images'] ) ) { ?>
			<pre>
				<?php print '<a target="_blank" href="' . admin_url( 'tools.php?page=regenerate-thumbnails&goback=1&ids=' . $this->serialize_thumbnails('%2C') . '_wpnonce=' . wp_create_nonce( 'regenerate-thumbnails' ) ) . '">Click Here</a>'; ?>
			</pre><?php
		} ?>
		
		<form method="post" action="">
			<?php wp_nonce_field( 's3-regenerate-featured-images' ); ?>
			<p><input class="button" type="submit" name="s3-regenerate-featured-images" id="s3-regenerate-featured-images" value="Regenerate All Featured Image Thumbnails" /></p>
		</form><?php			
		
	}
	
	function s3tools_log( $msg ) {
		$path = __DIR__ . '/s3tools.log';
		
		$content = file_get_contents( $path );
		
		$content .= date( 'c', time() ) . ' ' . $msg . "\n";
		
		file_put_contents( $path, $content );
	}

}
