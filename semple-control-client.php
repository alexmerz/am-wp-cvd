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

add_action( 'admin_notices', function() {
    echo "<div class='notice notice-success is-dismissible'><p>Semple Control Client is active</p></div>";
} );