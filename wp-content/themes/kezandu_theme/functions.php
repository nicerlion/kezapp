<?php
include_once 'lib/theme-helpers.php';
include_once 'lib/theme-enqueue.php';
include_once 'lib/theme-endpoints.php';
include_once 'lib/theme-support.php';

$Theme_Support = new Theme_Support();
$Theme_Support->init();

$Theme_Enqueue = new Theme_Enqueue();
$Theme_Enqueue->init();

$Theme_Endpoints = new Theme_Endpoints();
$Theme_Endpoints->init();

require_once('theme-options/base.php');
require_once('theme-options/control-panel.php');
require_once('theme-options/mail-messages.php');

/*------------------------------------*\
	Post Type
\*------------------------------------*/

function cptui_register_my_cpts() {

	/**
	 * Post Type: Entry Box.
	 */

	$labels = array(
		"name" => __( 'Entry Box', '' ),
		"singular_name" => __( 'Entry Box', '' ),
	);

	$args = array(
		"label" => __( 'Entry Box', '' ),
		"labels" => $labels,
		"description" => "",
		"public" => true,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => false,
		"rest_base" => "",
		"has_archive" => false,
		"show_in_menu" => true,
		"exclude_from_search" => false,
		"capability_type" => "post",
		"map_meta_cap" => true,
		"hierarchical" => false,
		"rewrite" => array( "slug" => "entry-box", "with_front" => true ),
		"query_var" => true,
		"supports" => array( "title"),
		"taxonomies" => array(),
	);

	register_post_type( "entry-box", $args );

	/**
	 * Post Type: Accordion Faq.
	 */

	$labels = array(
		"name" => __( 'Accordion Faq', '' ),
		"singular_name" => __( 'Accordion Faq', '' ),
	);

	$args = array(
		"label" => __( 'Accordion Faq', '' ),
		"labels" => $labels,
		"description" => "",
		"public" => true,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => false,
		"rest_base" => "",
		"has_archive" => false,
		"show_in_menu" => true,
		"exclude_from_search" => false,
		"capability_type" => "post",
		"map_meta_cap" => true,
		"hierarchical" => false,
		"rewrite" => array( "slug" => "accordion-faq", "with_front" => true ),
		"query_var" => true,
		"supports" => array( "title"),
		"taxonomies" => array(),
	);

	register_post_type( "accordion-faq", $args );


	/**
	 * Post Type: Healthmakers.
	 */

	$labels = array(
		"name" => __( 'Healthmakers', '' ),
		"singular_name" => __( 'Healthmakers', '' ),
	);

	$args = array(
		"label" => __( 'Healthmakers', '' ),
		"labels" => $labels,
		"description" => "",
		"public" => true,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => false,
		"rest_base" => "",
		"has_archive" => false,
		"show_in_menu" => true,
		"exclude_from_search" => false,
		"capability_type" => "post",
		"map_meta_cap" => true,
		"hierarchical" => false,
		"rewrite" => array( "slug" => "healthmakers", "with_front" => true ),
		"query_var" => true,
		"supports" => array( "title"),
		"taxonomies" => array(),
	);

	register_post_type( "healthmakers", $args );

	/**
	 * Post Type: Accordion Rewards.
	 */

	$labels = array(
		"name" => __( 'Accordion Rewards', '' ),
		"singular_name" => __( 'Accordion Rewards', '' ),
	);

	$args = array(
		"label" => __( 'Accordion Rewards', '' ),
		"labels" => $labels,
		"description" => "",
		"public" => true,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => false,
		"rest_base" => "",
		"has_archive" => false,
		"show_in_menu" => true,
		"exclude_from_search" => false,
		"capability_type" => "post",
		"map_meta_cap" => true,
		"hierarchical" => false,
		"rewrite" => array( "slug" => "accordion-rewards", "with_front" => true ),
		"query_var" => true,
		"supports" => array( "title"),
		"taxonomies" => array(),
	);

	register_post_type( "accordion-rewards", $args );

}

add_action( 'init', 'cptui_register_my_cpts' );


// Load Theme Styles
function theme_styles() {
	wp_register_style('theme_style', get_template_directory_uri() . '/style.css', array(), '1.0', 'all');
	wp_enqueue_style('theme_style'); // Enqueue it!
}

add_action('wp_enqueue_scripts', 'theme_styles'); // Add Theme Stylesheet

// Load scripts (header.php)
function theme_header_scripts() {
	if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {
		wp_register_script('bootstrap-scripts', get_template_directory_uri() . '/bootstrap/bootstrap.min.js', array('jquery'), '1.0.0'); // Custom scripts
		wp_enqueue_script('bootstrap-scripts'); // Enqueue it!
	}
}
add_action('init', 'theme_header_scripts'); // Add Custom Scripts to wp_head


