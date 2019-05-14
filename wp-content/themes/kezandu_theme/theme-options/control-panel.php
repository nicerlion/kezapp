<?php
/**
 * Order manager
 */


function kezandu_menu() {

    add_menu_page(
        'Orders', //page title
        'Orders', //menu title
        'manage_options', //capabilities
        'orders-view', //menu slug
        'orders_view' //function
    );

    add_menu_page(
        'Winner Selection', //page title
        'Winner Selection', //menu title
        'manage_options', //capabilities
        'winner-selection', //menu slug
        'winner_selection' //function
    );

	//this is a submenu
    add_submenu_page(
        'winner-selection', //parent slug
        'Draws', //page title
        'Draws', //menu title
        'manage_options', //capability
        'draws-made', //menu slug
        'draws_made'
    ); //function

}

add_action('admin_menu', 'kezandu_menu');

function orders_view() {
    ?>
    <link type="text/css" href="<?php echo get_template_directory_uri(); ?>/theme-options/control-panel.css" rel="stylesheet" />
    <div class="pw-content-order pw-container">
        <table class='wp-list-table widefat fixed rpl-table' border=1 frame=hsides rules=rows id='lookInsuranceList'>
            <thead><tr><th>Item</th><th>Order</th><th>Email</th><th>Experience Id</th><th>Entry Id</th><th>Number of tickets</th><th>Method</th><th>Donation</th><th>State</th></tr></thead>
            <tbody>
                <?php 
                global $wpdb;
                $table_name = $wpdb->prefix . 'orders';
                $rows = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC ");

                if ($rows != null) {
                    foreach ($rows as $row) {
                        echo "<tr>";
                            echo "<td data-colname='Item'>$row->id</td>";
                            echo "<td data-colname='Order'>$row->order_number</td>";
                            echo "<td data-colname='Email'>$row->email</td>";
                            echo "<td data-colname='Experience Id'>$row->exp_id</td>";
                            echo "<td data-colname='Entry Id'>$row->entry_id</td>";
                            echo "<td data-colname='Number of tickets'>$row->purchased_tickets</td>";
                            echo "<td data-colname='Method'>$row->method</td>";
                            echo "<td data-colname='Donation'>$row->donation</td>";
                            echo "<td data-colname='State'>$row->report</td>";
                        echo "</tr>";
                    }
                }
                ?>
            <tbody>
        </table>
        </div>

    <?php
}

