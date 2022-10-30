<?php
/**
 * @package Semple_Control_Client
 * @version 0.0.1
 */
/*
Plugin Name: Semple Control Client
Plugin URI: https://github.com/alexmerz/semple-control-client
Description: Client part for the Semple Control Planel
Author: Alexander Merz
Version: 0.0.1
*/

namespace SempleControlClient;

require_once __DIR__ . '/includes/Plugins.php';

// We need to track which plugin we are no matter of naming
$plugin_data = \get_plugin_data( __FILE__ );
$semple_control_plugin_name = $plugin_data['Name'];

\add_action( 'rest_api_init', function () {
    \register_rest_route( 'semplecontrol/v1', '/plugins', array(
      'methods' => 'GET',
      'callback' => __NAMESPACE__ . '\get_plugins'
    ) );
  } );
  