function spinner() {
	echo  '<div class="loading-circle">
				<div class="spinner">
					<div class="ball"></div>
					<div class="ball1"></div>
				</div>
			</div>';
}

function string_before($letter, $string) {
	return substr($string, 0, strpos($string, $letter));
};

//Acceso prohibido a admin de suscriptores
function restrict_access_admin_panel()
{
	$current_user = wp_get_current_user();
	if ($current_user->user_level < 4) {
		wp_redirect(get_bloginfo('url'));
		exit;
	}
}
add_action('admin_init', 'restrict_access_admin_panel', 1);


// Remove Admin bar
function remove_admin_bar() {

	if (is_user_logged_in()) {

		$current_user = wp_get_current_user();

		$toolbar = _get_admin_bar_pref('front', $current_user->ID);
		if ($toolbar) {
			if ($current_user->user_level < 4) {
				return false;
			}
			return true;
		}
	}
	return false;
}

add_filter('show_admin_bar', 'remove_admin_bar'); // Remove Admin bar

function generateRandomString($length = 20) {
	return substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, $length);
}

function email_confirmation($key = '', $login = '') {
	if ($key != '' && $login != '') {
		$user_login = rawurldecode($login);
		$user_data = get_user_by('login', $user_login);
		$key_email_confirmation  = $user_data->email_confirmation ? $user_data->email_confirmation : '';
		if ($key_email_confirmation == $key){
			update_user_meta($user_data->ID, 'email_confirmation', 'true');
		}
	}
}

function footer_email_confirmation() {
	if (isset($_GET['confirmation']) && isset($_GET['login'])) {
		email_confirmation($_GET['confirmation'], $_GET['login']);
		echo '<script> location.href ="' . home_url() . '"; </script>';
	}
}
add_action('wp_footer', 'footer_email_confirmation');

function footer_no_password() {
	if (isset($_GET['key_password']) && isset($_GET['login'])) {
		 echo "<script>
					jQuery.ajax({
						type: 'POST',
						data: {
							key_password: '" . $_GET['key_password'] . "',
							login: '" . $_GET['login'] . "',
						},
						url: '" . home_url() . "/wp-json/react-theme/v1/no-password-confirmation'
					}).done(function( data ) {
						location.href ='" . home_url() . "';
					});
				</script>";
	}
}
add_action('wp_footer', 'footer_no_password');

function publication_date_meta_box($post) {
	$publication_start_date = get_post_meta($post->ID, 'publication_start_date', true);
	$publication_start_time = get_post_meta($post->ID, 'publication_start_time', true);

	$publication_start_date = $publication_start_date ? $publication_start_date : date_i18n("Y-m-d");
	$publication_start_time = $publication_start_time ? $publication_start_time : date_i18n("H:i");
	
	$publication_end_date = get_post_meta($post->ID, 'publication_end_date', true);
	$publication_end_time = get_post_meta($post->ID, 'publication_end_time', true);

	$expiration_notification = get_post_meta($post->ID, 'expiration_notification', true);

	wp_nonce_field('publication_date_action', 'publication_date');

	echo '<label for="publication_start_date">Start date</label>';
	echo '<input id="publication_start_date" name="publication_start_date" type="date" value="' . $publication_start_date . '">';
	
	echo '<label for="publication_start_time">Start time</label>';
	echo '<input id="publication_start_time" name="publication_start_time" type="time" value="' . $publication_start_time . '">';
	
	echo '<label for="publication_end_date">Finish date</label>';
	echo '<input id="publication_end_date" name="publication_end_date" type="date" value="' . $publication_end_date . '">';

	echo '<label for="publication_end_time">Ending time</label>';
	echo '<input id="publication_end_time" name="publication_end_time" type="time" value="' . $publication_end_time . '">';

	echo '<input id="expiration_notification" name="expiration_notification" type="hidden" value="' . $expiration_notification . '">';

	$experiences = get_field_option("pw_experiences");
	$valid_page_templates = '';
	foreach ($experiences as $value) {
		if ($valid_page_templates) {
			$valid_page_templates .= " || ";
		}
		$valid_page_templates .= "page_template == '" . $value . "'";
	}

	if ($valid_page_templates == "") {
		$valid_page_templates = "page_template == 'defaul-none'";
	}

	echo "<script>
			jQuery(document).ready(function () {
				var page_template = jQuery('#page_template option:selected').val();
				if (" . $valid_page_templates . ") {
					jQuery('#publication_date_id').css('display', 'block');
				} else {
					jQuery('#publication_date_id').css('display', 'none');
				}
				jQuery(document).on('change', '#page_template', function (event) {
					var page_template = jQuery('#page_template option:selected').val();
					if (" . $valid_page_templates . ") {
						jQuery('#publication_date_id').css('display', 'block');
					} else {
						jQuery('#publication_date_id').css('display', 'none');
					}
				});
			});
		</script>";

	?>
		<style>
			#publication_date_id input {
				width: 100%;
				text-transform: uppercase;
			}
			#publication_date_id label {
				margin-bottom: 5px !important;
				clear: both;
				font-weight: 700;
				display: block;
			}
			#publication_date_id input + label {
				margin-top: 10px !important;
			}
		</style>
   <?php
}

