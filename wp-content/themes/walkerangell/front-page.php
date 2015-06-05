<?php

get_header(); 

$page = get_post( $post->ID );
$front = $_SERVER['REQUEST_URI'] == "/" ? TRUE : FALSE;
?>

<div id="primary" class="content-area">
	<div id="content" class="site-content" role="main">
		<?php if($front): ?>
			<?php echo apply_filters( 'the_content', $page->post_content ); ?>
		<?php endif; ?>
	</div><!-- #content -->
</div><!-- #primary -->

<?php
get_footer();
