<?php

namespace SempleControlClient;

if ( ! function_exists( '\get_plugins' ) ) {
	require_once ABSPATH . 'wp-admin/includes/plugin.php';
}

function get_plugins() {
    $plugins = \get_plugins();
    foreach( $plugins as $key => $plugin ) {
        $plugins[$key]['__SEMPLECONTROL'] = false;
        if ( $plugin['Name'] == $GLOBALS['semple_control_plugin_name'] ) {
            $plugins[$key]['__SEMPLECONTROL'] = true;
        }
    }
    return $plugins;
}
