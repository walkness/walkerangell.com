<?php

get_header(); 

$page = get_post( $post->ID );
?>

<div id="primary" class="content-area">
	<div id="content" class="site-content" role="main">
		<?php echo apply_filters( 'the_content', $page->post_content ); ?>
	</div><!-- #content -->
</div><!-- #primary -->

<?php
get_footer();
