<?php
/**
 * Theme Option
 */

function create_process_tables() {
    global $wpdb;
    $table_name_orders = $wpdb->prefix . 'orders';
    $sql_orders = "CREATE TABLE $table_name_orders (
        `id` bigint(20) NOT NULL AUTO_INCREMENT,
        `order_number` varchar(40) NOT NULL,
        `email` varchar(255) NOT NULL,
        `exp_id` bigint(20) NOT NULL,
        `entry_id` bigint(20) DEFAULT NULL,
        `purchased_tickets` varchar(15) DEFAULT NULL,
        `assigned_entries` varchar(15) DEFAULT NULL,
        `donation` varchar(10) DEFAULT NULL,
        `number_donation` varchar(4) DEFAULT 0,
        `logged_in` varchar(13) DEFAULT NULL,
        `method` varchar(50) DEFAULT NULL,
        `token` varchar(255) DEFAULT NULL,
        `paypal_order` varchar(255) DEFAULT NULL,
        `paypal_payment` varchar(255) DEFAULT NULL,
        `paypal_payer` varchar(255) DEFAULT NULL,
        `stripe_card_id` varchar(255) DEFAULT NULL,
        `stripe_last4` varchar(255) DEFAULT NULL,
        `stripe_exp_month` varchar(255) DEFAULT NULL,
        `stripe_exp_year` varchar(255) DEFAULT NULL,
        `stripe_email` varchar(255) DEFAULT NULL,
        `report` varchar(20) DEFAULT 'in process',
        `date` DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY id (id)
    );";

    $table_name_entries = $wpdb->prefix . 'entries';
    $sql_entries = "CREATE TABLE $table_name_entries (
        `id` bigint(20) NOT NULL AUTO_INCREMENT,
        `order_number` varchar(40) NOT NULL,
        `exp_id` bigint(20) NOT NULL,
        `report` varchar(20) DEFAULT NULL,
        UNIQUE KEY id (id)
    );";

    $table_name_raffles = $wpdb->prefix . 'raffles';
    $sql_raffles = "CREATE TABLE $table_name_raffles (
        `id` bigint(20) NOT NULL AUTO_INCREMENT,
        `entry` bigint(20) NOT NULL,
        `order_number` varchar(40) NOT NULL,
        `email` varchar(255) NOT NULL,
        `exp_id` bigint(20) NOT NULL,
        `date` DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY id (id)
    );";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql_orders);
    dbDelta($sql_entries);
    dbDelta($sql_raffles);
}

