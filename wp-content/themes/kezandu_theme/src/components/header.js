import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Menu from '../containers/parts/menu';
import ReactResizeDetector from 'react-resize-detector';
import {fetchCustomer, fetchCustomerLogout} from '../actions';

class Header extends Component {

    componentDidMount() {
        if (typeof (Storage) !== "undefined") {
            let id = localStorage.getItem("wordpress_logged_user");
            this.props.fetchCustomer(id);
        }
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        let header = jQuery("#header-secondary");
        let headerHeight = header.height();
        let scrollTop = jQuery(window).scrollTop();
        if (scrollTop > (headerHeight + 2)) {
            header.addClass("sticky");
            header.css("top", "-" + (headerHeight + 2) + "px");
        } else {
            header.removeClass("sticky");
            header.css("top", "0px");
        }
        
        if (scrollTop > (headerHeight + 50)) {
            header.addClass("show-sticky");
        } else {
            header.removeClass("show-sticky");
        }
    }

    logout() {
        fetchCustomerLogout().then(info => {
            location.reload();
        });
        localStorage.setItem("wordpress_logged_user", '0');
    }

    menuSidebarActive() {
        let containerReact = document.getElementById('container-react');
        containerReact.classList.add('menu-sidebar-active');
        
        jQuery("html, body").animate({
            scrollTop: jQuery(".body-wp").offset().top - 100
        }, 400, "linear");
    }


    menuSidebarDeactivate() {
        let containerReact = document.getElementById('container-react');
        containerReact.classList.remove('menu-sidebar-active');
    }

    buttonSignUp() {

        const buttonStyles = {
            backgroundColor: this.props.buttonColor ? this.props.buttonColor : '#00cde1',
            borderColor: this.props.buttonColor ? this.props.buttonColor : '#00cde1',
        };

        if (this.props.customer.length) {

            if (this.props.customer[0].status == 301) {
                location.reload();
            }

            if (this.props.customer[0].id > 0) {
                let name = '';
                if (this.props.customer[0].first_name == '') {
                    name = this.props.customer[0].display_name;
                } else {
                    name = this.props.customer[0].first_name + ' ' + this.props.customer[0].last_name;
                }
                return (
                    <div className="content-account">
                        <div className="row row-cols-padding-none">
                            <div className="col">
                                <Link to='/profile' className="link-primary">Hi, {name}</Link>
                            </div>
                            <div className="col-auto">
                                <p style={buttonStyles} className="button-sign-up button-log-out" onClick={() => { this.logout() }} >Log Out</p>
                            </div>
                        </div>
                        <div className="content-admin">
                            <div className="account-menu">
                                <span></span>
                                <span className="transparent"></span>
                                <Link to='/' className="item-menu link-primary">Hi, {name}</Link>
                                <p className="item-menu" onClick={() => { this.logout() }} >Log Out</p>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        
        return (<Link to='/sign-in' style={buttonStyles} className="button-sign-up">sign in</Link>)

    }

    onResize = () => {
        let headerHeight = jQuery("#header-secondary").height();

        if (this.props.transparent == 'true') {
            let section = jQuery("#header-primary + section ");
            let padding = parseInt(section.css('padding-top'));
            if (headerHeight > padding) {
                section.css("padding-top", headerHeight + "px");
            }
        } else {
            jQuery("#header-primary").css("min-height", headerHeight + "px");
        }
        
    }

    render() {

        const headerClassName = this.props.transparent == 'true' ? ' header-transparent' : '';

        return (
            <header id='header-primary' className={'header clear' + headerClassName} role='banner' >
                <div id="close-menu" onClick={() => { this.menuSidebarDeactivate() }} ></div>
                <div id='header-secondary' className='row header-container justify-content-between'>
                    <div className='col col-md-auto menu-col-mobile'>
                        <div className='header-col-left'>
                            <div className='content-header-left'>
                                <div className='burger-menu' onClick={() => { this.menuSidebarActive() }} >
                                    <i className="line-1"></i>
                                    <i className="line-2"></i>
                                    <i className="line-3"></i>
                                    <i className="line-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col col-md-auto'>
                        <div className='content-logo'>
                            <div className='logo'>
                                <Link to='/'>
                                    <img src={this.props.logo ? this.props.logo : '/wp-content/themes/kezandu_theme/img/logo.png'} alt='logo' className='logo-img' />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='col menu-col-desk'>
                        <button className='navbar-toggler nav-icon' type='button' data-toggle='collapse' data-target='#navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle navigation'></button>
                        <nav className='main-nav  navbar-collapse collapse' id='navbarCollapse'>
                            <button type='button' className='close x-button-error hamb-menu-close' data-dismiss='modal'>X</button>
                            <Menu name='main_menu' />
                        </nav>
                    </div>
                    <div className='col col-md-auto'>
                        <div className='header-col-right'>
                            <div className='content-header-right'>
                                {this.buttonSignUp()}
                            </div>
                        </div>
                    </div>
                </div>
                <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
            </header>
        );
    }
}


function mapStateToProps({customer}) {
    return {customer};
}

module.exports = connect(mapStateToProps, {fetchCustomer})(Header);
