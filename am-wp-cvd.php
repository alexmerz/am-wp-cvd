<?php
/**
 * @package AM_WP_CVD
 * @wordpress-plugin
 * 
 * Plugin Name: Editor-in-chief Desk managing functions for WP
 * Description: Editor-in-chief Desk Functions
 * Author: Alexander Merz <alexander.merz@gmail.com>
 * Version: 1.0.0
 */

namespace AM_WP_CVD;

define( 'AM_WP_CVD', '1.0.0' );

// load language files
\add_action( 'init', function() {    
    $s =  \load_plugin_textdomain( 'am-wp-cvd', false, dirname( \plugin_basename( __FILE__ ) ) . '/languages' );
});

require __DIR__ . '/cvd-topics/Topics.php';

new \AM_WP_CVD\Topics\Topics();


