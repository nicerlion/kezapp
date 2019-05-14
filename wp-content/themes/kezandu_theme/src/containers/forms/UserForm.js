import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { EmailValidation, PhoneValidation } from '../../utils/Validation';
import countryList from '../../utils/countryList';
import PaypalButton from '../../components/paypal';
import StripePayment from '../../components/stripe';
import { fetchCustomerInfo, fetchCustomerLogout, fetchMailVerificationTwo, fetchLoginTwo } from '../../actions';
import Spinner from '../../components/spinner';
import Facebook from '../../components/facebook-login';

class UserForm extends Component {
    constructor() {
        super();
        this.state = {
            welcome: '',
            loading: '',
            message: '',
            process: null,
            signIn: '',
            active: '',
            paymentMethod: '',
            count: 20,
            countForm: 0,
            creditCard: '',
            paypal: '',
            formValidation: false,
            lostPassword: '',
            form: {
                email: '',
                firstName: '',
                lastName: '',
                country: '',
                phoneNumber: '',
                zipCode: '',
            }
        }
    }

    componentDidMount() {
        if (this.props.userId > 0 && this.props.userMail) {
            let objInfo = {
                id: this.props.userId,
                email: this.props.userMail,
                info: 'info',
            };
            this.setState({active: 'none'});
            fetchCustomerInfo(objInfo).then(info => {
                this.props.initialize({
                    firstName: info.first_name,
                    lastName: info.last_name,
                    email: info.email,
                    date: info.date_of_birth,
                    country: info.country,
                    phoneNumber: info.phone_number,
                    zipCode: info.billing_zip,
                });
            });
        }else {
            this.props.initialize({
                country: 'United States',
            })
        }
    }

    entryDetail() {
        return (
            <div>
                <div className="mini-box-pay-container">
                    <div className="mini-box-pay">
                        <div className="image-box-pay">
                            <img src={this.props.experience.background_image_sect1} />
                        </div>
                        <div className="mini-box-pay-content">
                            <h4 className="pay-title blue-color" dangerouslySetInnerHTML={{__html: this.props.experience.title_sect1}}></h4>
                            <p className="number-pay light-blue">{ this.props.statedata.entry.entries }</p>
                            <h4 className="one-predet-text blue-color">entries</h4>
                            <p className="pay-text">You will receive <br />{ this.props.statedata.entry.entries } entries to win!</p>
                            <h4 className="pay-total blue-color">Total ${ this.props.statedata.entry.price }</h4>
                        </div>
                    </div>
                </div>  
                <div className="mini-box-pay-text">  
                    <p>By continuing, you agree to our <Link to="/terms-of-use/">Term of Use</Link> Our <Link to="/privacy-policy/">Privacy Policy</Link>, and our <Link to="/refund-policy">Refund Policy</Link></p>
                </div>
            </div> 
        )
    }

