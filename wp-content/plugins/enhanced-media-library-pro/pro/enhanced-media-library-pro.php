<?php

if ( is_admin() )
{
    include_once( 'core/bulk-edit.php' );
    include_once( 'core/options-pages.php' );
    include_once( 'core/update.php' );
}




/**
 *  wpuxss_eml_pro_admin_enqueue_scripts
 *
 *  @since    2.0
 *  @created  04/09/14
 */

add_action( 'admin_enqueue_scripts', 'wpuxss_eml_pro_admin_enqueue_scripts' );

function wpuxss_eml_pro_admin_enqueue_scripts() {
    
    global $wpuxss_eml_version,
           $wpuxss_eml_dir,
           $current_screen;
           
            
    $media_library_mode = get_user_option( 'media_library_mode', get_current_user_id() ) ? get_user_option( 'media_library_mode', get_current_user_id() ) : 'grid';

    
    if ( 'upload' === $current_screen->base && 'grid' === $media_library_mode ) {
        
        wp_dequeue_script( 'media' );
        wp_dequeue_script( 'wpuxss-eml-media-grid-script' );
        wp_enqueue_script(
            'wpuxss-eml-pro-media-grid-script',
            $wpuxss_eml_dir . 'pro/js/eml-media-grid.js',
            array( 'wpuxss-eml-media-models-script', 'wpuxss-eml-media-views-script' ),
            $wpuxss_eml_version,
            true
        );
    }


    if ( ( 'upload' === $current_screen->base && 'list' === $media_library_mode ) ||
         ( 'media' === $current_screen->base && 'add' === $current_screen->action ) )
    {
        wp_enqueue_media();
        
        if ( class_exists('acf') ) {

            add_action( 'admin_footer', 'wpuxss_eml_pro_admin_footer', 1 );
            do_action('acf/input/admin_enqueue_scripts');
        }
        
        wp_enqueue_script(
            'wpuxss-eml-pro-bulk-popup-script',
            $wpuxss_eml_dir . 'pro/js/eml-bulk-popup.js',
            array( 'wpuxss-eml-bulk-edit-script' ),
            $wpuxss_eml_version,
            true
        );
    }
    
    
    // admin styles
    wp_enqueue_style( 
        'wpuxss-eml-pro-admin-custom-style', 
        $wpuxss_eml_dir . 'pro/css/eml-pro-admin.css',
        false, 
        $wpuxss_eml_version,
        'all' 
    );
      
}


function wpuxss_eml_pro_admin_footer() {
                
    global $wp_version;
    
    $acf_version = get_option('acf_version');

    if ( version_compare( $acf_version, '5.0.0', '<' ) ) {

        $l10n = apply_filters( 'acf/input/admin_l10n', array(
            'core' => array(
                'expand_details' => __("Expand Details",'acf'),
                'collapse_details' => __("Collapse Details",'acf')
            ),
            'validation' => array(
                'error' => __("Validation Failed. One or more fields below are required.",'acf')
            )
        ));
    } else {

        $l10n = apply_filters( 'acf/input/admin_l10n', array(
            'unload'			=> __('The changes you made will be lost if you navigate away from this page','acf'),
            'expand_details' 	=> __('Expand Details','acf'),
            'collapse_details' 	=> __('Collapse Details','acf'),
        ));
    }
    
    $o = array(
        'post_id'		=> 0,
        'nonce'			=> wp_create_nonce( 'acf_nonce' ),
        'admin_url'		=> admin_url(),
        'ajaxurl'		=> admin_url( 'admin-ajax.php' ),
        'ajax'			=> 0,
        'validation'	=> 1,
        'wp_version'	=> $wp_version,
    );
    
    ?>
    <script type="text/javascript">
    (function($) {
    
        acf.o = <?php echo json_encode( $o ); ?>;
        acf.l10n = <?php echo json_encode( $l10n ); ?>;
    
    })(jQuery);	
    </script>
    <?php
}




/**
 *  wpuxss_eml_pro_enqueue_media
 *
 *  @since    2.0
 *  @created 04/09/14
 */
 
add_action( 'wp_enqueue_media', 'wpuxss_eml_pro_enqueue_media' );

