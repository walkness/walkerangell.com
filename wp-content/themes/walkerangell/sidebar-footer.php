<?php
/**
 * The Footer Sidebar
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

if ( ! is_active_sidebar( 'footer' ) ) {
	return;
}
?>

<div id="supplementary">
	<div id="footer-content" class="footer-content widget-area" role="complementary">
		<?php dynamic_sidebar( 'footer' ); ?>
	</div><!-- #footer-sidebar -->
</div><!-- #supplementary -->
