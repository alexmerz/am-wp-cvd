<?php
/**
 * @package AM_WP_CVD
 * @wordpress-plugin
 * 
 * Plugin Name: CvD managing functions for WP
 * Description: CvD Functions
 * Author: Alexander Merz <alexander.merz@gmail.com>
 * Version: 1.0.0
 */
define( 'AM_WP_CVD', '1.0.0' );

require __DIR__ . '/cvd-topics/Topics.php';

new \AM_WP_CVD\Topics\Topics();
