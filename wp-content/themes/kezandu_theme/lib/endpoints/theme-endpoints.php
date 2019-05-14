<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'Wp_React_Endpoint' ) ) :

	class Wp_React_Endpoint {
		function __construct() {
		}

		function init() {
			add_action( 'rest_api_init', function () {
				$namespace = 'react-theme/v1';
				register_rest_route( $namespace, '/acf', array(
					'methods'  => 'POST',
					'callback' => [ $this, 'custom_fields_data' ],
				) );
				register_rest_route( $namespace, '/healthmakers', array(
					'methods'  => 'GET',
					'callback' => [ $this, 'healthmakers' ],
				) );
				register_rest_route( $namespace, '/entry-box', array(
					'methods'  => 'GET',
					'callback' => [ $this, 'entry_box_data' ],
				) );
				register_rest_route( $namespace, '/experiences', array(
					'methods'  => 'GET',
					'callback' => [ $this, 'experiences_data' ],
				) );
				register_rest_route( $namespace, '/entry-box-item', array(
					'methods'  => 'GET',
					'callback' => [ $this, 'entry_box_data_item' ],
				) );
				register_rest_route( $namespace, '/theme-option', array(
					'methods'  => 'POST',
					'callback' => [ $this, 'theme_option_data' ],
				) );
				register_rest_route( $namespace, '/accordion-faq', array(
					'methods'  => 'GET',
					'callback' => [ $this, 'accordion_faq_data' ],
				) );
				register_rest_route( $namespace, '/accordion-rewards', array(
					'methods'  => 'GET',
					'callback' => [ $this, 'accordion_rewards_data' ],
				) );
				register_rest_route($namespace, '/login', array(
					'methods' => WP_REST_Server::CREATABLE,
					'callback' => [ $this, 'customer_login' ],
				));
				register_rest_route( $namespace, '/customer/update', array(
					'methods'  => WP_REST_Server::CREATABLE,
					'callback' => [ $this, 'customer_update' ],
				) );
				register_rest_route( $namespace, '/customer/alternative-password-change', array(
					'methods'  => WP_REST_Server::CREATABLE,
					'callback' => [ $this, 'alternative_password_change' ],
				) );
				register_rest_route( $namespace, '/customer/register', array(
					'methods' => WP_REST_Server::CREATABLE,
					'callback' => [ $this, 'customer_register' ],
				));
				register_rest_route( $namespace, '/customer/info', array(
					'methods'  => 'POST',
					'callback' => [ $this, 'customer_info' ],
				) );
				register_rest_route( $namespace, '/customer/logout', array(
					'methods' => 'GET',
					'callback' => [ $this, 'customer_logout' ],
				));
				register_rest_route( $namespace, '/customer', array(
					'methods'  => 'POST',
					'callback' => [ $this, 'customer_data' ],
				) );
				register_rest_route($namespace, '/lost-password', array(
					'methods'  => 'POST',
					'callback' => [ $this, 'lost_password' ],
				));
				register_rest_route($namespace, '/lost-password/confirmation', array(
					'methods'  => 'POST',
					'callback' => [ $this, 'lost_password_confirmation' ],
				));
				register_rest_route($namespace, '/change-password', array(
					'methods'  => 'POST',
					'callback' => [ $this, 'change_password' ],
				));
				register_rest_route($namespace, '/sending-informative-mail', array(
					'methods'  => 'POST',
					'callback' => [ $this, 'sending_informative_mail' ],
				));
				register_rest_route($namespace, '/mail-verification', array(
					'methods'  => 'POST',
					'callback' => [ $this, 'mail_verification' ],
				));
				register_rest_route($namespace, '/donation-record', array(
					'methods'  => 'POST',
					'callback' => [ $this, 'donation_record' ],
				));
				register_rest_route($namespace, '/alternative-entry', array(
					'methods'  => 'POST',
					'callback' => [ $this, 'alternative_entry' ],
				));
				register_rest_route($namespace, '/facebook-login', array(
					'methods'  => 'POST',
					'callback' => [ $this, 'facebook_login' ],
				));
				register_rest_route($namespace, '/no-password', array(
					'methods'  => 'POST',
					'callback' => [ $this, 'no_password' ],
				));
				register_rest_route($namespace, '/no-password-confirmation', array(
					'methods'  => 'POST',
					'callback' => [ $this, 'no_password_confirmation' ],
				));
			} );
		}

		/**
		 * @param $data
		 *
		 * @return WP_Error|WP_REST_Response
		 */
		function custom_fields_data($request) {
			$params = $request->get_params();
			$post_ids = $params['id'];
			$pages = $params['pages'];

			if (function_exists('get_fields')) {
				if (!is_array($post_ids)) {
					$post_ids = array($post_ids);
				}
				
				foreach ($post_ids as $key => $id) {
					$acf = get_fields($id);

					$publication_start_date = get_post_meta($id, 'publication_start_date', true);
					$publication_start_time = get_post_meta($id, 'publication_start_time', true);
					$publication_end_date = get_post_meta($id, 'publication_end_date', true);
					$publication_end_time = get_post_meta($id, 'publication_end_time', true);
					if ($publication_end_date and $publication_end_time and $publication_start_date) {
						$date_end = $publication_end_date . ' ' . $publication_end_time;
						$date_start = $publication_start_date . ' ' . $publication_start_time;
						$acf['counterdown_date_end'] = $date_end;
					
						$acf['counterdown_date_start'] = $date_start; 
					}

					if ($acf) {
						if ($pages != 'false') {
							$pages[$id] = $acf;
						} else {
							$pages = [$id => $acf];
						}
					}
				}

				return $pages;

			}
			if ($pages != 'false') {
				return $pages;
			}
			return false;
		}

		function entry_box_data($request) {

			$posts = get_posts(array(
				'post_type' => 'entry-box',
				'posts_per_page' => -1,
				'order' => 'ASC'
			));

			$entry = array();

			$last_id = 0;

			foreach ($posts as $key => $post) {

				$number_of_entries = get_field('number_of_entries', $post->ID);
				$price = get_field('price', $post->ID);
				$description = get_field('description', $post->ID);

				$last_id = $post->ID;

				$entry[] = array(
					'id' => $post->ID,
					'title' => $post->post_title,
					'entries' => number_format($number_of_entries, 0, '.', ','),
					'realentries' => $number_of_entries,
					'price' => number_format($price, 0, '.', ','),
					'realprice' => $price,
					'description' => $description,
				);

			}
			
			return array(0 => $entry, 'lastId' => $last_id, 'length' => true );
		}

		function experiences_data($request) {

			$templates_experiences = get_field_option("pw_experiences");
			$templates = array('relation' => 'OR');
			$date = date_i18n("YmdHi");

			$date_explode = explode(" , ", date_i18n("Y , m , d , H , i"));
			$current_date = array(
				'year' => intval($date_explode[0]),
				'month' => intval($date_explode[1]),
				'day' => intval($date_explode[2]),
				'hour' => intval($date_explode[3]),
				'minute' => intval($date_explode[4]),
			);

			foreach ($templates_experiences as $value) {
				$templates[] = array(
						'key' => '_wp_page_template',
						'value' => $value,
						'compare' => '==',
					);
			}

			if ($request['status'] == 'inactive') {
				$meta_query = array(
					'relation' => 'AND',
					array(
						'key' => 'publication_end_date_value',
						'value' => $date,
						'compare' => '<',
						'meta_type' => 'BIGINT',
					),
					$templates,
				);
			} else if ($request['status'] == 'active') {
				$meta_query = array(
					'relation' => 'AND',
					array(
						'key' => 'publication_start_date_value',
						'value' => $date,
						'compare' => '<=',
						'meta_type' => 'BIGINT',
					),
					array(
						'key' => 'publication_end_date_value',
						'value' => $date,
						'compare' => '>=',
						'meta_type' => 'BIGINT',
					),
					$templates,
				);
			} else {
				$meta_query = array(
					'relation' => 'AND',
					array(
						'key' => 'publication_start_date_value',
						'value' => $date,
						'compare' => '<=',
						'meta_type' => 'BIGINT',
					),
					$templates,
				);
			}

			$args = array(
				'posts_per_page' => $request["quantity"] ? $request["quantity"] : -1,
				'orderby' => 'publication_start_date_value',
				'order' => $request["order"] and $request["order"] == "ASC" ? "ASC" : "DESC",
				'post_status' => 'publish',
				'post_type' => 'page',
				'paged' => $request["paged"] ? $request["paged"] : 1,
				'meta_query' => $meta_query,
			);

			$query_posts = new WP_Query($args);

			$experiences = array();
		
			if ($query_posts->posts) {
				foreach ($query_posts->posts as $key => $post) {

					$publication_start = explode(" , ", get_post_meta($post->ID, 'publication_start', true));
					$publication_start_date = array(
						'year' => intval($publication_start[0]),
						'month' => intval($publication_start[1]),
						'day' => intval($publication_start[2]),
						'hour' => intval($publication_start[3]),
						'minute' => intval($publication_start[4]),
					);

					$publication_end = explode(" , ", get_post_meta($post->ID, 'publication_end', true));
					$publication_end_date = array(
						'year' => intval($publication_end[0]),
						'month' => intval($publication_end[1]),
						'day' => intval($publication_end[2]),
						'hour' => intval($publication_end[3]),
						'minute' => intval($publication_end[4]),
					);

					$experiences[] = array(
						'id' => $post->ID,
						'name' => get_field('experience_name', $post->ID),
						'description' => strip_tags(get_field('title_sect1', $post->ID)),
						'image' => get_field('background_image_sect1', $post->ID),
						'color' => get_field('button_color', $post->ID),
						'url' => '/' . $post->post_name,
						'start_date' => $publication_start_date,
						'end_date' => $publication_end_date,
					);
				}

				return array(
					'items' => $experiences,
					'date' => $current_date,
					'paged' => intval($request["paged"] ? $request["paged"] : 1),
					'post_count' => intval($query_posts->post_count),
					'found_posts' => intval($query_posts->found_posts),
					'max_num_pages' => intval($query_posts->max_num_pages),
				);
			}

			return array(
				'items' => $experiences,
				'date' => $current_date,
				'paged' => intval($request["paged"] ? $request["paged"] : 1),
				'post_count' =>  0,
				'found_posts' => 0,
				'max_num_pages' => 0,
			);
		}

		function healthmakers($request) {

			$posts = get_posts(array(
				'post_type' => 'healthmakers',
				'posts_per_page' => -1,
				'order' => 'DESC'
			));

			$healthmakers = array();

			foreach ($posts as $key => $post) {
				$description = get_field('description', $post->ID);
				$image = get_field('image', $post->ID);

				$last_id = $post->ID;

				$healthmakers[] = array(
					'id' => $post->ID,
					'title' => $post->post_title,
					'image' => $image,
					'description' => $description,
					'url' => '/healthmakers/' . $post->post_name,
				);

			}
			
			return ['items' => $healthmakers, 'buttonUrl' => '#'];
		}

		function entry_box_data_item($request) {
			$params = $request->get_params();
			$id = (int)$params['id'];

			$post = get_post($id);

			$entry = array();

			

				$number_of_entries = get_field('number_of_entries', $post->ID);
				$price = get_field('price', $post->ID);
				$description = get_field('description', $post->ID);

				$entry = array(
					'id' => $post->ID,
					'title' => $post->post_title,
					'entries' => number_format($number_of_entries, 0, '.', ','),
					'realentries' => $number_of_entries,
					'realprice' => $price,
					'price' => number_format($price, 0, '.', ','),
					'description' => $description
				);

			
			
			return $entry;
		}

		function theme_option_data($request) {
			$params = $request->get_params();

			$theme = array();
			if ($params['options']) {
				foreach ($params['options'] as $value) {
					$theme[$value] =  get_field_option($value, null);
				}
			}
			
			return $theme;
		}

		function accordion_faq_data($request) {

			$posts = get_posts(array(
				'post_type' => 'accordion-faq',
				'posts_per_page' => -1,
				'order' => 'DESC'
			));

			$faq = array();

			foreach ($posts as $key => $post) {

				$text_content = get_field('text_content', $post->ID);

				$faq[] = array(
					'id' => $post->ID,
					'title' => $post->post_title,
					'text_content' => $text_content,
				);

			}

			return $faq;
		}

		function accordion_rewards_data($request) {

			$posts = get_posts(array(
				'post_type' => 'accordion-rewards',
				'posts_per_page' => -1,
				'order' => 'DESC'
			));

			$rewards = array();

			foreach ($posts as $key => $post) {

				$text_content = get_field('text_content', $post->ID);

				$rewards[] = array(
					'id' => $post->ID,
					'title' => $post->post_title,
					'text_content' => $text_content,
				);

			}

			return $rewards;
		}

		function customer_login($request) {

			$params = $request->get_params();

			$date = date_i18n("Y-m-d H:i:s");

			if (isset($params['user']) and $params['user'] != '' and isset($params['password']) and $params['password'] != '') {
				
				$user = get_user_by('email', $params['user']);
				if ($user == false) {
					return array(
						'id' => 0,
						'email' => $params['user'],
						'first_name' => '',
						'last_name' => '',
						'display_name' => '',
						'message' => 'error, invalid email address',
						'date' => $date,
						'status' => 405
					);
				}

				if ($params['password'] == 'mailVerification') {
					return array(
						'id' => 0,
						'email' => $params['user'],
						'first_name' => '',
						'last_name' => '',
						'display_name' => '',
						'message' => 'successfulEmail',
						'date' => $date,
						'status' => 200
					);
				}

				$creds = array(
					'user_login' => $params['user'],
					'user_password' => $params['password'],
					'remember' => true
				);
				$user = wp_signon($creds, false);

				if (is_wp_error($user)) {
					return array(
						'id' => 0,
						'email' => $params['user'],
						'first_name' => '',
						'last_name' => '',
						'display_name' => '',
						'message' => 'error, the user could not log in',
						'date' => $date,
						'status' => 405
					);
				}

				$display_name = isset($user->data->display_name) ? $user->data->display_name : '';
				$display_name = string_before('@', $display_name);

				return array(
					'id' => isset($user->ID) ? $user->ID : 0,
					'first_name' => isset($user->first_name) ? $user->first_name : '',
					'last_name' => isset($user->last_name) ? $user->last_name : '',
					'display_name' => $display_name,
					'email' => isset($user->data->user_email) ? $user->data->user_email : '',
					'message' => 'login',
					'date' => $date,
					'status' =>  200
				);
			}
			return array(
				'id' => 0,
				'email' => $params['user'],
				'first_name' => '',
				'last_name' => '',
				'display_name' => '',
				'message' => 'error, there is no user parameter or password',
				'date' => $date,
				'status' => 405
			);
		}

		function customer_data($request) {
			$params = $request->get_params();
			$user_decode = $params['id'] ? id_user_decode($params['id']) : array(0, 0); 
			$id = (isset($user_decode[1]) and $user_decode) ? $user_decode[1] : 0;
			$user = get_user_by('id', $id);

			if ($user_decode[0]) {
				return array(
					'id' => 0,
					'first_name' => '',
					'last_name' => '',
					'display_name' => '',
					'email' => '',
					'message' => 'data',
					'status' => 301
				);
			}

			$display_name = isset($user->data->display_name) ? $user->data->display_name : '';
			$display_name = string_before('@', $display_name);

			return array(
				'id' => isset($user->ID) ? $user->ID : 0 ,
				'first_name' => isset($user->first_name) ? $user->first_name : '' ,
				'last_name' => isset($user->last_name) ? $user->last_name : '' ,
				'display_name' => $display_name,
				'email' => isset($user->data->user_email) ? $user->data->user_email : '' ,
				'message' => 'data',
				'status' => 200
			);
		}

		function customer_info($request) {
			$params = $request->get_params();

			$id = $params['id'] ? $params['id'] : 0; 
			$user = get_user_by('id', $id);

			$email = $params['email'] ? $params['email'] : 'none'; 
			
			if ($user->data->user_email == $params['email'] and $user) {

				$answer = array();

				if ($params['info'] == 'shipping') {
					$answer = array(
						'id' => isset($user->ID) ? $user->ID : 0,
						'country' => isset($user->shipping_country) ? $user->shipping_country : '',
						'city' => isset($user->shipping_city) ? $user->shipping_city : '',
						'zip_code' => isset($user->shipping_zip_code) ? $user->shipping_zip_code : '',
						'address' => isset($user->shipping_address) ? $user->shipping_address : '',		
						'status' => 200
					);
				} else if ($params['info'] == 'billing') {
					$answer = array(
						'id' => isset($user->ID) ? $user->ID : 0,
						'card_number' => isset($user->billing_card_number) ? $user->billing_card_number : '',
						'expiration_date' => isset($user->billing_expiration_date) ? $user->billing_expiration_date : '',
						'zip_code' => isset($user->billing_zip_code) ? $user->billing_zip_code : '',		
						'status' => 200
					);
				} else {
					$answer = array(
						'id' => isset($user->ID) ? $user->ID : 0,
						'first_name' => isset($user->first_name) ? $user->first_name : '',
						'last_name' => isset($user->last_name) ? $user->last_name : '',
						'email' => isset($user->user_email) ? $user->user_email : '',
						'date_of_birth' => isset($user->info_date_of_birth) ? $user->info_date_of_birth : '',
						'phone_number' => isset($user->info_phone_number) ? $user->info_phone_number : '',
						'country' => isset($user->info_country) ? $user->info_country : '',
						'billing_zip' => isset($user->billing_zip_code) ? $user->billing_zip_code : '',	
						'status' => 200
					);
				}

				return $answer;

			}

			return array(
				'message' => 'error, data',
				'id' => 0,
				'first_name' => '',
				'last_name' => '',
				'email' => '',
				'country' => '',
				'city' => '',
				'zip_code' => '',
				'address' => '',
				'card_number' => '',
				'expiration_date' => '',
				'date_of_birth' => '',
				'phone_number' => '',
				'status' => 405,
			);

		}
		
		public function customer_update($request) {
			$params = $request->get_params();

			$id = $params['id'] ? $params['id'] : 0; 
			$user = get_user_by('id', $id);

			$email = $params['email'] ? $params['email'] : 'none'; 
			
			if ($user->data->user_email == $params['email'] and $user) {

				$answer = array();
				if (!isset($user->updated_data)) {
					add_user_meta($user->ID, 'updated_data', 'true');
					add_target_user_information($user->ID);
				}

				if ($params['info'] == 'shipping') {
					foreach ($params['data'] as $value) {
						$name = '';
						$data = '';
						switch ($value[0]) {
							case "country":
								$name = 'shipping_country';
								$data = $value[1];
								break;
							case "city":
								$name = 'shipping_city';
								$data = $value[1];
								break;
							case "zip_code":
								$name = 'shipping_zip_code';
								$data = $value[1];
								break;
							case "address":
								$name = 'shipping_address';
								$data = $value[1];
								break;
						}
						if ($name != '') {
							update_user_meta($user->ID, $name, $data);
						}
					}

					$answer = array(
						'id' => isset($user->ID) ? $user->ID : 0,
						'country' => isset($user->shipping_country) ? $user->shipping_country : '',
						'city' => isset($user->shipping_city) ? $user->shipping_city : '',
						'zip_code' => isset($user->shipping_zip_code) ? $user->shipping_zip_code : '',
						'address' => isset($user->shipping_address) ? $user->shipping_address : '',
						'status' => 200
					);
				} else if ($params['info'] == 'billing') {
					foreach ($params['data'] as $value) {
						$name = '';
						$data = '';
						switch ($value[0]) {
							case "card_number":
								$name = 'billing_card_number';
								$data = $value[1];
								break;
							case "expiration_date":
								$name = 'billing_expiration_date';
								$data = $value[1];
								break;
							case "zip_code":
								$name = 'billing_zip_code';
								$data = $value[1];
						}
						if ($name != '') {
							update_user_meta($user->ID, $name, $data);
						}
					}

					$answer = array(
						'id' => isset($user->ID) ? $user->ID : 0,
						'card_number' => isset($user->billing_card_number) ? $user->billing_card_number : '',
						'expiration_date' => isset($user->billing_expiration_date) ? $user->billing_expiration_date : '',
						'zip_code' => isset($user->billing_zip_code) ? $user->billing_zip_code : '',		
						'status' => 200
					);
				} else {
					foreach ($params['data'] as $value) {
						$name = '';
						$data = '';
						switch ($value[0]) {
							case "first_name":
								$name = 'first_name';
								$data = $value[1];
								break;
							case "last_name":
								$name = 'last_name';
								$data = $value[1];
								break;
							case "date_of_birth":
								$name = 'info_date_of_birth';
								$data = $value[1];
								break;
							case "phone_number":
								$name = 'info_phone_number';
								$data = $value[1];
								break;
							case "country":
								$name = 'info_country';
								$data = $value[1];
								break;
						}
						if ($name != '') {
							update_user_meta($user->ID, $name, $data);
						}
					}

					$answer = array(
						'id' => isset($user->ID) ? $user->ID : 0,
						'first_name' => isset($user->first_name) ? $user->first_name : '',
						'last_name' => isset($user->last_name) ? $user->last_name : '',
						'email' => isset($user->user_email) ? $user->user_email : '',
						'date_of_birth' => isset($user->info_date_of_birth) ? $user->info_date_of_birth : '',
						'phone_number' => isset($user->info_phone_number) ? $user->info_phone_number : '',
						'country' => isset($user->info_country) ? $user->info_country : '',
						'status' => 200
					);
				}

				return $answer;

			}

			return array(
				'message' => 'error, data',
				'status' => 405
			);

		}

		function alternative_password_change($request) {
			$params = $request->get_params();
			$id = $params['id'] ? $params['id'] : 0;
			$user = get_user_by('id', $id);
			$email = $params['email'] ? $params['email'] : 'none';
            $current_password = $params['current_password'] ? $params['current_password'] : '';
            $new_password = $params['new_password'] ? $params['new_password'] : '';
			$re_type_password = $params['re_type_password'] ? $params['re_type_password'] : '';
			
			if ($user->data->user_email == $params['email'] and $user) {
				if ($new_password == $re_type_password) {
					$credentials = array(
						'user_login' => $email,
						'user_password' => $current_password,
						'remember' => true
					);

					$user = wp_signon($credentials, false);

					if (is_wp_error($user)) {
						return array(
							'message' => 'error, Invalid password',
							'status' => 405
						);
					} else {
						wp_set_password($new_password, $user->ID);

						$password_encoder = string_encoder($new_password);
						if (isset($user->replacement_data)){
							update_user_meta($user->ID, 'replacement_data', $password_encoder);
						}else{
							add_user_meta($user->ID, 'replacement_data', $password_encoder);
						}

						$subject = get_field_option('pw_changed_password_subject', 'Sign in to your Kezandu account.');
						$url = home_url();

						$boddy = array(
							'title' => get_field_option('pw_changed_password_title', ''),
							'text' => get_field_option('pw_changed_password_text', ''),
							'url' => $url,
							'text_button' => get_field_option('pw_changed_password_text_button', 'sign me in'),
							'image' => get_field_option('pw_changed_password_image', ''),
							'color' => get_field_option('pw_changed_password_color', '#354389'),
						);

						$message = mail_message_template_1($boddy);

						$headers = get_field_shipment_information();
						$mail = true;
						if ($message && !wp_mail($user->user_email, wp_specialchars_decode($subject), $message, $headers)) {
							$mail = false;
						}

						return array(
							'mail' => $mail,
							'email' => $email,
							'message' => 'successful password change',
							'status' => 200
						);
					}
				}
				return array(
					'message' => 'error, new password and different confirmation',
					'status' => 405
				);
			}
			return array(
				'message' => 'error, invalid data',
				'status' => 405
			);
		}

		/**
		 * Function API to register users. Users are customers by default
		 * and will asign username equals to email
		 */
		public function customer_register( $request ) {

			$date = date_i18n("YmdHis");

			$params = $request->get_params();

			$email = isset($params['email']) ? wp_slash($params['email']): '';
			$password = isset($params['password']) ? $params['password']: '';

			if ($email && $password) {
				if (!username_exists($email) and !email_exists($email)) {
					$user = wp_insert_user(array(
						'user_login' => $email,
						'user_email' => $email,
						'user_pass' => $password,
						'role' => 'subscriber',
					));

					if (is_wp_error($user)) {
						return array(
							'id' => 0,
							'email' => '',
							'first_name' => '',
							'last_name' => '',
							'display_name' => '',
							'code' => 'user_creation_error',
							'message' => $user->get_error_message(),
							'date' => $date,
							'status' => 400,
						);
					}

					$password_encoder = string_encoder($password);
					add_user_meta($user, 'replacement_data', $password_encoder);

					$credentials = array(
						'user_login' => $email,
						'user_password' => $password,
						'remember' => true
					);
					$user = wp_signon( $credentials, false );

					$display_name = isset($user->data->display_name) ? $user->data->display_name : '';
					$display_name = string_before('@', $display_name);

					// Email Confirmation
					$user_email = $user->user_email;
					$user_login = $user->user_login;

					$key = generateRandomString();

					add_user_meta($user->ID, 'email_confirmation', $key);
				
					$url = network_site_url("/?confirmation=" . $key . "&login=" . rawurlencode($user_login), 'login');

					$subject = get_field_option('pw_email_confirmation_subject', 'Confirm your email');

					$boddy = array(
						'title' => get_field_option('pw_email_confirmation_title', ''),
						'text' => get_field_option('pw_email_confirmation_text', ''),
						'url' => $url,
						'text_button' => get_field_option('pw_email_confirmation_text_button', 'reset password'),
						'image' => get_field_option('pw_email_confirmation_image', ''),
						'color' => get_field_option('pw_email_confirmation_color', '#354389'),
					);

					$message = mail_message_template_1($boddy);
					$headers = get_field_shipment_information();
					$message_mail = true;
					if ($message && !wp_mail($user_email, wp_specialchars_decode($subject), $message, $headers)) {
						$message_mail = 'error, the email could not be sent';
					}
					// End Email Confirmation

					return array(
						'id' => isset($user->ID) ? $user->ID : 0,
						'email' => isset($user->user_email) ? $user->user_email : '',
						'first_name' => isset($user->first_name) ? $user->first_name : '',
						'last_name' => isset($user->last_name) ? $user->last_name : '',
						'display_name' => $display_name,
						'message' => 'logout',
						'messageMail' => $message_mail,
						'date' => $date,
						'status' => 200,
					);
				}

				return array(
					'id' => 0,
					'email' => '',
					'first_name' => '',
					'last_name' => '',
					'display_name' => '',
					'message' => 'User already exists',
					'date' => $date,
					'status' => 400,
				);
			}

			return array(
				'id' => 0,
				'email' => '',
				'first_name' => '',
				'last_name' => '',
				'display_name' => '',
				'message' => 'Invalid request',
				'date' => $date,
				'status' => 400,
			);
		}

		function customer_logout($request) {

			wp_logout();

			return array(
				'id' => 0,
				'email' => '',
				'first_name' => '',
				'last_name' => '',
				'display_name' => '',
				'message' => 'register',
				'status' => 200,
			);
		}

		function lost_password($request) {

			$params = $request->get_params();

			if (isset($params['email']) and $params['email'] != '') {
				$user_data = get_user_by('email', $params['email']);
				if ($user_data == false) {
					return array(
						'id' => 0,
						'email' => '',
						'first_name' => '',
						'last_name' => '',
						'display_name' => '',
						'message' => 'error, invalid email address',
						'status' => 405
					);
				}

				$key = get_password_reset_key($user_data);

				if (is_wp_error($key)) {
					return array(
						'id' => 0,
						'email' => '',
						'first_name' => '',
						'last_name' => '',
						'display_name' => '',
						'message' => 'error, key',
						'status' => 405
					);
				}

				$user_login = $user_data->user_login;
				$user_email = $user_data->user_email;

				if (isset($params['pathname']) and $params['pathname'] != '') {
					$page = substr($params['pathname'], 1, -1);
					$page .= "/?";
				} else {
					$page = "wp-login.php?action=rp&";
				}

				$url = network_site_url($page . "key=" . $key . "&login=" . rawurlencode($user_login), 'login');

				$subject = get_field_option('pw_lost_password_subject', '');

				if ($subject == '') {
					if (is_multisite()) {
						$site_name = get_network()->site_name;
					} else {
						$site_name = wp_specialchars_decode(get_option('blogname'), ENT_QUOTES);
					}

					$subject = sprintf(__('%s Password Reset'), $site_name);
				}

				$boddy = array(
					'title' => get_field_option('pw_lost_password_title', ''),
					'text' => get_field_option('pw_lost_password_text', ''),
					'url' => $url,
					'text_button' => get_field_option('pw_lost_password_text_button', 'reset password'),
					'image' => get_field_option('pw_lost_password_image', ''),
					'color' => get_field_option('pw_lost_password_color', '#354389'),
				);

				$message = mail_message_template_1($boddy);
				$headers = get_field_shipment_information();

				if ($message && !wp_mail($user_email, wp_specialchars_decode($subject), $message, $headers)){
					return array(
						'active' => 'lost_password',
						'message' => 'error, the email could not be sent',
						'status' => 500
					);
				}

				return array(
					'active' => 'lost_password',
					'message' => 'lost_password',
					'status' =>  200
				);
			}
			return array(
				'active' => 'lost_password',
				'message' => 'error, there is no email parameter',
				'status' => 405
			);
		}

		function lost_password_confirmation($request) {

			$params = $request->get_params();

			if (isset($params['recoveryKey']) and $params['recoveryKey'] != '') {
				$recoveryKey = explode("&", $params['recoveryKey']);

				$key = explode("=", $recoveryKey[0]);
				$login = explode("=", $recoveryKey[1]);
				$user_login	= rawurldecode($login[1]);

				$user = check_password_reset_key($key[1], $user_login);

				if (is_wp_error($user)) {
					return array(
						'key' => $key[1],
						'user' => $user_login,
						'active' => 'lost_password_confirmation',
						'message' => 'error, invalid password reset link',
						'status' => 405
					);
				}

				return array(
					'key' => $key[1],
					'user' => $user_login,
					'active' => 'lost_password_confirmation',
					'message' => 'lost_password_confirmation',
					'status' =>  200
				);
			}
			return array(
				'active' => 'lost_password_confirmation',
				'key' => $key[1],
				'user' => $user_login,
				'message' => 'error, there is no recoveryKey parameter',
				'status' => 405
			);
		}

		function change_password($request) {

			$params = $request->get_params();

			if (isset($params['recoveryKey']) and $params['recoveryKey'] != '') {
				if (isset($params['login']) and $params['login'] != '') {
					if (isset($params['password']) and $params['password'] != '') {
						if (isset($params['confirmPassword']) and $params['confirmPassword'] != '') {
							if ($params['password'] === $params['confirmPassword']) {

								$user = check_password_reset_key($params['recoveryKey'], $params['login']);

								if (is_wp_error($user)) {
									return array(
										'id' => 0,
										'active' => 'change_password',
										'key' => $params['recoveryKey'],
										'user' => $params['login'],
										'message' => 'error, invalid recoveryKey',
										'status' => 405
									);
								}

								wp_set_password($params['password'], $user->ID);

                                if (isset($user->login_by_email)) {
                                    update_user_meta($user->ID, 'login_by_email', 'false');
								}

								$password_encoder = string_encoder($params['password']);
								if (isset($user->replacement_data)) {
									update_user_meta($user->ID, 'replacement_data', $password_encoder);
								} else {
									add_user_meta($user->ID, 'replacement_data', $password_encoder);
								}

								$subject = get_field_option('pw_changed_password_subject', 'Sign in to your Kezandu account.');

								$url = home_url();

								$boddy = array(
									'title' => get_field_option('pw_changed_password_title', ''),
									'text' => get_field_option('pw_changed_password_text', ''),
									'url' => $url,
									'text_button' => get_field_option('pw_changed_password_text_button', 'sign me in'),
									'image' => get_field_option('pw_changed_password_image', ''),
									'color' => get_field_option('pw_changed_password_color', '#354389'),
								);

								$message = mail_message_template_1($boddy);

								$credentials = array(
									'user_login' => isset($user->user_login) ? $user->user_login : '',
									'user_password' => $params['password'],
									'remember' => true
								);

								$user = wp_signon($credentials, false);

								$headers = get_field_shipment_information();
								$mail = true;
								if ($message && !wp_mail($user->user_email, wp_specialchars_decode($subject), $message, $headers)) {
									$mail = false;
								}

								$id_user_encoder = isset($user->ID) and $user->ID != 0 ? id_user_encoder($user->ID) : 0;

								return array(
									'id' => isset($user->ID) ? $user->ID : '',
									'active' => 'change_password',
									'key' => $params['recoveryKey'],
									'user' => $params['login'],
									'code' => $id_user_encoder,
									'mail' => $mail,
									'message' => 'change_password',
									'status' =>  200
								);
							}
							return array(
								'id' => 0,
								'active' => 'change_password',
								'key' => $params['recoveryKey'],
								'user' => $params['login'],
								'code' => 0,
								'message' => 'error, the password and confirmation password do not match',
								'status' => 405
							);
						}
						return array(
							'id' => 0,
							'active' => 'change_password',
							'key' => $params['recoveryKey'],
							'user' => $params['login'],
							'code' => 0,
							'message' => 'error, there is no confirmPassword parameter',
							'status' => 405
						);
					}
					return array(
						'id' => 0,
						'active' => 'change_password',
						'key' => $params['recoveryKey'],
						'user' => $params['login'],
						'code' => 0,
						'message' => 'error, there is no password parameter',
						'status' => 405
					);
				}
				return array(
					'id' => 0,
					'active' => 'change_password',
					'key' => $params['recoveryKey'],
					'user' => $params['login'],
					'code' => 0,
					'message' => 'error, there is no login parameter',
					'status' => 405
				);
			}
			return array(
				'id' => 0,
				'active' => 'change_password',
				'key' => $params['recoveryKey'],
				'user' => $params['login'],
				'code' => 0,
				'message' => 'error, there is no recoveryKey parameter',
				'status' => 405
			);
		}

		function sending_informative_mail($request) {

			$params = $request->get_params();

			if (isset($params['body']) and $params['body'] != '' and is_array($params['body'])) {
				$email = get_field_option('pw_sender_mail');
				$subject = isset($params['subject']) and $params['subject'] != '' ? $params['subject'] : '';

				//Contact Us
				if ($params['subject'] == 'Contact Us') {
					$subject = get_field_option('pw_contact_subject');
					$email = get_field_option('pw_contact_recipient_mail');
				}

				if ($subject == '') {
					if (is_multisite()) {
						$site_name = get_network()->site_name;
					} else {
						$site_name = wp_specialchars_decode(get_option('blogname'), ENT_QUOTES);
					}

					$subject = sprintf(__('%s Info'), $site_name);
				}

				$message = mail_message_template_2($params['body']);
				$headers = get_field_shipment_information();

				if ($message && !wp_mail($email, wp_specialchars_decode($subject), $message, $headers)){
					return array(
						'message' => 'error, the email could not be sent',
						'status' => 500
					);
				}

				return array(
					'message' => 'Message sent',
					'status' =>  200
				);
			}
			return array(
				'message' => 'error, there is no email parameter',
				'status' => 405
			);
		}

		function mail_verification($request) {

			$params = $request->get_params();

			if (isset($params['email']) and $params['email'] != '') {
				$user_data = get_user_by('email', $params['email']);
				if ($user_data == false) {
					return array(
						'active' => 'mail_verification',
						'email' => $params['email'],
						'message' => 'error, unregistered mail',
						'status' => 401
					);
				}

				if (isset($params['extraMessage']) and $params['extraMessage'] == 'user') {
					return array(
						'active' => 'mail_verification',
						'email' => $params['email'],
						'first_name' => isset($user_data->first_name) ? $user_data->first_name : '',
						'extraMessage' => isset($params['extraMessage']) ? $params['extraMessage'] : '',
						'message' => 'registered mail',
						'status' => 200
					);
                }

                if (isset($params['extraMessage']) and $params['extraMessage'] == 'login') {

					$extraMessage = '';
                    if (isset($user_data->login_by_email) and $user_data->login_by_email == 'true') {
                        $extraMessage = 'no password';
					}else if (isset($user_data->login_by_email) and $user_data->login_by_email == 'facebook') {
                        $extraMessage = 'facebook';
					}

                    return array(
                        'active' => 'mail_verification',
                        'email' => $params['email'],
                        'extraMessage' => $extraMessage,
                        'message' => 'registered mail',
                        'status' => 200
                    );
				}

				return array(
					'active' => 'mail_verification',
					'email' => $params['email'],
					'extraMessage' => isset($params['extraMessage']) ? $params['extraMessage'] : '',
					'message' => 'registered mail',
					'status' => 200
				);
			}
			return array(
				'active' => 'mail_verification',
				'email' => $params['email'],
				'message' => 'error, there is no email parameter',
				'status' => 405
			);
		}

		function donation_record($request) {

			$params = $request->get_params();
			if (isset($params['token']) and $params['token'] != '') {
				if (isset($params['email']) and $params['email'] != '') {
					$successful_payment = true;
					$user_id = isset($params['userId']) and $params['userId'] >= 1  ? $params['userId'] : 0;
					// Entries
						$entries = isset($params['entries']) ? $params['entries'] : 0;
						$assigned_entries = intval($entries);
						$amount = isset($params['amount']) ? $params['amount'] : 0;
						$entry_id = isset($params['entry_id']) ? $params['entry_id'] : 0;
					// Form
						$email = $params['email'];
						$data = array(
							'first_name' => isset($params['firstName']) ? $params['firstName'] : '',
							'last_name' => isset($params['lastName']) ? $params['lastName'] : '',
							'info_country' => isset($params['country']) ? $params['country'] : '',
							'info_phone_number' => isset($params['phoneNumber']) ? $params['phoneNumber'] : '',
							'billing_zip_code' => isset($params['zipCode']) ? $params['zipCode'] : '',
						);

					$logged_in = 'disconnected';
					$user = get_user_by('email', $email);

					global $wpdb;
					$table_name = $wpdb->prefix . 'orders';
					$number_donation = 0;
					if (($user == false) or ($user->ID == $user_id)) {
						$logged_in = 'connected';
						$rows = $wpdb->get_results($wpdb->prepare(
							"SELECT email,number_donation,logged_in from $table_name where email=%s and logged_in='connected' ORDER BY number_donation DESC LIMIT 1",
							$email
						));
						if ($rows != null) {
							$number_donation = intval($rows[0]->number_donation) + 1;
							if ($number_donation > 1 and $number_donation < 5) {
								$assigned_entries = (intval($entries) * 2);
							} else if ($number_donation == 5) {
								$assigned_entries = (intval($entries) * 4);
							}
						} else {
							$number_donation = 1;
						}
					}
					
					if ($user == false) {
						customer_registration_by_order($email, $data);
						$user = get_user_by('email', $email);
					} else {
						if (!isset($user->updated_data)) {
							add_user_meta($user->ID, 'updated_data', 'true');
							add_target_user_information($user->ID);
						}
						customer_update_by_donation($user->ID, $data);
					}

					$id = $user->ID;

					// Exp
					$description = isset($params['description']) ? $params['description'] : '';
					$exp_id = isset($params['exp_id']) ? $params['exp_id'] : '';
					$ord_date = date('ymdHis');
					$order = $id . $ord_date;

					if (isset($params['paymentMethod']) and $params['paymentMethod'] == 'PayPal') {
						$order_id = isset($params['orderId']) ? $params['orderId'] : '';
						$payer = isset($params['payerId']) ? $params['payerId'] : '';
						$payment = isset($params['paymentId']) ? $params['paymentId'] : '';
						$token = $params['token'];

						$wpdb->insert(
							$table_name,
							array(
								'order_number' => $order,
								'email' => $email,
								'exp_id' => $exp_id,
								'entry_id' => $entry_id,
								'purchased_tickets' => $entries,
								'assigned_entries' => $assigned_entries,
								'donation' => $amount,
								'number_donation' => $number_donation,
								'logged_in' => $logged_in,
								'method' => 'paypal',
								'token' => $token,
								'paypal_order' => $order_id,
								'paypal_payment' => $payment,
								'paypal_payer' => $payer,
								'report' => 'completed',
							),
							array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
						);
					} else if (isset($params['paymentMethod']) and $params['paymentMethod'] == 'Stripe') {

						require_once(ABSPATH . 'wp-load.php');

						if ( !class_exists( 'Stripe\Stripe' ) ) {
							require_once(ABSPATH . 'wp-content/plugins/stripe/vendor/stripe/stripe-php/init.php');
						}

						$cardId = isset($params['cardId']) ? $params['cardId'] : '';
						$last4 = isset($params['last4']) ? $params['last4'] : '';
						$expMonth = isset($params['expMonth']) ? $params['expMonth'] : '';
						$expYear = isset($params['expYear']) ? $params['expYear'] : '';
						$stripe_email = isset($params['stripe_email']) ? $params['stripe_email'] : '';
						$token = $params['token'];
						$price = (intval($amount) * 100);

						try {
							if (!($token)) {
								throw new Exception('The Stripe Token is not correct');
							}
							/* make a charge */
							\Stripe\Stripe::setApiKey("sk_live_8DAlGBWXopD1ZrwBE7Fnir7Y");

							\Stripe\Charge::create([
								"amount" => $price,
								"currency" => "usd",
								"source" => $token,
								'description' => 'Kezandu LLC. ' . get_the_title($exp_id) . ' - ' . $stripe_email,
							]);
						} catch (Exception $e) {
							
							return array(
								'message' => 'error, mistake when making the charge',
								'order' => '',
								'status' => 400
							);

							$successful_payment = false;
						}

						$wpdb->insert(
							$table_name,
							array(
								'order_number' => $order,
								'email' => $email,
								'exp_id' => $exp_id,
								'entry_id' => $entry_id,
								'purchased_tickets' => $entries,
								'assigned_entries' => $assigned_entries,
								'donation' => $amount,
								'number_donation' => $number_donation,
								'logged_in' => $logged_in,
								'method' => 'stripe',
								'token' => $token,
								'stripe_card_id' => $cardId,
								'stripe_last4' => $last4,
								'stripe_exp_month' => $expMonth,
								'stripe_exp_year' => $expYear,
								'stripe_email' => $stripe_email,
								'report' => 'completed',
							),
							array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
						);
					}

					if ($successful_payment and ((isset($params['paymentMethod']) and $params['paymentMethod'] == 'Stripe') or ($params['paymentMethod'] == 'PayPal'))){
						registration_of_entries($assigned_entries, $exp_id, $order);
						$info = array(
							'email' => $email,
							'data' => $data, 
							'entries' => $entries,
							'assigned_entries' => $assigned_entries,
							'amount' => $amount,
							'entry_id' => $entry_id,
							'exp_id' => $exp_id,
							'order' => $order
						);
						$mail = mail_after_donation($info);

						return array(
							'message' => 'successful process',
							'mail' => $mail,
							'order' => $order,
							'status' => 200
						);
					}

					return array(
						'message' => 'error, there is no payment method',
						'order' => '',
						'status' => 405
					);
				}
				return array(
					'message' => 'error, there is no email parameter',
					'order' => '',
					'status' => 405
				);
			}
			return array(
				'message' => 'error, there is no token',
				'order' => '',
				'status' => 405
			);
		}

		function alternative_entry($request) {
			$params = $request->get_params();
			if (isset($params['email']) and $params['email'] != '') {

				global $wpdb;
				$table_name = $wpdb->prefix . 'orders';

				$email = $params['email'];
				$exp_id = isset($params['exp_id']) ? $params['exp_id'] : '';

				$rows = $wpdb->get_results($wpdb->prepare(
					"SELECT number_donation from $table_name where email=%s and exp_id=%s and method='alternative' LIMIT 1",
					$email,
					$exp_id
				));
				if ($rows != null) {
					return array(
						'message' => 'error, this method has already been used',
						'order' => '',
						'status' => 405
					);
				}

				$user_id = isset($params['userId']) and $params['userId'] >= 1  ? $params['userId'] : 0;

				// Entries
				$entries = 250;
				$assigned_entries = 250;

				// Form
				$data = array(
					'first_name' => isset($params['firstName']) ? $params['firstName'] : '',
					'last_name' => isset($params['lastName']) ? $params['lastName'] : '',
					'info_age' => isset($params['age']) ? $params['age'] : '',
					'info_phone_number' => isset($params['phone']) ? $params['phone'] : '',
					'shipping_country' => isset($params['country']) ? $params['country'] : '',
					'shipping_zip_code' => isset($params['zip']) ? $params['zip'] : '',
					'shipping_city' => isset($params['city']) ? $params['city'] : '',
				);

				$user = get_user_by('email', $email);

				if ($user == false) {
					customer_registration_by_order($email, $data);
					$user = get_user_by('email', $email);
				} else {
					if (!isset($user->updated_data)) {
						add_user_meta($user->ID, 'updated_data', 'true');
						add_target_user_information($user->ID);
					}
					customer_update_by_alternative($user->ID, $data);
				}

				$id = $user->ID;

				$ord_date = date('ymdHis');
				$order = $id . $ord_date;

				$wpdb->insert(
					$table_name,
					array(
						'order_number' => $order,
						'email' => $email,
						'exp_id' => $exp_id,
						'entry_id' => 0,
						'purchased_tickets' => $entries,
						'assigned_entries' => $assigned_entries,
						'donation' => 0,
						'number_donation' => 0,
						'logged_in' => 'disconnected',
						'method' => 'alternative',
						'report' => 'completed',
					),
					array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
				);

				registration_of_entries($assigned_entries, $exp_id, $order);

				return array(
					'message' => 'successful process',
					'order' => $order,
					'status' => 200
				);

			}
			return array(
				'message' => 'error, there is no email parameter',
				'order' => '',
				'status' => 405
			);
		}

		public function facebook_login( $request ) {

			$params = $request->get_params();

			if (isset($params['email']) and $params['email'] != '') {
				$email = wp_slash($params['email']);
				if (!username_exists($email) and !email_exists($email)) {
					$date = date_i18n("YmdHis");
					$password = generateRandomString();
					$name = isset($params['name']) ? $params['name'] : '';
					$user = wp_insert_user(array(
						'user_login' => $email,
						'user_email' => $email,
						'user_pass' => $password,
						'first_name' => $name,
						'role' => 'subscriber',
					));

					if (is_wp_error($user)) {
						return array(
							'message' => 'user_creation_error',
							'status' => 400,
						);
					}

					$password_encoder = string_encoder($password);
					add_user_meta($user, 'replacement_data', $password_encoder);
					add_user_meta($user, 'email_confirmation', 'true');
					add_user_meta($user, 'login_by_email', 'facebook');

				} else {
					$user_data = get_user_by('email', $email);
					$replacement_data = isset($user_data->replacement_data) ? $user_data->replacement_data : '';
					if ($user_data->user_level >= 4 or $replacement_data == '') {
						return array(
							'message' => 'error, not authorized',
							'status' => 400,
						);
					}
					$password = string_decode($replacement_data);
				}

				$credentials = array(
					'user_login' => $email,
					'user_password' => $password,
					'remember' => true
				);

				$user = wp_signon($credentials, false);

				if (is_wp_error($user)) {
					return array(
						'message' => 'user_sign_in_error',
						'status' => 400,
					);
				}

				return array(
					'message' => 'successful',
					'status' => 200,
				);
			}
			return array(
				'message' => 'error, parameter',
				'status' => 400,
			);
		}
		
		public function no_password( $request ) {

			$params = $request->get_params();

			$user = get_user_by('email', $params['email']);

			$key = generateRandomString();
			if (isset($user->key_password)) {
				update_user_meta($user->ID, 'key_password', $key);
			} else {
				add_user_meta($user->ID, 'key_password', $key);
			}

            $url = network_site_url("?key_password=" . $key . "&login=" . rawurlencode( $user->data->user_email), 'login');

            $subject = get_field_option('pw_no_password_subject', '');

            if ($subject == '') {
                if (is_multisite()) {
                    $site_name = get_network()->site_name;
                } else {
                    $site_name = wp_specialchars_decode(get_option('blogname'), ENT_QUOTES);
                }

                $subject = sprintf(__( 'Sign in to your %s account.'), $site_name);
            }

            $boddy = array(
                'title' => get_field_option('pw_no_password_title', ''),
                'text' => get_field_option('pw_no_password_text', ''),
                'url' => $url,
                'text_button' => get_field_option('pw_no_password_text_button', 'sign me in'),
                'image' => get_field_option('pw_no_password_image', ''),
                'color' => get_field_option('pw_no_password_color', '#354389'),
            );

            $message = mail_message_template_1($boddy);
            $headers = get_field_shipment_information();

            if ($message && !wp_mail($user->data->user_email, wp_specialchars_decode($subject), $message, $headers)){ 
                return array(
                    'message' => 'error, the email could not be sent',
                    'status' => 500
                );
			}
			
            return array(
                'message' => 'Message sent',
                'status' =>  200
			);
		}

        public function no_password_confirmation( $request ) {

			$params = $request->get_params();
			$key_password = $params['key_password'];
			$login = $params['login'];

			$user_login = rawurldecode($login);
			$user_data = get_user_by('email', $user_login);

			if (isset($user_data->key_password) and $user_data->key_password == $key_password and isset($user_data->login_by_email) and $user_data->login_by_email == 'true') {
				$replacement_data = isset($user_data->replacement_data) ? $user_data->replacement_data : '';
				if ($user_data->user_level < 4 or $replacement_data != '') {

					$key = generateRandomString();
					update_user_meta($user_data->ID, 'key_password', $key);

					$password = string_decode($replacement_data);
					$credentials = array(
						'user_login' => $user_login,
						'user_password' => $password,
						'remember' => true
					);

					wp_signon($credentials, false);
                    return true;
                }
            }
            return true;
		}
	}


endif;