function content_theme_option() {
    $content = array(
        'Header' => array (
            'Favicon' => array (
                array (
                    'key' => 'pw_favicon',
                    'label' => '<p>Favicon</p>',
                    'type' => 'url-img',
                ),
                array (
                    'key' => 'pw_favicon_2',
                    'label' => '<p>Favicon @2</p>',
                    'type' => 'url-img',
                ),
            ),
        ),
        'Footer' => array (
            'Content' => array (
                array (
                    'key' => 'pw_copyright',
                    'label' => '<p>Copyright</p><p class="pw-message"></p>',
                    'type' => 'textarea',
                ),
                array (
                    'key' => 'pw_questions',
                    'label' => '<p>Questions</p><p class="pw-message"></p>',
                    'type' => 'textarea',
                ),
            ),
        ),
        'Privacy policy' => array (
            'Content' => array (
                array (
                    'key' => 'pw_privacy_policy',
                    'label' => '<p>Text</p><p class="pw-message"></p>',
                    'type' => 'textarea',
                ),
                array (
                    'key' => 'pw_alternative_text',
                    'label' => '<p>Text</p><p class="pw-message"></p>',
                    'type' => 'textarea',
                ),
            ),
        ),
        'Experiences' => array(
            'Select the experiences' => array(
                array(
                    'key' => 'pw_experiences',
                    'label' => '<p>Please select the templates that belong to the experiences.</p>',
                    'type' => 'experiences',
                ),
            ),
        ),
        'Social' => array (
            'Social Networks' => array (
                array (
                    'key' => 'pw_social_facebook',
                    'label' => '<p>Facebook</p>',
                    'type' => 'text',
                ),
                array (
                    'key' => 'pw_social_twitter',
                    'label' => '<p>Twitter</p>',
                    'type' => 'text',
                ),
                array (
                    'key' => 'pw_social_instagram',
                    'label' => '<p>Instagram</p>',
                    'type' => 'text',
                ),
                array (
                    'key' => 'pw_social_youtube',
                    'label' => '<p>Youtube</p>',
                    'type' => 'text',
                ),
            ),
        ),
        'Mail content' => array(
            'Shipment information' => array(
                array(
                    'key' => 'pw_name_sender',
                    'label' => '<p>Sender&#8216;s Name</p>',
                    'type' => 'text',
                ),
                array(
                    'key' => 'pw_sender_mail',
                    'label' => '<p>Sender&#8216;s mail</p>',
                    'type' => 'text',
                ),
                array(
                    'key' => 'pw_reply_to',
                    'label' => '<p>Reply-To</p>',
                    'type' => 'text',
                ),
            ),
            'Contact mail information' => array(
                array(
                    'key' => 'pw_contact_recipient_mail',
                    'label' => '<p>Recipient&#8216;s mail</p><p class="pw-message">The recipient&#8216;s mail can not be the same as the sender&#8216;s mail in "Shipment information".</p>',
                    'type' => 'text',
                ),
                array(
                    'key' => 'pw_contact_subject',
                    'label' => '<p>Subject</p>',
                    'type' => 'text',
                ),
            ),
            'Email confirmation' => array(
                array(
                    'key' => 'pw_email_confirmation_subject',
                    'label' => '<p>Subject</p>',
                    'type' => 'text',
                ),
                array(
                    'key' => 'pw_email_confirmation_image',
                    'label' => '<p>Header image</p><p class="pw-message">Use a complete address.</p>',
                    'type' => 'url-img',
                ),
                array(
                    'key' => 'pw_email_confirmation_color',
                    'label' => '<p>Header color</p>',
                    'type' => 'color',
                ),
                array(
                    'key' => 'pw_email_confirmation_title',
                    'label' => '<p>Title</p>',
                    'type' => 'text',
                ),
                array(
                    'key' => 'pw_email_confirmation_text',
                    'label' => '<p>Text before the button</p><p class="pw-message">use the &#60;br&#62; tag to give spaces between lines, do not use the &#60;p&#62; tag.</p>',
                    'type' => 'textarea',
                ),
                array(
                    'key' => 'pw_email_confirmation_text_button',
                    'label' => '<p>Text button</p>',
                    'type' => 'text',
                ),
            ),
            'Lost password' => array(
                array(
                    'key' => 'pw_lost_password_subject',
                    'label' => '<p>Subject</p>',
                    'type' => 'text',
                ),
                array(
                    'key' => 'pw_lost_password_image',
                    'label' => '<p>Header image</p><p class="pw-message">Use a complete address.</p>',
                    'type' => 'url-img',
                ),
                array(
                    'key' => 'pw_lost_password_color',
                    'label' => '<p>Header color</p>',
                    'type' => 'color',
                ),
                array(
                    'key' => 'pw_lost_password_title',
                    'label' => '<p>Title</p>',
                    'type' => 'text',
                ),
                array(
                    'key' => 'pw_lost_password_text',
                    'label' => '<p>Text before the button</p><p class="pw-message">use the &#60;br&#62; tag to give spaces between lines, do not use the &#60;p&#62; tag.</p>',
                    'type' => 'textarea',
                ),
                array(
                    'key' => 'pw_lost_password_text_button',
                    'label' => '<p>Text button</p>',
                    'type' => 'text',
                ),
            ),
            'No password' => array(
                array(
                    'key' => 'pw_no_password_subject',
                    'label' => '<p>Subject</p>',
                    'type' => 'text',
                ),
                array(
                    'key' => 'pw_no_password_image',
                    'label' => '<p>Header image</p><p class="pw-message">Use a complete address.</p>',
                    'type' => 'url-img',
                ),
                array(
                    'key' => 'pw_no_password_color',
                    'label' => '<p>Header color</p>',
                    'type' => 'color',
                ),
                array(
                    'key' => 'pw_no_password_title',
                    'label' => '<p>Title</p>',
                    'type' => 'text',
                ),
                array(
                    'key' => 'pw_no_password_text',
                    'label' => '<p>Text before the button</p><p class="pw-message">use the &#60;br&#62; tag to give spaces between lines, do not use the &#60;p&#62; tag.</p>',
                    'type' => 'textarea',
                ),
                array(
                    'key' => 'pw_no_password_text_button',
                    'label' => '<p>Text button</p>',
                    'type' => 'text',
                ),
            ),
            'Changed password' => array(
                array(
                    'key' => 'pw_changed_password_subject',
                    'label' => '<p>Subject</p>',
                    'type' => 'text',
                ),
                array(
                    'key' => 'pw_changed_password_image',
                    'label' => '<p>Header image</p><p class="pw-message">Use a complete address.</p>',
                    'type' => 'url-img',
                ),
                array(
                    'key' => 'pw_changed_password_color',
                    'label' => '<p>Header color</p>',
                    'type' => 'color',
                ),
                array(
                    'key' => 'pw_changed_password_title',
                    'label' => '<p>Title</p>',
                    'type' => 'text',
                ),
                array(
                    'key' => 'pw_changed_password_text',
                    'label' => '<p>Text before the button</p><p class="pw-message">use the &#60;br&#62; tag to give spaces between lines, do not use the &#60;p&#62; tag.</p>',
                    'type' => 'textarea',
                ),
                array(
                    'key' => 'pw_changed_password_text_button',
                    'label' => '<p>Text button</p>',
                    'type' => 'text',
                ),
            ),
        ),
    );

    return $content;
    
}

