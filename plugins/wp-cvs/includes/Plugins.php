<?php

namespace SempleControlClient;

if ( ! function_exists( '\get_plugins' ) ) {
	require_once ABSPATH . 'wp-admin/includes/plugin.php';
}

function get_plugins($plugin_config) {
    $plugins = \get_plugins();
    foreach( $plugins as $key => $plugin ) {
        $plugins[$key]['__SEMPLECONTROL'] = false;
        if ( $plugin['Name'] == $plugin_config['plugin_name'] ) {
            $plugins[$key]['__SEMPLECONTROL'] = true;
        }
    }
    return $plugins;
}