function winner_selection() {
    ?>
    <link type="text/css" href="<?php echo get_template_directory_uri(); ?>/theme-options/control-panel.css" rel="stylesheet" />
    <div class="pw-content-winner-selection pw-container">
        <?php  if (isset($_GET['exp']) and $_GET['exp']) {
            $experience = winner_selection_experience($_GET['exp']);
            $style = $experience['color'] ? 'style="background-color: ' . $experience['color'] . ';"' : '';
            $button_style = $experience['color'] ? 'color-attr="' . $experience['color'] . '"' : '';
            $count_entries = intval(count_entries($experience['id']));
            if (isset($_POST['start-draw'])) {
                eliminate_winner($experience['id']);
                $exclude = null;
                if (isset($_POST['exclude']) and $_POST['exclude']){
                    $exclude = $experience['raffle']['order'];
                }
                random_winner($experience['id'], $count_entries, $exclude);
                echo '<div class="full-spinner-admin">
                        <div class="loading-circle">
                            <div class="spinner-admin">
                                <div class="ball"></div>
                                <div class="ball1"></div>
                            </div>
                        </div>
                    </div>
                    <script>location.reload();</script>';
            }

        ?>
        
        <div class="container-winner-selection">
            <div class="container-experience" <?php echo $style; ?> >
                <div class="experience-img" style="background-image: url(<?php echo $experience['image']; ?>);"></div>
                <div class="experience-description">
                    <div class="content-experience-description">
                        <h3><?php echo $experience['name']; ?></h3>
                        <p><?php echo $experience['description']; ?></p>
                        <p class="font-12">State: <?php echo $experience['report']; ?></p>
                        <p class="font-12">Start date: <?php echo $experience['start']; ?></p>
                        <p class="font-12">Finish date: <?php echo $experience['end']; ?></p>
                        <p class="font-12">Number of current orders: <?php echo count_orders($experience['id']); ?></p>
                        <p class="font-12">Number of current entries: <?php echo $count_entries; ?></p>
                    </div>
                </div>
            </div>
            <div class="container-random-winner-selection">
                <script>
                    function validate(form) {
                        return confirm('There is already a winner, are you sure you want to choose a new one?');
                    }
                </script>
                <form action="" method="post" <?php echo $experience['raffle']['order']? 'onsubmit="return validate(this);"' : ''; ?> >
                    <input type="hidden" name="start-draw" />
                    <?php echo $experience['raffle']['order'] ? '<p class="checkbox-info" ><input type="checkbox" name="exclude" value="' . $experience['raffle']['order'] . '"> You want to exclude the entries that belong to this order.</p>': ''; ?>
                    <p>Select the winner below <button <?php echo $button_style; ?> type="submit">start the selection</button></p>
                </form>
                <div class="winner-description">
                    <?php if (isset($experience['raffle']) and $experience['raffle']['order']) {

                        if ($experience['raffle']['email']){
                            $user = get_user_by('email', $experience['raffle']['email']);
                            $user_data = array(
                                'first_name' => (isset($user->first_name) and $user->first_name != '') ? $user->first_name : '',
                                'last_name' => (isset($user->last_name) and $user->last_name != '') ? $user->last_name : '',
                                'user_email' => (isset($user->user_email) and $user->user_email != '') ? $user->user_email : '------',
                                'email_confirmation' => (isset($user->email_confirmation) and $user->email_confirmation == 'true') ? ' <span class="confirmed">Confirmed</span>' : '',
                                'info_date_of_birth' => (isset($user->info_date_of_birth) and $user->info_date_of_birth != '') ? $user->info_date_of_birth : '------',
                                'info_phone_number' => (isset($user->info_phone_number) and $user->info_phone_number != '') ? $user->info_phone_number : '------',
                                'info_country' => (isset($user->info_country) and $user->info_country != '') ? $user->info_country : '------',
                                'info_age' => (isset($user->info_age) and $user->info_age != '') ? $user->info_age : '------',
                                'billing_card_number' => (isset($user->billing_card_number) and $user->billing_card_number != '') ? $user->billing_card_number : '------',
                                'billing_expiration_date' => (isset($user->billing_expiration_date) and $user->billing_expiration_date != '') ? $user->billing_expiration_date : '------',
                                'billing_zip_code' => (isset($user->billing_zip_code) and $user->billing_zip_code != '') ? $user->billing_zip_code : '------',
                                'shipping_country' => (isset($user->shipping_country) and $user->shipping_country != '') ? $user->shipping_country : '------',
                                'shipping_city' => (isset($user->shipping_city) and $user->shipping_city != '') ? $user->shipping_city : '------',
                                'shipping_zip_code' => (isset($user->shipping_zip_code) and $user->shipping_zip_code != '') ? $user->shipping_zip_code : '------',
                                'shipping_address' => (isset($user->shipping_address) and $user->shipping_address != '') ? $user->shipping_address : '------',
                            );
                        } else {
                            $user_data = array(
                                'first_name' => '',
                                'last_name' => '',
                                'user_email' => '------',
                                'email_confirmation' => '------',
                                'info_date_of_birth' => '------',
                                'info_phone_number' => '------',
                                'info_country' => '------',
                                'info_age' => '------',
                                'billing_card_number' => '------',
                                'billing_expiration_date' => '------',
                                'billing_zip_code' => '------',
                                'shipping_country' => '------',
                                'shipping_city' => '------',
                                'shipping_zip_code' => '------',
                                'shipping_address' => '------',
                            );
                        }
                        
                        $name = $user_data['first_name'] ? $user_data['first_name']  : '';
                        $name .= $user_data['last_name'] ? ' ' . $user_data['last_name']  : '';

                        echo "<h3>Draw Result:</h3>";
                        echo "<p class='entry-info'>The winning entry is <span>" . $experience['raffle']['entry'] . "</span> that belongs to the order <span>" . $experience['raffle']['order'] . "</span>.</p>";
                        echo "<p class='entry-info'>Draw #: " . $experience['raffle']['id'] . "</p>";
                        echo "<p class='entry-info'>Date and Time: " . $experience['raffle']['date'] . "</p>";
                        ?>

                        <h3>Winner Info:</h3>
                        <div class="row-info">
                            <div class="col-info">Name:</div><div class="col-data"><?php echo $name ? $name : '------'; ?></div>
                        </div>
                        <div class="row-info">    
                            <div class="col-info">Email:</div><div class="col-data"><?php echo $user_data['user_email'] . $user_data['email_confirmation']; ?><span class=""></span></div>
                        </div>
                        <div class="row-info">
                            <div class="col-info">Date of Birth:</div><div class="col-data"><?php echo $user_data['info_date_of_birth']; ?></div>
                        </div>
                        <div class="row-info">
                            <div class="col-info">Phone Number:</div><div class="col-data"><?php echo $user_data['info_phone_number']; ?></div>
                        </div>
                        <div class="row-info">
                            <div class="col-info">Country:</div><div class="col-data"><?php echo $user_data['info_country']; ?></div>
                        </div>
                        <h3>Shipping Address:</h3>
                        <div class="row-info">
                            <div class="col-info">Country:</div><div class="col-data"><?php echo $user_data['shipping_country']; ?></div>
                        </div>
                        <div class="row-info">
                            <div class="col-info">City:</div><div class="col-data"><?php echo $user_data['shipping_city']; ?></div>
                        </div>
                        <div class="row-info">
                            <div class="col-info">Address:</div><div class="col-data"><?php echo $user_data['shipping_address']; ?></div>
                        </div>
                        <div class="row-info">
                            <div class="col-info">Zip code:</div><div class="col-data"><?php echo $user_data['shipping_zip_code']; ?></div>
                        </div>
                        <h3>Billing Information:</h3>
                        <div class="row-info">
                            <div class="col-info">Zip Code:</div><div class="col-data"><?php echo $user_data['billing_zip_code']; ?></div>
                        </div>
                    <?php } else { ?>
                        <p class="info-winner">The winner has not been chosen.</p>
                    <?php } ?>
                </div>
            </div>
        </div>


        <?php } else { ?>
            <table class='wp-list-table widefat fixed rpl-table' border=1 frame=hsides rules=rows id='lookInsuranceList'>
                <thead><tr><th>Id</th><th>Experience</th><th>State</th><th>Winner</th><th></th></tr></thead>
                <tbody>
                    <?php 
                    $paramet = array(
                        'report' => 'all',
                        'paged' => 1
                    );

                    $experiences = winner_selection_experiences($paramet);

                    if ($experiences['post_count'] != 0) {
                        foreach ($experiences['items'] as $item) {
                            echo "<tr>";
                            echo "<td data-colname='Id'>" . $item['id'] . "</td>";
                            echo "<td data-colname='Experience'>" . $item['name'] . "</td>";
                            echo "<td data-colname='State'>" . $item['report'] . "</td>";
                            echo "<td data-colname='Winner'><div class='pw-square " . $item['winner'] . "'></div></td>";
                            echo "<td class='not-before'><a class='button-table' href='/wp-admin/admin.php?page=winner-selection&exp=" . $item['id'] . "'>let's go</a></td>";
                            echo "</tr>";
                        }
                    }
                    ?>
                <tbody>
            </table>
        <?php } ?>
    </div>

    <?php
}