function get_field_option($name, $defaul = null) {
    $value = get_option($name);
    $pos = strpos($value, ',checkbox');
    if ($pos) {
        $array = array('page-experience.php', 'page-experience-medina.php');
        $quantity = intval($value);
        for ($i = 1; $i <= $quantity; $i++) {
            $return = get_option($name . '_' . $i);
            if ($return) {
                if ($return != 'page-experience.php' and $return != 'page-experience-medina.php') {
                    $array[] = $return;
                }
            }
        }
        return $array != "" ? $array : $defaul;
    }
    return $value != "" ? do_shortcode($value) : $defaul;
}


function get_field_shipment_information() {

    $sitename = strtolower($_SERVER['SERVER_NAME']);
    $from_email = get_field_option("pw_sender_mail", '');
    if ($from_email == '') {
					// Get the site domain and get rid of www.
        if (substr($sitename, 0, 4) == 'www.') {
            $sitename = substr($sitename, 4);
        }
        $from_email = 'info@' . $sitename;
    }

    $from_name = get_field_option("pw_name_sender", '');
    if ($from_name == '') {
        if (is_multisite()) {
            $from_name = get_network()->site_name;
        } else {
            $from_name = wp_specialchars_decode(get_option('blogname'), ENT_QUOTES);
        }
    }

    $from_reply_to = get_field_option("pw_reply_to", '');

    $headers = "From: " . $from_name . " <" . $from_email . ">
        Content-Type: text/html; charset=UTF-8
        Reply-To: " . $from_reply_to;

    return $headers;
}


