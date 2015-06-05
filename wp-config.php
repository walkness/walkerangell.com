<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'walkerangell');

/** MySQL database username */
define('DB_USER', 'Kt}Z]rjM3F#6s3e');

/** MySQL database password */
define('DB_PASSWORD', 'qgWP(JVzF.qyREhZ2$N3eiuX4');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'KRh<?i1Em@?V|drujfPrXcl+lL[H0M;#a:+%a%|.5wnT,iQ]x|/r__,#hbBuamDP');
define('SECURE_AUTH_KEY',  '*-3W!{u)z--s*tUJ2hCuO#Jk+]:QoL_ /Sxvnsu-+5KnS51&sSnJL J%M/=>$-$V');
define('LOGGED_IN_KEY',    'Kwz`lv=^)raE[e$5w-jv_+89Qqk0R#~Y1YIke~GqnL)8z9~%B-Ff{v<xN=IAwX>|');
define('NONCE_KEY',        '|s I/Cs}>/gs3/-Mi1*-gh?bcOS}pSA4^v_1sSDv?a7VcRY#R3S*zH JJ,U%}?|K');
define('AUTH_SALT',        'IhID;Tx6*pUYN3Ya1cNk1yQzV_LA336k,D =/}^m[7f<a{7/hPHRJd)Zm##^R7DG');
define('SECURE_AUTH_SALT', ',/0.a8C}#2@[b=Hsv}}-;CeIS<1@2&/2uJKOR~qFnJ>0xuMQ+oG:hUUmx=N$$MVR');
define('LOGGED_IN_SALT',   'B%b!+gHY?e%I:O$$0}J}#c(;T*o,GMyYh_%#|5[h=#mN[[vRweQ;[-snqP-Fr{ce');
define('NONCE_SALT',       'k=0y|%M9g$u00n7R|))B:@UAM{NPNUj/Dwh.!A8|uh=w&H]`]q%E-Y+H-q;aU7ye');
/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

define( 'AWS_ACCESS_KEY_ID', 'AKIAJMF4KFQPBJQRJOTA' );
define( 'AWS_SECRET_ACCESS_KEY', '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' );