// Meta Boxes
function my_custom_meta_box() {

	add_meta_box(
		'publication_date_id',
		__('Date Experience', 'textdomain' ),
		'publication_date_meta_box',
		'page',
		'side'
	);

}
add_action( 'add_meta_boxes', 'my_custom_meta_box' );


function save_publication_date($post_id) {

	if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
		return;
	}

	if (!isset($_POST['publication_date']) || !wp_verify_nonce($_POST['publication_date'], 'publication_date_action')) {
		return;
	}

	if (isset($_POST['publication_start_date'])) {
		$time = $_POST['publication_start_time'] ? $_POST['publication_start_time'] : date_i18n("H:i");
		update_post_meta($post_id, 'publication_start_time', $time);

		$start_date = $_POST['publication_start_date'] ? $_POST['publication_start_date'] : date_i18n("Y-m-d");
		update_post_meta($post_id, 'publication_start_date', esc_html($start_date));

		$publication_start_date = str_replace('-', '', $start_date);
		$publication_start_date .= str_replace(':', '', $time);
		update_post_meta($post_id, 'publication_start_date_value', esc_html($publication_start_date));

		$publication_start = str_replace('-', ' , ', $start_date);
		$publication_start .= ' , ' . str_replace(':', ' , ', $time);
		update_post_meta($post_id, 'publication_start', esc_html($publication_start));
	}

	if (isset($_POST['publication_end_date'])) {

		update_post_meta($post_id, 'publication_end_time', $_POST['publication_end_time']);
		update_post_meta($post_id, 'publication_end_date', esc_html($_POST['publication_end_date']));

		if ($_POST['publication_end_date']) {
			$end_date = $_POST['publication_end_date'];
		} else {
			$year = date_i18n("Y");
			$year = $year + 1000;
			$end_date = $year . '-01-01';
		}

		$time = $_POST['publication_end_time'] ? $_POST['publication_end_time'] : '00:00';
		$publication_end_date = str_replace('-', '', $end_date);
		$publication_end_date .= str_replace(':', '', $time);
		update_post_meta($post_id, 'publication_end_date_value', esc_html($publication_end_date));

		$publication_end = str_replace('-', ' , ', $end_date);
		$publication_end .= ' , ' . str_replace(':', ' , ', $time);
		update_post_meta($post_id, 'publication_end', esc_html($publication_end));
	}

	if (isset($_POST['expiration_notification'])) {
		$expiration_notification = $_POST['expiration_notification'] ? $_POST['expiration_notification'] : 'active';
		update_post_meta($post_id, 'expiration_notification', esc_html($expiration_notification));
	}
}
add_action('save_post', 'save_publication_date');

if (function_exists('acf_add_local_field_group')) :

	$acf_experiences = get_field_option("pw_experiences");
	$acf_location = array();
	foreach ($acf_experiences as $acf_value) {
		$acf_location[]= array(
			array(
				'param' => 'post_template',
				'operator' => '==',
				'value' => $acf_value,
			),
		);
	}

	acf_add_local_field_group(array(
		'key' => 'group_5c4202a37ccfe',
		'title' => 'Experiences',
		'fields' => array(
			array(
				'key' => 'field_5c4202e27a52a',
				'label' => 'Experience name',
				'name' => 'experience_name',
				'type' => 'text',
				'instructions' => '',
				'required' => 1,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'maxlength' => '',
			),
		),
		'location' => $acf_location,
		'menu_order' => 1,
		'position' => 'side',
		'style' => 'default',
		'label_placement' => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen' => '',
		'active' => 1,
		'description' => '',
	));

	acf_add_local_field_group(array(
		'key' => 'group_5c530bfa532cc',
		'title' => 'This Section is for Enter Now page required fields.',
		'fields' => array(
			array(
				'key' => 'field_5c53216ee7a8b',
				'label' => '',
				'name' => '',
				'type' => 'message',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'message' => '<img src="/wp-content/themes/kezandu_theme/img/donation-screen.jpg" style="width: 250px">',
				'new_lines' => 'wpautop',
				'esc_html' => 0,
			),
			array(
				'key' => 'field_5c530c021f08a',
				'label' => 'Subtitle for Enter Now Page.',
				'name' => 'subtitle_enter',
				'type' => 'text',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'maxlength' => '',
			),
			array(
				'key' => 'field_5c530c631f08c',
				'label' => 'Text Description for Enter Now Page.',
				'name' => 'text_content_enter',
				'type' => 'wysiwyg',
				'instructions' => '',
				'required' => 1,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'tabs' => 'all',
				'toolbar' => 'full',
				'media_upload' => 1,
				'delay' => 0,
			),
		),
		'location' => $acf_location,
		'menu_order' => 0,
		'position' => 'normal',
		'style' => 'default',
		'label_placement' => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen' => '',
		'active' => 2,
		'description' => '',
	));

