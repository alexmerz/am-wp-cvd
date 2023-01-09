<?php
/**
 * Author: Alexander Merz <alexander.merz@gmail.com>
 */
namespace AM_WP_CVD\Topics;

class Topics {
    public const css_path = 'app/cvd-topics/build/static/css/';
    public const js_path = 'app/cvd-topics/build/static/js/';

    public function __construct() {
        \add_action( 'admin_menu', [ $this, 'plugin_menu' ] );    
        \add_action( 'init', [ $this, 'create_topics_nonhierarchical_taxonomy' ], 0 );
        
        \add_filter( 'rest_post_query',[ $this, 'rest_post_query_notopics' ], 10, 2 );
    }

    /** 
     * If no_cd_topics=true is set in the request args, we add a condition to the 
     * request to only look for posts that do not have any topics.
     */
    public function rest_post_query_notopics( $args, $request ) {
        if ( 'true' === $request->get_param( 'no-cvd-topics' ) ) {
            if( !isset( $args['tax_query'] ) ) {
                $args['tax_query'] = [];
            }
            $args['tax_query'][] = [
                'taxonomy' => 'cvd-topics',
                'operator' => 'NOT EXISTS'
            ];
        }
        return $args;
    }

    public function plugin_menu() {
        \add_menu_page( 'CvD-Themen', 'CvD-Themen', 'edit_posts', 'topics', [$this, 'topics_page'], 'dashicons-admin-generic', 99 );
    }

    public function topics_page() {
        $css_files = \glob( \plugin_dir_path( __FILE__ ) . self::css_path . '*.css' );
        $js_files = \glob( \plugin_dir_path( __FILE__ ) . self::js_path . '*.js' );

        foreach ( $css_files as $css_file ) {
            $css_file = \plugin_dir_url( __FILE__ ) . self::css_path . \basename( $css_file );
            \wp_enqueue_style( 'cvd-topic-' . md5( $css_file ), $css_file, [], null);
        }

        foreach ( $js_files as $js_file ) {
            $handle = 'cvd-topic-' . md5( $js_file );
            $js_file = \plugin_dir_url( __FILE__ ) . self::js_path . \basename( $js_file );
            \wp_enqueue_script( $handle, $js_file, [], null, true );
        }      

        if( count( $js_files ) > 0 ) {
            $nonce = \wp_create_nonce( "wp_rest" );               
            \wp_add_inline_script( 'cvd-topic-' . md5( $js_files[0] ), 'document._cvd_topics = { "nonce" :  "' .  $nonce . '"}', 'before' );
        }                

        echo '<div id="root"></div>';        
    }

    public function create_topics_nonhierarchical_taxonomy() {  
        // Labels part for the GUI          
        $labels = array(
            'name' => "CvD-Themen",
            'singular_name' => "CvD-Thema",
            'search_items' =>  __( 'Search Topics' ),
            'popular_items' => __( 'Popular Topics' ),
            'all_items' => __( 'All Topics' ),
            'parent_item' => null,
            'parent_item_colon' => null,
            'edit_item' => __( 'Edit Topic' ), 
            'update_item' => __( 'Update Topic' ),
            'add_new_item' => __( 'Add New Topic' ),
            'new_item_name' => __( 'New Topic Name' ),
            // 'separate_items_with_commas' => __( 'Separate topics with commas' ),
            'add_or_remove_items' => __( 'Add or remove topics' ),
            'choose_from_most_used' => __( 'Choose from the most used topics' ),
            'menu_name' => 'CvD-Themen'
        ); 

        \register_taxonomy('cvd-topics', 'post', array(
            'hierarchical' => true,
            'labels' => $labels,
            'show_ui' => true,
            'show_in_rest' => true,
            'show_admin_column' => true,
            'show_in_quick_edit' => true,
            'update_count_callback' => '_update_post_term_count',
            'query_var' => true,
            'rewrite' => array( 'slug' => 'cvd-topic' ),
            'meta_box_cb' => 'post_categories_meta_box'
        ));        
    }
}