    renderError({ error, touched }) {
        if ( touched && error ) {
            return(
                <div>
                    <div className='message message-error'>{ error }</div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta, type, active, id }) => {
        if (active == 'none') {
            return (
                <div>
                    <input {...input} autoComplete="off" type={type} className="form-control" disabled id={id} />
                    <label className="style-label"><span className="label-content"><span className="label-one">{label}</span><span className="label-two"></span></span></label>
                    {this.renderError(meta)}
                </div>
            )
        }

        return (
            <div>
                <input {...input} autoComplete="off" type={type} className="form-control" id={id} />
                <label className="style-label"><span className="label-content"><span className="label-one">{label}</span><span className="label-two"></span></span></label>
                { this.renderError(meta) }
            </div>
        )
    }

    selectOptions(options) {
        return options.map ((option) => {
            return (
                <option key={option.code}  value={option.name}>{option.name}</option>
            )
        });
    }

    renderSelect = ({input, meta, options, label, id}) => {
        return (
            <div className="">
                <select {...input} autoComplete="off" id={id} >
                    {this.selectOptions(options)};
                </select>
                <label className="style-label"><span className="label-content"><span className="label-one">{label}</span><span className="label-two"></span></span></label>
                { this.renderError(meta) }
            </div>
        )
    }

    onSubmit = (event) => {
        let count = this.state.count
        this.setState({
            countForm: count,
            formValidation: true,
            form: {
                email: event.email,
                firstName: event.firstName,
                lastName: event.lastName,
                country: event.country,
                phoneNumber: event.phoneNumber,
                zipCode: event.zipCode,
            }
        });
    };
    
    onClick = (method) => {
        let number = this.state.count;
        number = number + 1;

        let activeCreditCard = '';
        let activePaypal = '';
        if (method == 'creditCard') {
            activeCreditCard = 'active'
        } else if (method == 'paypal') {
            activePaypal = 'active'
        }

        this.setState({
            count: number,
            paymentMethod: method,
            creditCard: activeCreditCard,
            paypal: activePaypal,
        });
    }

    handleOnChange = (e, string) => {
        let number = this.state.count;
        number = number + 20;
        this.setState({
            paymentMethod: '',
            count: number,
            creditCard: '',
            paypal: '',
            formValidation: false,
        });

        if (string == 'email') {
            this.setState({process: null});
        }
    }

    handleOnBlur = (e) => {
        if (this.state.active != 'none') {
            fetchMailVerificationTwo(e.currentTarget.defaultValue, 'user').then(process => {
                if (process.message == 'registered mail') {
                    let welcome = process.first_name != '' ? ', ' + process.first_name + '!' : '';
                    this.setState({
                        welcome: welcome,
                        process: process,
                        signIn: 'registered mail',
                    });
                } else {
                    this.setState({ process: null, signIn: '', message: '', welcome: '', lostPassword: '',});
                }
            });
        }
    }

    signIn() {
        return (
            <div className="sign-in-donation">
                <h4>Welcome back{this.state.welcome}</h4>
                <p>Login to your account, or <span className="guest" onClick={() => { this.onClickGuest(); }}>checkout as guest</span>,</p>
                <div className="row">
                    <div className="col">
                        <div className="div-form">
                            <input name="password" id="sign-in-donation-password" type="password" autoComplete="off" className="form-control" onChange={() => this.OnChangePassword()}/>
                            <label className="style-label"><span className="label-content"><span className="label-one">Enter Password</span><span className="label-two"></span></span></label>
                            {this.state.message}
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="buttun-sign-in" onClick={() => { this.onClickSignIn(); }}>
                            <span>sign in</span>
                        </div>
                    </div>
                    <div className="col-12 col-md-auto">
                        <span className="text-sign-in">or</span>
                    </div>
                    <div className="col-12 col-md-auto donation-facebook">
                        <Facebook redirection="#" />
                    </div>
                </div>
                {this.state.lostPassword}
                {this.state.loading}
            </div>
        )
    }

    guest() {
        return (
            <div className="sign-in-donation text-guest">
                <p>Great! Continue check out below.</p>
            </div>
        )
    }
    
    OnChangePassword = () => {
        this.setState({ message: '', lostPassword: '',});
    }

    onClickSignIn = () => {
        this.setState({ lostPassword: '', message: '', loading: (<div id="loading" active="true" className="loading-spinner"><Spinner /></div>) });
        let password = document.getElementById("sign-in-donation-password").value;
        let obj = {
            email: this.state.process.email,
            password: password
        };

        if (password) {
            fetchLoginTwo(obj).then(login => {
                if (login.message == 'login') {
                    location.reload();
                } else if (login.message == 'error, the user could not log in') {
                    this.setState({
                        lostPassword: (
                            <div className="content-lost-password">
                                <Link to="/lost-password/" className="">Forgot your password?</Link>
                            </div>
                        ), 
                        message: (<div className="message message-error">The password seems to be incorrect</div>),
                        loading: '' 
                    });
                }
            });
        } else {
            this.setState({lostPassword: '', message: (<div className="message message-error">Please enter your password</div>), loading: '' });
        }
    }

    onClickGuest = () => {
        this.setState({ lostPassword: '', message: '', loading: '', signIn: 'guest' });
    }

    payment = () => {
        if ( this.props.valid && (this.props.initialized || this.props.anyTouched) 
            && (document.getElementById('email')) && (document.getElementById('firstName')) 
            && (document.getElementById('lastName')) && (document.getElementById('country')) 
            && (document.getElementById('phoneNumber')) && (document.getElementById('zipCode'))
            ) {

            let email = document.getElementById('email').value;
            let firstName = document.getElementById('firstName').value;
            let lastName = document.getElementById('lastName').value;
            let country = document.getElementById('country').value;
            let phoneNumber = document.getElementById('phoneNumber').value;
            let zipCode = document.getElementById('zipCode').value;

            let form = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                country: country,
                phoneNumber: phoneNumber,
                zipCode: zipCode
            };

            return (
                    <div className="row payment-container">
                        <div className="form-group col-6">
                            <StripePayment 
                                amount={this.props.statedata.entry.realprice ? parseInt(this.props.statedata.entry.realprice) : null} 
                                entries={this.props.statedata.entry.realentries ? this.props.statedata.entry.realentries : null} 
                                entry_id={this.props.statedata.entry.id ? this.props.statedata.entry.id : 0} 
                                form={form} 
                                userId={this.props.userId ? this.props.userId : 0} 
                                exp_description={this.props.experience.title_sect1 ? this.props.experience.title_sect1 : ''} 
                                exp_id={this.props.exp_id ? this.props.exp_id : 0} 
                            />
                        </div>
                        <div className="form-group col-6">
                            <PaypalButton 
                                amount={this.props.statedata.entry.realprice ? this.props.statedata.entry.realprice : null} 
                                entries={this.props.statedata.entry.realentries ? this.props.statedata.entry.realentries : null} 
                                entry_id={this.props.statedata.entry.id ? this.props.statedata.entry.id : 0} 
                                form={form} 
                                userId={this.props.userId ? this.props.userId : 0} 
                                exp_description={this.props.experience.title_sect1 ? this.props.experience.title_sect1 : ''} 
                                exp_id={this.props.exp_id ? this.props.exp_id : 0} 
                            />
                        </div>
                    </div>
                );
        } else {
            return (
                <div className="row payment-container">
                    <div className="form-group col-6">
                        <div className="pay-button">CREDIT CARD</div>
                    </div>
                    <div className="form-group col-6">
                        <div className="paypal-button">
                            <div className="paypal-button-img">
                                <img src="/wp-content/themes/kezandu_theme/img/paypal.png" alt="paypal" />
                            </div>
                            <span className="paypal-button-text-inactive">La forma rápida y segura de pagar</span>
                        </div>
                    </div>
                </div>
            );
        }
    }