function winner_selection_experiences($request) {

    global $wpdb;
    $templates_experiences = get_field_option("pw_experiences");
    $templates = array('relation' => 'OR');
    $date = date_i18n("YmdHi");

    foreach ($templates_experiences as $value) {
        $templates[] = array(
            'key' => '_wp_page_template',
            'value' => $value,
            'compare' => '==',
        );
    }

    if (isset($request['report']) and $request['report'] == 'inactive') {
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
    } else if (isset($request['report']) and $request['report'] == 'active') {
        $meta_query = array(
            'relation' => 'AND',
            array(
                'key' => 'publication_end_date_value',
                'value' => $date,
                'compare' => '>=',
                'meta_type' => 'BIGINT',
            ),
            $templates,
        );
    } else {
        $meta_query = $templates;
    }

    $args = array(
        'posts_per_page' => 50,
        'orderby' => 'publication_end_date_value',
        'order' => "DESC",
        'post_report' => 'publish',
        'post_type' => 'page',
        'paged' => $request['paged'] ? $request['paged'] : 1,
        'meta_query' => $meta_query,
    );
    
    $query_posts = new WP_Query($args);

    $experiences = array();

    if ($query_posts->posts) {

        $table_name = $wpdb->prefix . 'entries';

        foreach ($query_posts->posts as $key => $item) {

            $rows = $wpdb->get_results($wpdb->prepare(
                "SELECT id FROM $table_name WHERE exp_id=%s AND report='winner' LIMIT 1",
                $item->ID
            ));

            $winner = '';
            if ($rows != null) {
                $winner = 'pw-positive';
            }

            $publication_end = get_post_meta($item->ID, 'publication_end_date_value', true);
            $publication_end = intval($publication_end);
            $publication_start = get_post_meta($item->ID, 'publication_start_date_value', true);
            $publication_start = intval($publication_start);
            $date = intval($date);
            $report = 'Finalized';
            if ($date < $publication_start) {
                $report = 'To start';
            } else if ($date < $publication_end) {
                $report = 'Active';
            }

            $experiences[] = array(
                'id' => $item->ID,
                'name' => $item->post_title,
                'report' => $report,
                'winner' => $winner
            );
        }

        return array(
            'items' => $experiences,
            'paged' => intval($request['paged'] ? $request['paged'] : 1),
            'post_count' => intval($query_posts->post_count),
            'found_posts' => intval($query_posts->found_posts),
            'max_num_pages' => intval($query_posts->max_num_pages),
        );
    }

    return array(
        'items' => $experiences,
        'paged' => intval($request['paged'] ? $request['paged'] : 1),
        'post_count' => 0,
        'found_posts' => 0,
        'max_num_pages' => 0,
    );
}