function wpuxss_eml_pro_enqueue_media() 
{    

    global $wpuxss_eml_version,
           $wpuxss_eml_dir;
           
           
    if ( ! is_admin() ) {
        return;
    }


    wp_enqueue_script(
        'wpuxss-eml-bulk-edit-script',
        $wpuxss_eml_dir . 'pro/js/eml-bulk-edit.js',
        array( 'wpuxss-eml-media-models-script', 'wpuxss-eml-media-views-script' ),
        $wpuxss_eml_version,
        true
    );
    
    $bulk_edit_l10n = array(
        'toolTip_all' => __( 'ALL files belong to this item', 'eml' ),
        'toolTip_some' => __( 'SOME files belong to this item', 'eml' ),
        'toolTip_none' => __( 'NO files belong to this item', 'eml' ),
        'saveButton_success' => __( 'Changes saved.', 'eml' ),
        'saveButton_failure' => __( 'Something went wrong.', 'eml' ),
        'saveButton_text' => __( 'Save Changes', 'eml' ),
        'media_new_close' => __( 'Close', 'eml' ),
        'media_new_title' => __( 'Edit Media Files', 'eml' ),
        'media_new_button' => __( 'Bulk Edit', 'eml' ),
        
        'bulk_edit_nonce' => wp_create_nonce( 'eml-bulk-edit-nonce' ),
        'bulk_edit_save_button_off' => get_option('wpuxss_eml_pro_bulkedit_savebutton_off'),
    );
    
    wp_localize_script( 
        'wpuxss-eml-bulk-edit-script', 
        'wpuxss_eml_pro_bulk_edit_l10n',
        $bulk_edit_l10n
    );
}




/**
 *  wpuxss_eml_pro_on_activation
 *
 *  @since    2.0
 *  @created 14/11/14
 */
 
function wpuxss_eml_pro_on_activation() {
    
    $license_key = get_option( 'wpuxss_eml_pro_license_key', '' );
    $site_transient = get_site_transient('update_plugins');
    $plugin_basename = 'enhanced-media-library-pro/enhanced-media-library.php';
    $url = 'http://www.wpuxsolutions.com/downloads/plugins/enhanced-media-library-pro/';
    $args = array(
        'action' => 'update',
        'key' => $license_key
    );
    
    if ( ! empty( $license_key ) ) { 
        
        if ( isset( $site_transient->response[$plugin_basename] ) ) {
            $site_transient->response[$plugin_basename]->package = $url . '?' . build_query( $args );
        }
        
        if ( isset( $site_transient->no_update[$plugin_basename] ) ) {
            $site_transient->no_update[$plugin_basename]->package = $url . '?' . build_query( $args );
        }
        
    } else {
        
        if ( isset( $site_transient->response[$plugin_basename] ) ) {
            $site_transient->response[$plugin_basename]->package = '';
        }
        
        if ( isset( $site_transient->no_update[$plugin_basename] ) ) {
            $site_transient->no_update[$plugin_basename]->package = '';
        }
    }
    
    set_site_transient( 'update_plugins', $site_transient );
}




/**
 *  wpuxss_eml_pro_on_both_active
 *
 *  @since    2.0.4
 *  @created 28/12/15
 */
 
add_action( 'admin_init', 'wpuxss_eml_pro_on_both_active' );

function wpuxss_eml_pro_on_both_active() {
    
    $active_plugins = get_option( 'active_plugins' );
    
    if ( count( preg_grep("/enhanced-media-library/i", (array) $active_plugins) ) > 1 ) 
    {
        add_action( 'admin_notices', 'wpuxss_eml_pro_prevent_both_notice' );
    }
}




/**
 *  wpuxss_eml_pro_prevent_both_notice
 *
 *  @since    2.0.4
 *  @created 28/12/15
 */
 
function wpuxss_eml_pro_prevent_both_notice() { 

    echo '<div class="updated eml-admin-notice"><p>' . __( '<strong>Enhanced Media Library PRO</strong> does not require free version to be active. Please deactivate and remove the free version of the plugin.', 'eml' ) . '</p></div>';

}

?>