    logout() {
        fetchCustomerLogout().then(info => {
            location.reload();
        });
        localStorage.setItem("wordpress_logged_user", 0);
    }

    render() {
        return (
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                        <div className="box-container-pro">
                            <div className="box-inside-container-pro container-box-485px">
                                <div className="first-mini-box-pro">
                                    <div className="personal-info-profile">
                                        <h4>Give us your info</h4>
                                            <form className={this.state.formValidation ? 'full-form' : ''} onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                            <div className="row">
                                                <div className="form-group col-12">
                                                    <div className="div-form">
                                                    <Field name="email" id="email" type="email" component={this.renderInput} onChange={(e) => this.handleOnChange(e, 'email')} onBlur={(e) => this.handleOnBlur(e)} active={this.state.active} label="Email"/>
                                                    </div>
                                                    {this.props.userMail ? <div className="quest-form"><span>Not you? <span className="logout" onClick={() => { this.logout() }}>Log Out</span></span></div> : ''}
                                                </div>
                                            </div>
                                            {this.state.signIn == 'registered mail' ? this.signIn() : ''}
                                            {this.state.signIn == 'guest' ? this.guest() : ''}
                                            <div className="row">
                                                <div className="form-group col-6">
                                                    <div className="div-form">
                                                        <Field name="firstName" id="firstName" type="text" component={this.renderInput} onChange={(e) => this.handleOnChange(e, 'firstName')} active="" label="First Name"/>
                                                    </div>
                                                </div>
                                                <div className="form-group col-6">
                                                    <div className="div-form">
                                                        <Field name="lastName" id="lastName" type="text" component={this.renderInput} onChange={(e) => this.handleOnChange(e, 'lastName')} active="" label="Last Name"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-6">
                                                    <div className="div-form">
                                                        <Field name="country" id="country" type="text" component={this.renderSelect} onChange={(e) => this.handleOnChange(e, 'country')} active="" label="Country" options={countryList}/>
                                                    </div>
                                                </div>
                                                <div className="form-group col-6">
                                                    <div className="div-form">
                                                        <Field name="phoneNumber" id="phoneNumber" type="number" component={this.renderInput} onChange={(e) => this.handleOnChange(e, 'phoneNumber')} active="" label="Phone Number"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-6">
                                                    <div className="div-form">
                                                        <Field name="zipCode" id="zipCode" type="number" component={this.renderInput} onChange={(e) => this.handleOnChange(e, 'zipCode')} active="" label="Billing Zip Code" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <span className="pay-witdh">Pay with</span>
                                            </div>
                                        </form>
                                        {this.payment()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                        {this.entryDetail()}
                    </div>
                </div>            
        )
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.email) {
        errors.email = "Please enter an email address";
    } else if (EmailValidation(formValues.email)) {
        errors.email = "Please enter a valid email address";
    }
    if (!formValues.firstName) {
        errors.firstName = "Please enter your first name";
    }
    if (!formValues.lastName) {
        errors.lastName = "Please enter your last name";
    }
    if (formValues.country == 'Choose a country' || !formValues.country) {
        errors.country = "Please enter your country";
    }
    if (!formValues.phoneNumber) {
        errors.phoneNumber = "Please enter your phone number";
    } else if (PhoneValidation(formValues.phoneNumber)) {
        errors.phoneNumber = "Please enter a valid phone number";
    }
    return errors;
}

export default reduxForm({
    form: 'userForm',
    validate
})(UserForm);