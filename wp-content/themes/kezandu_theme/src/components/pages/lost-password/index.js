import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import {
    FacebookShareButton,
    GooglePlusShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
  } from 'react-share';

import Header from '../../header';
import Footer from '../../footer';
import {fetchAcf, fetchLostPassword, fetchLostPasswordConfirmation, fetchChangePassword} from '../../../actions';
import Spinner from '../../spinner';


class LostPassword extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.process.length && nextProps.process[0].message == "change_password") {
            this.setState({
                email: '',
                password: '',
                confirmPassword: '',
            });
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
            
        if (this.props.process.length && this.props.process[0].active == "change_password") {
        } else if (this.props.recoveryKey != '') {
            this.props.fetchLostPasswordConfirmation(this.props.recoveryKey);
        }
    }

    handleEmail(text) {
        this.setState({email:text.target.value});
    }

    handlePassword(text) {
        this.setState({password:text.target.value});
    }

    handleConfirmPassword(text) {
        this.setState({confirmPassword:text.target.value});
    }

    lostPassword() {
        this.props.fetchLostPassword(this.state.email, this.props.pathname);
        let loading = document.getElementById('loading');
        if (loading) {
            loading.attributes.active.value = 'true';
        }
        document.getElementById('process').attributes.key.value = 'lost-password'
    }

    changePassword() {
        
        let obj = {
            recoveryKey: this.props.process[0].key,
            login: this.props.process[0].user,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        };
        this.props.fetchChangePassword(obj);
        let loading = document.getElementById('loading');
        if (loading) {
            loading.attributes.active.value = 'true';
        }
        document.getElementById('process').attributes.key.value = 'change-password'
    }
    
    messageError(id, empty) {
        id = id ? id : ''
        empty = empty ? empty : '';
        let loading = document.getElementById('loading');
        if (loading) {
            loading.attributes.active.value = 'false';
        }
        document.getElementById('process').attributes.key.value = 'false'
        if (id != '') {
            document.getElementById(id).select();
        }
        if (empty != '') {
            document.getElementById('password').value = '';
        }
    }

    messageEmail() {

        if (this.props.process.length) {
            let key = document.getElementById('process').attributes.key.value;
            if (key == 'lost-password') {
                if (this.props.process[0].message == "error, invalid email address") {
                    this.messageError('email');
                    return (<p className="message message-error">Invalid email address</p>);
                } else if (this.props.process[0].message == "error, there is no email parameter") {
                    this.messageError('email');
                    return (<p className="message message-error">Email required</p>);
                }
            }
        }
        return '';
    }

    messagePassword() {

        if (this.props.process.length) {
            let key = document.getElementById('process').attributes.key.value;
            if (key == 'change-password') {
                if (this.props.process[0].message == "error, there is no password parameter") {
                    this.messageError('password');
                    return (<p className="message message-error">Required field</p>);
                }
            }
        }
        return '';
    }

    messageConfirmPassword() {

        if (this.props.process.length) {
            let key = document.getElementById('process').attributes.key.value;
            if (key == 'change-password') {
                if (this.props.process[0].message == "error, there is no confirmPassword parameter") {
                    this.messageError('confirmPassword');
                    return (<p className="message message-error">Required field</p>);
                } else if (this.props.process[0].message == "error, the password and confirmation password do not match") {
                    this.messageError('confirmPassword');
                    return (<p className="message message-error message-relative">The confirmation of the password does not match.</p>);
                }
            }
        }
        return '';
    }

    messageAnswer() {

        if (this.props.process.length) {
            let key = document.getElementById('process').attributes.key.value;
            if (key == 'lost-password') {
                if (this.props.process[0].message == "lost_password") {
                    this.messageError('');
                    return (<p className="message message-answer message-true">Check your email for the confirmation link.</p>);
                } else if (this.props.process[0].message == "error, the email could not be sent" || this.props.process[0].message == "error, key") {
                    this.messageError('');
                    return (<p className="message message-answer message-error">The mail could not be sent, please try later</p>);
                } 
            } else if (key == 'change-password') {
                if (this.props.process[0].message == "change_password") {
                    this.messageError('', 'email');
                    return (<p className="message message-answer message-true">Your password was successfully changed.</p>);
                }
            }
        }
        return '';
    }

    lostPasswordContent() {


        if (this.props.process.length && this.props.process[0].message != "change_password" && (this.props.process[0].message == "lost_password_confirmation" || this.props.process[0].active == "change_password")) {

            return (
                <div className="first-mini-box-form">
                    <h4>{this.props.acf[0][this.props.id].title ? this.props.acf[0][this.props.id].title : ''}</h4>
                    <div className="lost-password-form">
                        <div className="form-group">
                            <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={(text) => { this.handlePassword(text) }} />
                            {this.messagePassword()}
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" onChange={(text) => { this.handleConfirmPassword(text) }} />
                            {this.messageConfirmPassword()}
                        </div>
                        <div className="blue-button">
                            <input type="submit" className="primary-button" onClick={() => { this.changePassword() }} value={this.props.acf[0][this.props.id].button_text ? this.props.acf[0][this.props.id].button_text : ''} />
                        </div>
                        {this.messageAnswer()}
                        <div id="loading" active="false" className="loading-spinner"><Spinner /></div>
                    </div>
                </div>
            );
        }

        let passwordChangeMessage = '';
        if (this.props.process.length && (this.props.process[0].message == "change_password")) {
            this.messageError('');

            return (
                <div className="first-mini-box-form">
                    <h4>{this.props.acf[0][this.props.id].title ? this.props.acf[0][this.props.id].title : ''}</h4>
                    <div className="lost-password-form">
                        <p className="margin-b-15 message message-answer message-true">Your password change has been successful, you can now log in.</p>
                        <div className="blue-button"><Link to="/sign-in" className="btn btn-default" >Sign In</Link></div>
                    </div>
                </div>
            );

        } else if (this.props.process.length && (this.props.process[0].message == "error, invalid password reset link" || this.props.process[0].message == "error, there is no recoveryKey parameter")) {
            passwordChangeMessage = (<p className="margin-b-15 message message-answer message-error">Your password reset link appears to be invalid. Please request a new link below.</p>);
            this.messageError('');
        }

        return (
            <div className="first-mini-box-form">
                <h4>{this.props.acf[0][this.props.id].title ? this.props.acf[0][this.props.id].title : ''}</h4>
                <div className="lost-password-form">
                    {passwordChangeMessage}
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" name="email" placeholder="Email" onChange={(text) => { this.handleEmail(text) }} />
                        {this.messageEmail()}
                    </div>
                    <div className="blue-button">
                        <input type="submit" className="primary-button" onClick={() => { this.lostPassword() }} value={this.props.acf[0][this.props.id].button_text ? this.props.acf[0][this.props.id].button_text : ''} />
                    </div>
                    {this.messageAnswer()}
                    <div id="loading" active="false" className="loading-spinner"><Spinner /></div>
                </div>
            </div>
        );
        
    }

    render(){

        let id = 0;
        if (typeof (Storage) !== "undefined") {
            id = localStorage.getItem("wordpress_logged_user");
        }

        if (this.props.process.length && this.props.process[0].message == "change_password" && this.props.process[0].id > 0) {
            localStorage.setItem("wordpress_logged_user", this.props.process[0].code);
        } else if (id != 0) {
            return (<Redirect to='/profile' />);
        }
        
        if (this.props.process.length && this.props.process[0].active == "lost_password_confirmation" && this.props.recoveryKey != '') {
            return (<Redirect to={this.props.pathname} />);
        }

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
                <div className="lost-password">
                    <Header logo={logo} buttonColor={this.props.acf[0][this.props.id].button_color ? this.props.acf[0][this.props.id].button_color : ''} transparent={this.props.acf[0][this.props.id].transparent_header ? 'true' : ''} />
                    <section className="first-section" style={firstSectionStyles}>
                        <div className="container">
                            <div className="box-container-form">
                                <div className="box-inside-container-form">
                                    {this.lostPasswordContent()}
                                </div>
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

function mapStateToProps({acf, customer, process}) {
    return {acf, customer, process};
}

export default connect(mapStateToProps, { fetchAcf, fetchChangePassword, fetchLostPasswordConfirmation, fetchLostPassword})(LostPassword);