endif;

function add_target_user_information($id) {
	add_user_meta($id, 'info_date_of_birth', '');
	add_user_meta($id, 'info_phone_number', '');
	add_user_meta($id, 'info_country', '');
	add_user_meta($id, 'info_age', '');
	add_user_meta($id, 'shipping_country', '');
	add_user_meta($id, 'shipping_city', '');
	add_user_meta($id, 'shipping_zip_code', '');
	add_user_meta($id, 'shipping_address', '');
	add_user_meta($id, 'billing_card_number', '');
	add_user_meta($id, 'billing_expiration_date', '');
	add_user_meta($id, 'billing_zip_code', '');
}

function customer_registration_by_order($email, $data) {
	if ($email and $data) {
		$password = generateRandomString();
		$user = wp_insert_user(array(
			'user_login' => $email,
			'user_email' => $email,
			'user_pass' => $password,
			'first_name' => $data['first_name'] ? $data['first_name'] : '',
			'last_name' => $data['last_name'] ? $data['last_name'] : '',
			'role' => 'subscriber',
		));

		$password_encoder = string_encoder($password);
		add_user_meta($user, 'replacement_data', $password_encoder);

		add_user_meta($user, 'updated_data', 'true');
		add_user_meta($user, 'info_date_of_birth', '');
		add_user_meta($user, 'info_phone_number', isset($data['info_phone_number']) ? $data['info_phone_number'] : '');
		add_user_meta($user, 'info_country', isset($data['info_country']) ? $data['info_country'] : '');
		add_user_meta($user, 'info_age', isset($data['info_age']) ? $data['info_age'] : '');
		add_user_meta($user, 'shipping_country', isset($data['shipping_country']) ? $data['shipping_country'] : '');
		add_user_meta($user, 'shipping_city', isset($data['shipping_city']) ? $data['shipping_city'] : '');
		add_user_meta($user, 'shipping_zip_code', isset($data['shipping_zip_code']) ? $data['shipping_zip_code'] : '');
		add_user_meta($user, 'shipping_address', '');
		add_user_meta($user, 'billing_card_number', '');
		add_user_meta($user, 'billing_expiration_date', '');
		add_user_meta($user, 'billing_zip_code', isset($data['billing_zip_code']) ? $data['billing_zip_code'] : '');
		add_user_meta($user, 'login_by_email', 'true');
	}
}

function customer_update_by_donation($id, $data) {
	if ($id and $data) {
		update_user_meta($id, 'first_name', isset($data['first_name']) ? $data['first_name'] : '');
		update_user_meta($id, 'last_name', isset($data['last_name']) ? $data['last_name'] : '');
		update_user_meta($id, 'info_country', isset($data['info_country']) ? $data['info_country'] : '');
		update_user_meta($id, 'info_phone_number', isset($data['info_phone_number']) ? $data['info_phone_number'] : '');
		update_user_meta($id, 'billing_zip_code', isset($data['billing_zip_code']) ? $data['billing_zip_code'] : '');
	}
}

function customer_update_by_alternative($id, $data) {
	if ($id and $data) {
		update_user_meta($id, 'first_name', isset($data['first_name']) ? $data['first_name'] : '');
		update_user_meta($id, 'last_name', isset($data['last_name']) ? $data['last_name'] : '');
		update_user_meta($id, 'info_age', isset($data['info_age']) ? $data['info_age'] : '');
		update_user_meta($id, 'info_phone_number', isset($data['info_phone_number']) ? $data['info_phone_number'] : '');
		update_user_meta($id, 'shipping_country', isset($data['shipping_country']) ? $data['shipping_country'] : '');
		update_user_meta($id, 'shipping_zip_code', isset($data['shipping_zip_code']) ? $data['shipping_zip_code'] : '');
		update_user_meta($id, 'shipping_city', isset($data['shipping_city']) ? $data['shipping_city'] : '');
	}
}