function fields_theme_option($name, $type=null, $choices=null) {

    switch ($type) {
        case "img":
            echo '<div class="pw-img"><div id="img-' . $name . '" style="background-image: url(' . get_option($name) . ');"></div></div>';
            echo '<p>URL:</p><input type="text" class="pw-img-input" data-id="#img-' . $name . '" name="' . $name . '" value="' . get_option($name) . '">';
            echo '<p>ALT:</p><input type="text" name="' . $name . '_alt" value="' . get_option($name . '_alt') . '">';
            break;
        case "url-img":
            echo '<div class="pw-img"><div id="img-' . $name . '" style="background-image: url(' . get_option($name) . ');"></div></div>';
            echo '<p>URL:</p><input type="text" class="pw-img-input" data-id="#img-' . $name . '" name="' . $name . '" value="' . get_option($name) . '">';
            break;
        case "color":
            echo '<p>COLOR:</p><div class="pw-color"><div id="color-' . $name . '" style="background-color: ' . get_option($name) . ';"></div></div>';
            echo '<input type="text" class="pw-color-input" data-id="#color-' . $name . '" name="' . $name . '" value="' . get_option($name) . '">';
            echo '<div class="pw-clear-both"></div>';
            break;
        case "number":
            echo '<input type="number" name="' . $name . '" value="' . get_option($name) . '">';
            break;
        case "textarea":
            echo '<textarea name="' . $name . '">' . get_option($name) . '</textarea>';
            break;
        case "editor":
            wp_editor( get_option($name), $name );
            break;
        case "select":
            $value = get_option($name);
            echo '<select name="' . $name . '">';
            foreach ($choices as $key_choice => $choice) {
                if ($value == $key_choice) {
                    echo '<option value="' . $key_choice . '" selected>' . $choice . '</option>';
                } else {
                    echo '<option value="' . $key_choice . '">' . $choice . '</option>';
                }
            }
            echo '</select>';
            break;
        case "experiences":
            $values = get_option($name);
            $templates = wp_get_theme()->get_page_templates();
            $cont = 0;
            foreach ($templates as $key => $template) {
                $cont++;
                $value = get_option($name . '_' . $cont);
                if ($value or $key == 'page-experience.php' or $key == 'page-experience-medina.php') {
                    echo '<input type="checkbox" checked name="' . $name . '_' . $cont . '" value="' . $key . '"> ' . $template . '<br>';
                } else {
                    echo '<input type="checkbox" name="' . $name . '_' . $cont . '" value="' . $key . '"> ' . $template . '<br>';
                }
            }
            echo '<input type="hidden" name="' . $name . '" value="' . $cont . ',checkbox">';

            break;
        default:
            echo '<input type="text" name="' . $name . '" value="' . get_option($name) . '">';
            break;
   }

}

