import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../actions/index';
import Header from '../components/header';
import Main from '../components/main';
import Footer from '../components/footer';
import Menu from '../containers/parts/menu';

import Experience from '../components/pages/experience';
import ExperienceMedina from '../components/pages/experience-medina';
import Contact from '../components/pages/contact-us';
import CreateAccount from '../components/pages/create-an-account';
import Profile from '../components/pages/profile';
import ProfileRewards from '../components/pages/profile-rewards';
import Signin from '../components/pages/sign-in';
import Donation from '../components/pages/donation';
import About from '../components/pages/about';
import Faq from '../components/pages/faq';
import PrivacyPolicy from '../components/pages/privacy-policy';
import RulesTerms from '../components/pages/rules-terms';
import LostPassword from '../components/pages/lost-password';
import EnterNow from '../components/pages/enter-now';
import WinnerListing from '../components/pages/winner-listing';
import WinnerSingle from '../components/pages/winner-single';
import AlternativeMethodOfEntry from '../components/pages/alternative-method-of-entry';
import ThankYou from '../components/pages/thank-you';

class Single extends Component {
    componentWillMount() {
        if (this.props.location.pathname == '/') {
            this.props.fetchPost('/wp-home');
        }else{
            this.props.fetchPost(this.props.location.pathname);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            if (nextProps.location.pathname == '/') {
                this.props.fetchPost('/wp-home');
            } else {
                this.props.fetchPost(nextProps.location.pathname);
            }
        }
    }

    componentDidUpdate() {
        document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;;
    }

    render() {
        return this.props.posts.map(post => {
            
            switch(post.template){

                case 'page-experience.php': 
                    return (
                            <div id="container-react" key={ post.id } >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <Experience id={ post.id } />
                                </div>
                            </div>
                        );
                case 'page-experience-medina.php':
                    return (
                            <div id="container-react" key={ post.id } >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <ExperienceMedina id={ post.id } />
                                </div>
                            </div>
                        );
                case 'page-contact.php': 
                    return (
                            <div id="container-react" key={ post.id } >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <Contact id={ post.id } />
                                </div>
                            </div>
                        );
                case 'page-create-account.php':
                    return (
                            <div id="container-react" key={ post.id } >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <CreateAccount id={ post.id } />
                                </div>
                            </div>
                        );
                case 'page-profile.php':
                    return (
                            <div id="container-react" key={ post.id } >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <Profile id={ post.id } />
                                </div>
                            </div>
                        );
                case 'page-profile-rewards.php':
                    return (
                            <div id="container-react" key={ post.id } >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <ProfileRewards id={ post.id } />
                                </div>
                            </div>
                        );
                case 'page-signin.php':
                    return (
                            <div id="container-react" key={ post.id } >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <Signin id={ post.id } />
                                </div>
                            </div>
                        );
                case 'page-donation.php':
                    return (
                            <div id="container-react" key={ post.id } >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <Donation id={ post.id } />
                                </div>
                            </div>
                        );
                case 'page-about.php':
                    return (
                            <div id="container-react" key={ post.id } >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <About id={ post.id } />
                                </div>
                            </div>
                        );
                case 'page-faq.php':
                    return (
                            <div id="container-react" key={ post.id } >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <Faq id={ post.id } />
                                </div>
                            </div>
                        );
                case 'page-privacy-policy.php':
                    return (
                            <div id="container-react" key={ post.id } >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <PrivacyPolicy id={ post.id } />
                                </div>
                            </div>
                        );
                case 'page-rules-terms.php':
                    return (
                            <div id="container-react" key={ post.id } >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <RulesTerms id={ post.id } />
                                </div>
                            </div>
                        );
                case 'page-lost-password.php':
                    return (
                            <div id="container-react" key={ post.id } >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <LostPassword pathname={this.props.location.pathname} recoveryKey={this.props.location.search} id={ post.id } />
                                </div>
                            </div>
                        );
                case 'page-enter-now.php':
                    return (
                            <div id="container-react" key={ post.id } >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <EnterNow id={ post.id } search={this.props.location.search}/>
                                </div>
                            </div>
                        );
                case 'page-alternative-method-of-entry.php':
                return (
                        <div id="container-react" key={ post.id } >
                            <div id="menu-sidebar">
                                <Menu name='main_menu' />
                            </div>
                            <div className="content-react">
                                <AlternativeMethodOfEntry id={ post.id } search={this.props.location.search} />
                            </div>
                        </div>
                    );
                case 'winner-listing.php':
                return (
                        <div id="container-react" key={ post.id } >
                            <div id="menu-sidebar">
                                <Menu name='main_menu' />
                            </div>
                            <div className="content-react">
                                <WinnerListing id={ post.id } />
                            </div>
                        </div>
                    );
                case 'page-thankyou.php':
                return (
                    <div id="container-react" key={ post.id } >
                        <div id="menu-sidebar">
                            <Menu name='main_menu' />
                        </div>
                        <div className="content-react">
                            <ThankYou id={ post.id } search={this.props.location.search} />
                        </div>
                    </div>
                );
                default:
                    if (post.type == 'healthmakers') {
                        return (
                            <div id="container-react" key={ post.id } >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <WinnerSingle id={ post.id } />
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div id="container-react" key={post.id} >
                                <div id="menu-sidebar">
                                    <Menu name='main_menu' />
                                </div>
                                <div className="content-react">
                                    <section className="template-single">
                                        <Header logo='' buttonColor='' transparent='' />
                                        <Main />
                                        <Footer />
                                    </section>
                                </div>
                            </div>
                        );
                    }

            }
        })
    }
}

function mapStateToProps({posts}) {
    return {posts};
}

export default connect(mapStateToProps,  {fetchPost})(Single)