function winner_selection_experience($id) {
    $post = get_post($id);
    $date = date_i18n("YmdHi");


    if ($post) {

        global $wpdb;
        $table_name = $wpdb->prefix . 'raffles';

        $rows = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table_name WHERE exp_id=%s ORDER BY id DESC LIMIT 1",
            $id
        ));

        if ($rows != null) {
            $id_raffle = $rows[0]->id;
            $order = $rows[0]->order_number;
            $entry = $rows[0]->entry;
            $email = $rows[0]->email;
            $date_raffle = $rows[0]->date;
        } else {
            $id_raffle = null;
            $order = null;
            $entry = null;
            $email = null;
            $date_raffle = null;
        }

        $publication_end = get_post_meta($post->ID, 'publication_end_date_value', true);
        $publication_end = intval($publication_end);
        $publication_start = get_post_meta($post->ID, 'publication_start_date_value', true);
        $publication_start = intval($publication_start);
        $date = intval($date);
        $report = 'Finalized';
        if ($date < $publication_start) {
            $report = 'To start';
        } else if ($date < $publication_end) {
            $report = 'Active';
        }

        $date_end = get_post_meta($post->ID, 'publication_end_date', true);
        $date_end .= ' ' . get_post_meta($post->ID, 'publication_end_time', true);
        $date_start = get_post_meta($post->ID, 'publication_start_date', true);
        $date_start .= ' ' . get_post_meta($post->ID, 'publication_start_time', true);
        
        $image = get_field('background_image_sect1', $post->ID);
        $description = get_field('title_sect1', $post->ID);
        $color = get_field('button_color', $post->ID);
                
        return array(
            'id' => $post->ID,
            'name' => $post->post_title,
            'description' => $description,
            'image' => $image,
            'report' => $report,
            'start' => $date_start,
            'end' => $date_end,
            'color' => $color,
            'raffle' => array(
                'id' => $id_raffle,
                'order' => $order,
                'entry' => $entry,
                'email' => $email,
                'date' => $date_raffle
            ),
        );

    }

    return null;
}

