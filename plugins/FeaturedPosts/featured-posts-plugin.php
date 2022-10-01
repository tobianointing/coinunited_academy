<?php
/**
* Plugin Name: Featured Posts
* Plugin URI: https://darp.coinunited.io/
* Description: Set a post as a featured post.
* Version: 0.1
* Author: WPGraphQL et Darphiz
* Author URI: https://github.com/darphiz
**/


add_action( 'init', function() {
   register_post_type( 'featured', [
      'show_ui' => true,
      'labels'  => [
        'menu_name' => __( 'Featured Post', 'your-textdomain' ),
      ],
      'show_in_graphql' => true,
      'hierarchical' => true,
      'graphql_single_name' => 'document',
      'graphql_plural_name' => 'documents',
   ] );
} );