function theme_option() {
    
    $options = content_theme_option();

    ?>
    <link type="text/css" href="<?php echo get_template_directory_uri(); ?>/theme-options/custom.css" rel="stylesheet" />
    <div class='pw-content-theme-option'>
        <form method="post" action="options.php">
            <?php wp_nonce_field('update-options') ?>
            <div id="pw-theme-head">
                <h2><i class="dashicons-before dashicons-admin-appearance"></i> Theme Options</h2>
            </div>
            <div class="pw-relative">
                <div class="pw-boder"></div>
                <div id="pw-option">
                    <ul id="pw-item-option">
                        <?php
                            $active = 'active';
                            foreach ($options as $key_option => $option) {
                                $data_id  = str_replace(' ', '-', $key_option);
                                echo '<li data-id="#pw-item-' . $data_id . '" class="' . $active . '"><p><i class="dashicons-before dashicons-admin-settings"></i> ' . $key_option . '</p></li>';
                                $active = '';
                            }
                        ?>
                    </ul>
                </div>
                <div id="pw-content-option">
                        <?php
                            $active = 'active';
                            $keys = '';
                            if (!(isset($_GET['edit']))) {
                               echo '<style>
                                        .td-pw-info{
                                            display: none;
                                        }
                                    </style>';
                            }
                            foreach ($options as $key_option => $option) {
                                $id  = str_replace(' ', '-', $key_option);
                                echo '<div id="pw-item-' . $id . '" class="pw-item-opcion ' . $active . '">';
                                foreach ( $option as $key_session => $session) {
                                    echo '
                                        <table>
                                            <tbody>
                                                <tr class="pw-header-opcion">
                                                    <td colspan="100">' . $key_session . '</td>
                                                </tr>';
                                                foreach ($session as $key_field => $field) {
                                                    echo '
                                                        <tr>
                                                            <td>' . $field["label"] . '</td>
                                                            <td>';
                                                                $choices = isset($field["choices"]) ? $field["choices"] : null;
                                                                fields_theme_option($field["key"], $field["type"], $choices);
                                                    echo '  </td>
                                                            <td  class="td-pw-info">
                                                                <div class="pw-info">
                                                                    <div>';

                                                                        if ($field["type"] == 'color') {
                                                                            echo '<p class="pw-info-title">COLOR FORMAT</p>
                                                                            <p>#ffffff</p>
                                                                            <p>rgb(255, 255, 255)</p>';
                                                                        }

                                                    echo '              <p class="pw-info-title">PHP</p>
                                                                        <p>&lt;?php echo get_field_option("'.$field["key"].'"); ?&gt;</p>';

                                                                        if ($field["type"] == 'img') {
                                                                            echo '<p>&lt;?php echo get_field_option("'.$field["key"].'_alt"); ?&gt;</p>';
                                                                        }

                                                    echo '          </div>
                                                                </div>
                                                            </td>
                                                        </tr>';

                                                    if ($active == 'active') {
                                                        $active = '';
                                                        $keys .= $field["key"];
                                                    } else {
                                                        $keys .= ',' . $field["key"];
                                                    }

                                                    if ($field["type"] == 'img') {
                                                        $keys .= ',' . $field["key"] . '_alt';
                                                    }

                                                    if ($field["type"] == 'experiences') {
                                                        $templates = wp_get_theme()->get_page_templates();
                                                        $quantity = count($templates);
                                                        for ($i=1; $i <= $quantity; $i++) {
                                                            $keys .= ',' . $field["key"] . '_' . $i;
                                                        }
                                                    }

                                                }
                                    echo '
                                            </tbody>
                                        </table>';
                                }
                                echo '</div>';
                            }
                        ?>
                </div>
                <div class="pw-clear-both"></div>
            </div>
            <div class="pw-submit">
                <input type="submit" name="Submit" class="button button-primary" value="Save Options" />
            </div>
                <input type="hidden" name="action" value="update" />
                <input type="hidden" name="page_options" value="<?php echo $keys; ?>" />
        </form>
    </div>
    <script>
        jQuery(document).ready(function () {

            jQuery("#pw-item-option > li").live("click", function () {

                if (!jQuery(this).hasClass("active")) {
                    jQuery("#pw-item-option").find("li.active").toggleClass("active");
                    jQuery(this).toggleClass("active");
                    let id_content = jQuery(this).attr("data-id");
                    localStorage.setItem('pwOpenThemaOpcion', id_content);
                    jQuery("#pw-content-option").find("div.active").toggleClass("active");
                    jQuery(id_content).toggleClass("active");
                }
            });

            jQuery(".pw-img-input").change(function () {
                let id_img = jQuery(this).attr("data-id");
                let url_img = jQuery(this).val();
                jQuery(id_img).css('background-image', 'url(' + url_img + ')');
            });

            jQuery(".pw-color-input").change(function () {
                let id_color = jQuery(this).attr("data-id");
                let color = jQuery(this).val();
                jQuery(id_color).css('background-color', color);
            });

            var pwOpenThemaOpcion = localStorage.getItem('pwOpenThemaOpcion');
            if (pwOpenThemaOpcion == null) {

                let id_open = jQuery("#pw-item-option").find("li.active").attr("data-id");
                localStorage.setItem('pwOpenThemaOpcion', id_open);

            } else {

                jQuery("#pw-item-option").find("li.active").toggleClass("active");
                jQuery('li[data-id="' + pwOpenThemaOpcion + '"]').toggleClass("active");
                jQuery("#pw-content-option").find("div.active").toggleClass("active");
                jQuery(pwOpenThemaOpcion).toggleClass("active");

            }
            
        }) 
    </script>

    <?php

    create_process_tables();

}

function theme_option_edit() {

    //this is the main item for the menu
    add_menu_page('Theme Options', //page title
        'Theme Options', //menu title
        'manage_options', //capabilities
        'theme_option', //menu slug
        'theme_option' //function
    );

}

add_action('admin_menu','theme_option_edit');