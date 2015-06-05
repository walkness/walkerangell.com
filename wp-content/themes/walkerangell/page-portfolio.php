<?php
/*
Template Name: Portfolio Page
*/

get_header(); 

$page = get_post( $post->ID );

// Remove <p> tags from content
remove_filter('the_content', 'wpautop');
?>

<div id="primary" class="content-area">
	<div id="content" class="site-content" role="main">
		<?php echo apply_filters( 'the_content', $page->post_content ); ?>
	</div><!-- #content -->
</div><!-- #primary -->

<?php
get_footer();
