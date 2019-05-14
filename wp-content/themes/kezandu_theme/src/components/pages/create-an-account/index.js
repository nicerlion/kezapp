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
import { fetchAcf, fetchCustomer, fetchCustomerRegister, fetchMailVerification} from '../../../actions';
import Spinner from '../../spinner';
import { Field, reduxForm } from 'redux-form';
import { EmailValidation } from '../../../utils/Validation';
import Facebook from '../../facebook-login';


class CreateAccount extends Component {

    constructor() {
        super();
        this.state = {
            loading: '',
            registerEmail: '',
            active: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.customer.length && nextProps.customer.length) {
            if (nextProps.customer[0].message == "User already exists") {
                this.setState({ loading: (<div className='message message-info message-error' >There is already an account with this email.</div>) });
            } else {
                this.setState({ loading: ''});
            }
        }
    }

    componentDidMount() {

        if (typeof (Storage) !== "undefined") {
            if (localStorage.getItem("registerEmail") !== null && localStorage.getItem("registerEmail") !== "null") {
                let registerEmail = localStorage.getItem("registerEmail");
                localStorage.setItem("registerEmail", null);

                this.setState({ registerEmail: registerEmail, active: 'none'  });

                this.props.initialize({
                    email: registerEmail,
                });
                this.props.fetchMailVerification(registerEmail, 'none');
            }
        }

        let obj = {
            id: this.props.id,
            pages: false
        };
        if (this.props.acf.length) {
            obj.pages = this.props.acf[0];
        }
        this.props.fetchAcf(obj);

        if (typeof (Storage) !== "undefined") {
            let id = localStorage.getItem("wordpress_logged_user");
            this.props.fetchCustomer(id);
        }
    }

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div>
                    <div className='message message-error'>{error}</div>
                </div>
            )
        }
    }

    renderInput = ({ input, placeholder, type, meta, active }) => {
        if (active == 'none') {
            return (
                <div className="form-group">
                    <input {...input} autoComplete="off" className="form-control" type={type} placeholder={placeholder} disabled/>
                    {this.renderError(meta)}
                </div>
            )
        }

        return (
            <div className="form-group">
                <input {...input} autoComplete="off" className="form-control" type={type} placeholder={placeholder} />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (event) => {
        this.setState({ loading: (<div id="loading" active="true" className="loading-spinner"><Spinner /></div>) });
        let obj = {};
        obj.email = event.email;
        obj.password = event.password;
        this.props.fetchCustomerRegister(obj);
    };

    render(){

        if (this.props.customer.length) {
            if (this.props.customer[0].id > 0) {
                location.href = '/profile';
            }
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
            const redirection = '/profile';

            return(
                <div className="signin">
                    <Header logo={logo} buttonColor={this.props.acf[0][this.props.id].button_color ? this.props.acf[0][this.props.id].button_color : ''} transparent={this.props.acf[0][this.props.id].transparent_header ? 'true' : ''} />
                    <section className="first-section" style={firstSectionStyles}>
                        <div className="container">
                            <div className="box-container-form">
                                <div className="box-inside-container-form">
                                    <div className="first-mini-box-form">
                                        <h4>{this.props.acf[0][this.props.id].title ? this.props.acf[0][this.props.id].title : ''}</h4>
                                        <div className="signin-form">
                                            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                                <Field name="email" component={this.renderInput} type="mail" placeholder="Email" active={this.state.active} />
                                                <Field name="password" component={this.renderInput} type="password" placeholder="Password" />
                                                <div className="blue-button">
                                                    <button className="primary-button">{this.props.acf[0][this.props.id].button_text ? this.props.acf[0][this.props.id].button_text : 'CREATE MY ACCOUNT'}</button>
                                                </div>
                                                {this.state.loading}
                                            </form>
                                        </div>
                                    </div>
                                    <div  className="second-mini-box-form button-facebook-create-account">
                                        <Facebook redirection={redirection} />
                                    </div>
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

const validate = (formValues) => {
    const errors = {};
    if (!formValues.email) {
        errors.email = "Please enter an email address";
    } else if (EmailValidation(formValues.email)) {
        errors.email = "Please enter a valid email address";
    }

    if (!formValues.password) {
        errors.password = "Please enter your password";
    }
    else if (formValues.password.length < 8) {
        errors.password = "Please enter a password of 8 characters minimun";
    }
    return errors;
}

function mapStateToProps({acf, customer}) {
    return {acf, customer};
}

const CreateAccountReduxForm = reduxForm({ form: 'CreateAccount', validate })(CreateAccount);

export default connect(mapStateToProps, { fetchAcf, fetchCustomer, fetchCustomerRegister, fetchMailVerification })(CreateAccountReduxForm);