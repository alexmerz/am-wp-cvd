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

$config = array(
  'dir'         => plugin_dir_path( __FILE__ ),  
  'plugin_name' => 'Semple Control Client',
  'api_route'   => 'semplecontrol/v1'
);

require_once $config['dir'] . '/includes/Plugins.php';

// We need to track which plugin we are no matter of the naming
$plugin_data = \get_plugin_data( __FILE__ );
$config['plugin_name'] = $plugin_data['Name'];

\add_action( 'rest_api_init', function () use ( $config ) {
    \register_rest_route( $config['api_route'], '/plugins', array(
      'methods' => 'GET',
      'callback' => function() use ( $config ) {
          return get_plugins($config);
        }
    ) );
  } );
  