function count_entries($exp_id, $exclude=null) {
    if ($exp_id) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'entries';
        if ($exclude) {
            $rows = $wpdb->get_results($wpdb->prepare(
                "SELECT COUNT(*) FROM $table_name WHERE exp_id=%s AND NOT order_number=%s ",
                $exp_id,
                $exclude
            ));
        } else {
            $rows = $wpdb->get_results($wpdb->prepare(
                "SELECT COUNT(*) FROM $table_name WHERE exp_id=%s",
                $exp_id
            ));
        }

        if ($rows){
            foreach ($rows[0] as $key => $value) {
                return $value;
            }
        }
        return 0;
    }
}

function count_orders($exp_id) {
    if ($exp_id) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'orders';
        $rows = $wpdb->get_results($wpdb->prepare(
            "SELECT COUNT(*) FROM $table_name WHERE exp_id=%s",
            $exp_id
        ));
        if ($rows) {
            foreach ($rows[0] as $key => $value) {
                return $value;
            }
        }
        return 0;
    }
}

function eliminate_winner($exp_id) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'entries';

    $rows = $wpdb->get_results($wpdb->prepare(
        "SELECT id FROM $table_name WHERE exp_id=%s AND report='winner' LIMIT 4",
        $exp_id
    ));

    if ($rows != null) {
        foreach ($rows as $key => $row) {
            $wpdb->update(
                $table_name,
                array('report' => ''),
                array('id' => $row->id),
                array('%s'),
                array('%s')
            );
        }
    }
}

function random_winner($exp_id, $count_entries, $exclude) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'entries';

    if ($exclude) {
        $count_entries = intval(count_entries($exp_id, $exclude));
        $rand = mt_rand(1, ($count_entries - 1));
        $rows = $wpdb->get_results($wpdb->prepare(
            "SELECT id, order_number FROM $table_name WHERE exp_id=%s AND NOT order_number=%s LIMIT 1 OFFSET $rand",
            $exp_id,
            $exclude
        ));
    } else {
        $rand = mt_rand(1, ($count_entries - 1));
        $rows = $wpdb->get_results($wpdb->prepare(
            "SELECT id, order_number FROM $table_name WHERE exp_id=%s LIMIT 1 OFFSET $rand",
            $exp_id
        ));
    }

    if ($rows != null) {
        $id = $rows[0]->id;
        $order_number = $rows[0]->order_number;
        $wpdb->update(
            $table_name,
            array('report' => 'winner'),
            array('id' => $id),
            array('%s'),
            array('%s')
        );

        $table_name_orders = $wpdb->prefix . 'orders';
        $table_name_raffles = $wpdb->prefix . 'raffles';

        $rows_select = $wpdb->get_results($wpdb->prepare(
            "SELECT email FROM $table_name_orders WHERE order_number=%s ",
            $order_number
        ));

        if ($rows_select != null) {
            $email = $rows_select[0]->email;
        } else {
            $email = '';
        }

        $wpdb->query($wpdb->prepare(
                "INSERT INTO `$table_name_raffles` (`entry`, `order_number`, `email`, `exp_id`) VALUES (%s, %s, %s, %s)",
                $id,
                $order_number,
                $email,
                $exp_id
            ));
    }
}

function draws_made()
{
    ?>
    <link type="text/css" href="<?php echo get_template_directory_uri(); ?>/theme-options/control-panel.css" rel="stylesheet" />
    <div class="pw-content-order pw-container">
        <table class='wp-list-table widefat fixed rpl-table' border=1 frame=hsides rules=rows id='lookInsuranceList'>
            <thead><tr><th>Id</th><th>Experience Id</th><th>Email</th><th>Order</th><th>Entry</th><th>Date and Time</th></tr></thead>
            <tbody>
                <?php 
                global $wpdb;
                $table_name = $wpdb->prefix . 'raffles';
                $rows = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC ");

                if ($rows != null) {
                    foreach ($rows as $row) {
                        echo "<tr>";
                        echo "<td data-colname='Id'>$row->id</td>";
                        echo "<td data-colname='Experience Id'>$row->exp_id</td>";
                        echo "<td data-colname='Email'>$row->email</td>";
                        echo "<td data-colname='Order'>$row->order_number</td>";
                        echo "<td data-colname='Entry'>$row->entry</td>";
                        echo "<td data-colname='Date and Time'>$row->date</td>";
                        echo "</tr>";
                    }
                }
                ?>
            <tbody>
        </table>
        </div>

    <?php

}