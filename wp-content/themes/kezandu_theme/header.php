<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <script>(function(H){H.className=H.className.replace(/\bno-js\b/,'js')})(document.documentElement)</script>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <script src="https://js.stripe.com/v3/"></script>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <?php
    $favicon = get_field_option("pw_favicon", "");
    
    if ($favicon != "") {
        echo '<link href="' . $favicon . '" rel="shortcut icon">';
    }
    $favicon_2 = get_field_option("pw_favicon_2", "");
    
    if ($favicon_2 != "") {
        echo '<link href="' . $favicon_2 . '" rel="apple-touch-icon-precomposed">';
    }
    ?>
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900" rel="stylesheet">
    <script>
        localStorage.setItem("wordpress_logged_user", '<?php echo id_user_encoder(); ?>');
    </script>
	<?php wp_head(); ?>
</head>
<body class="body-wp">
<div id="react-main">
    <section class="container-fluid <?php Theme_Helpers::get_class( 'template-blog', 'template-single' ); ?>">
        <header class="navbar navbar-expand-lg navbar-light bg-light">
            <?php /*
            <h1 class="navbar-brand"><a href="/"><?php bloginfo( 'name' ); ?></a></h1>
            <nav class="collapse navbar-collapse">
				<?php wp_nav_menu( [
					'theme_location' => 'main_menu',
					'container'      => 'ul',
					'menu_class'     => 'navbar-nav mr-auto'
				] ); ?>
				<?php get_search_form(); ?>
            </nav>
            */ ?>
        </header>