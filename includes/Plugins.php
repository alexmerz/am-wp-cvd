<?php

namespace SempleControlClient;

if ( ! function_exists( 'get_plugins' ) ) {
	require_once ABSPATH . 'wp-admin/includes/plugin.php';
}

function get_plugins() {
    return \get_plugins();
}
