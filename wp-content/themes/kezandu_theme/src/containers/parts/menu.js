import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchMenu} from '../../actions';

class Menu extends Component {
    componentDidMount () {
        this.props.actions.fetchMenu(this.props.name);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.name === nextProps.menu.name;
    }

    renderMenu(menu) {
        if ( this.props.name === menu.name) {
            return menu.items.map(item => {
                return (
                    <li key={item.ID} className="nav-item ">
                        <NavLink exact className="nav-link" activeClassName="current-menu-item"  to={Menu.getRelativeUrl(item.url)}><span className="content-line">{item.title}<span className="line"></span></span></NavLink >
                    </li>
                );
            });
        }
    }

    static getRelativeUrl(url) {
        if (url === window.location.origin) {
            return '/';
        }

        return url.substr(window.location.origin.length);
    }

    getClasses(location=''){
        switch(location) {
            case 'main_menu':
                return 'navbar-nav mr-auto';
            case 'footer_menu':
                return 'nav';
            case 'footer_menu_two':
                return 'nav';
            default:
                return '';
        }
    }

    render() {
        return (
            <ul className={this.getClasses(this.props.menu.name)}>
                {this.renderMenu(this.props.menu)}
            </ul>
        );
    }
}

function mapStateToProps({menu}) {
    return {menu};
}

function mapDispatchToProps(dispatch)  {
    return {
        actions: bindActionCreators({fetchMenu}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);