function registration_of_entries($entries, $exp_id, $order) {
	global $wpdb;
	$table_name = $wpdb->prefix . 'entries';

	
	if ($entries >= 1000) {
		$inser_thousand = inser_thousand($exp_id, $order);
		$result = intval($entries) / 1000;
		$lower = floor($result);
		$remaining = $entries - ($lower * 1000);
		for ($i = 1; $i <= $lower; $i++) {
			$wpdb->query("INSERT INTO `$table_name`
			(`order_number`, `exp_id`)
			VALUES $inser_thousand ");
		}

	} else {
		$remaining = intval($entries);
	}

	if ($remaining >= 100) {
		$result = $remaining / 100;
		$lower = floor($result);
		$remaining = $remaining - ($lower * 100);

		$inser_query = null;
		for ($i = 1; $i <= $lower; $i++) {
			if ($inser_query != null) {
				$inser_query .= ",('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id')";
			} else {
				$inser_query = "('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
				('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id')";
			}
		}
		if ($inser_query != null) {
			$wpdb->query("INSERT INTO `$table_name`
				(`order_number`, `exp_id`)
				VALUES $inser_query ");
		}
	}

	if ($remaining >= 1) {
		$inser_query = null;
		for ($i = 1; $i <= $remaining; $i++) {
			if ($inser_query != null) {
				$inser_query .= ",('$order', '$exp_id')";
			} else {
				$inser_query = "('$order', '$exp_id')";
			}
		}
		if ($inser_query != null) {
			$wpdb->query("INSERT INTO `$table_name`
				(`order_number`, `exp_id`)
				VALUES $inser_query ");
		}
	}
}


function inser_thousand($exp_id, $order){
	return "('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),
		('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id'),('$order', '$exp_id')";
}

function string_encoder($data) {
	for ($i = 1; $i <= 10; $i++) {
		$data = base64_encode($data);
	}
	$genera1 = generateRandomString();
	$genera2 = generateRandomString(19);
	$data = $genera1 . $data . $genera2 . '=';
	$data = base64_encode($data);
	return $data;
}

function string_decode($data) {
	$data = base64_decode($data);
	$length = strlen($data);
	$data = substr($data, 20, ($length - 20));
	for ($i = 1; $i <= 10; $i++) {
		$data = base64_decode($data);
	}
	return $data;
}

function id_user_encoder() {
	$user_id = get_current_user_id();
	if ($user_id >= 1) {
		$date = date_i18n('Ymd');
		return string_encoder($date . '-' . $user_id);
	}
	return 0;
}

function id_user_decode($user_id) {
	$user_id = string_decode($user_id);
	$explode = explode("-", $user_id);
	$date = date_i18n('Ymd');
	if ($date == $explode[0]) {
		$explode[0] = false;
	} else {
		$explode[0] = true;
	}
	return $explode;
}

function mail_after_donation($info) {

	$subject = 'Kezandu - Donation ' . $info['order'] . ' Summary';

	$date = date_i18n("Y-m-d H:i:s");
	$title = get_the_title($info['exp_id']);
	
	$publication_end_date = get_post_meta($info['exp_id'], 'publication_end_date', true);
	$publication_end_time = get_post_meta($info['exp_id'], 'publication_end_time', true);

	$params = array(
		'ORDER ID' => $info['order'],
		'DATE' => $date,
		'EXPERIENCE' => $title,
		'EXPERIENCE ENDING DATE' => $publication_end_date . ' ' . $publication_end_time,
		'DONATION AMOUNT' => '$' . $info['amount'] . '.00',
		'ENTRIES' => $info['entries'],
	);

	$bonus = $info['assigned_entries'] - $info['entries'];
	if ($bonus >= 1) {
		$params['BONUS ENTRIES'] = $bonus;
		$params['TOTAL ENTRIES'] = $info['assigned_entries'];
	}

	$name = $info['data']['first_name'] ? $info['data']['first_name'] : '';
	$name .= ($info['data']['last_name'] and $info['data']['last_name']) ? ' ' : '';
	$name .= $info['data']['last_name'] ? $info['data']['last_name'] : '';

	$message = mail_message_template_order($params, $name);
	$headers = get_field_shipment_information();

	if ($message && !wp_mail($info['email'], wp_specialchars_decode($subject), $message, $headers)) {
		return 'error, the email could not be sent';
	}
	return 'the mail was sent';
}