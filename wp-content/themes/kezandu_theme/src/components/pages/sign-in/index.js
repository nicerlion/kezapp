import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../../header';
import Footer from '../../footer';
import {fetchAcf, fetchNoPassword} from '../../../actions';
import Spinner from '../../spinner';
import LoginFormPart1 from '../../../containers/forms/LoginFormPart1';
import Facebook from '../../facebook-login';

class Signin extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: 'mailVerification',
            logAction: null,
            message: null,
            check: null
        }
    }

    componentDidMount() {
        let obj = {
            id: this.props.id,
            pages: false
        };
        if (this.props.acf.length) {
            obj.pages = this.props.acf[0];
        }
        this.props.fetchAcf(obj);


        if (typeof (Storage) !== 'undefined') {
            if (localStorage.getItem('wp_log_action') !== null && localStorage.getItem('wp_log_action') !== 'null') {
                let logAction = localStorage.getItem('wp_log_action');
                localStorage.setItem('wp_log_action', null)
                this.setState({ logAction: logAction });
            }
        }
    }

    onClickAnotherEmail = () => {
        this.setState({ logAction: null, check: null, message: null });
    }

    onClickNoPassword = (check) => {
        this.setState({ message: (<div id="loading" active="true" className="loading-spinner"><Spinner /></div>) });
        fetchNoPassword(this.state.logAction).then(response => {
            if (response.message == 'error, the email could not be sent') {
                this.setState({ 
                    message: (<div className='message message-error'>The email could not be sent. Please try again later.</div>) 
                });
            } else {
                this.setState({ check: check, message: null});
            }
        });
    }

    contentLogin() {

        let redirection = '/profile';

        if (this.state.logAction == 'facebook') {

            return (
                <div className="box-inside-container-form button-facebook-sign-in">
                    <div className="first-mini-box-login">
                        <h4>Please login with Facebook</h4>
                        <p>It looks like you're signed up with Kezandu through your Facebook account.</p>
                        <Facebook redirection={redirection} />
                        <p className="another-email" onClick={() => { this.onClickAnotherEmail(); }}>Try another email address?</p>
                    </div>
                </div>
            );

        } else if (this.state.logAction != null && this.state.check == 'Check Email') {

            return (
                <div className="box-inside-container-form">
                    <div className="first-mini-box-login">
                        <h4>Check your email</h4>
                        <p>We just sent a link to {this.state.logAction} that will sign you in!</p>
                        <button className="primary-button" onClick={() => { this.onClickNoPassword('Not Received'); }}>I didn't receive it</button>
                        {this.state.message}
                        <p className="another-email" onClick={() => { this.onClickAnotherEmail(); }}>Try another email address?</p>
                    </div>
                </div>
            );

        } else if (this.state.logAction != null && this.state.check == 'Not Received') {

            return (
                <div className="box-inside-container-form">
                    <div className="first-mini-box-login">
                        <h4>Don't see our email?</h4>
                        <p>Try checking your spam folder. You can also resend the link below.</p>
                        <button className="primary-button" onClick={() => { this.onClickNoPassword('Check Email'); }}>Resend link</button>
                        {this.state.message}
                        <p className="another-email" onClick={() => { this.onClickAnotherEmail(); }}>Try another email address?</p>
                    </div>
                </div>
            );

        } else if (this.state.logAction != null) {

            return (
                <div className="box-inside-container-form">
                    <div className="first-mini-box-login">
                        <h4>No password set</h4>
                        <p>You haven't set a password for your account yet. No worries. We'll email you a link to sign you in.</p>
                        <button className="primary-button" onClick={() => { this.onClickNoPassword('Check Email'); }}>Send link</button>
                        {this.state.message}
                        <p className="another-email" onClick={() => { this.onClickAnotherEmail(); }}>Try another email address?</p>
                    </div>
                </div>
            );

        } else {

            return (
                <div className="box-inside-container-form">
                    <div className="first-mini-box-form">
                        <h4>{this.props.acf[0][this.props.id].title ? this.props.acf[0][this.props.id].title : ''}</h4>
                        <div className="signin-form">
                            <LoginFormPart1 />
                            <div className="checkbox">
                                <p><Link to="/lost-password">{this.props.acf[0][this.props.id].text_content ? this.props.acf[0][this.props.id].text_content : ''}</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="second-mini-box-form button-facebook-sign-in">
                        <Facebook redirection={redirection} />
                        <div className="checkbox">
                            <span>Not a member? <Link to="/create-an-account">Create an account</Link></span>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render(){

        const shareUrl = window.location.href;
        const title = 'Facebook';
        if (this.props.acf.length && this.props.acf[0][this.props.id]) {

            let logo = this.props.acf[0][this.props.id].logo ? this.props.acf[0][this.props.id].logo : '';

            if (logo === 'other') {
                logo = this.props.acf[0][this.props.id].other_logo ? this.props.acf[0][this.props.id].other_logo : '';
            }

            const backgroundImage = this.props.acf[0][this.props.id].background_image ? this.props.acf[0][this.props.id].background_image : '';
            const firstSectionStyles = {
                backgroundImage: 'url(' + backgroundImage + ')',
            };

            return(
                <div className="signin">
                    <Header logo={logo} buttonColor={this.props.acf[0][this.props.id].button_color ? this.props.acf[0][this.props.id].button_color : ''} transparent={this.props.acf[0][this.props.id].transparent_header ? 'true' : ''} />
                    <section className="first-section" style={firstSectionStyles}>
                        <div className="container">
                            <div className="box-container-form">
                                {this.contentLogin()}
                            </div>
                        </div>
                    </section>
                    <Footer logo={this.props.acf[0][this.props.id].footer_image ? this.props.acf[0][this.props.id].footer_image.url : ''} titleColor={this.props.acf[0][this.props.id].footer_title_color ? this.props.acf[0][this.props.id].footer_title_color : '#fff'} whiteFooter={this.props.acf[0][this.props.id].footer_background_color ? this.props.acf[0][this.props.id].footer_background_color : 'false'} />
                </div>
            )
        } else {
            return (
                <Spinner />
            );
        }
    }
}

function mapStateToProps({acf}) {
    return {acf};
}

export default connect(mapStateToProps, { fetchAcf})(Signin);