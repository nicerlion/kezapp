import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Recaptcha from 'react-recaptcha';

import {EmailValidation} from '../../utils/Validation';
import { handleAlternativeEntry } from '../../actions';
import countryList from '../../utils/countryList';
import Spinner from '../../components/spinner';

class AlternativeMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: '',
            recaptcha: true,
            recaptchaMessage: '',
        };

        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.callback = this.callback.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
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

    renderInput = ({ input, label, placeholder, meta, type }) => {
        return (
            <div className="form-group">
                <div className="div-form">
                    <input {...input} autoComplete="off" className="form-control" placeholder={ placeholder } type={type}/>
                    <label className="style-label"><span className="label-content"><span className="label-one">{label}</span><span className="label-two"></span></span></label>
                    { this.renderError(meta) }
                </div>
            </div>
        )
    }

    selectOptions(options) {
        return options.map((option) => {
            return (
                <option key={ option.code } value={ option.name } >{ option.name }</option>
            );
        });
    }

    renderSelect = ({ input, meta, options, label }) => {
        return (
            <div className="form-group">
                <select {...input} autoComplete="off" className="form-control">
                    {this.selectOptions(options)};
                </select>
                <label className="style-label"><span className="label-content"><span className="label-one">{label}</span><span className="label-two"></span></span></label>
                { this.renderError(meta) }
            </div>
        )
    }

    renderArea = ({ input, placeholder, meta, rows }) => {
        return (
            <div className="form-group">
                <textarea {...input} autoComplete="off" className="form-control" placeholder={ placeholder } rows={ rows }/>
                { this.renderError(meta) }
            </div>
        )
    }

    onSubmit = (event) => {
        if (this.state.recaptcha) {
            this.setState({ loading: (<div id="loading" active="true" className="loading-spinner"><Spinner /></div>) });
            let form = {
                firstName: event.firstName,
                lastName: event.lastName,
                email: event.email,
                phone: event.phone,
                country: event.country,
                city: event.city,
                zip: event.zip,
                age: event.age,
            };

            handleAlternativeEntry(form, this.props.expId).then(process => {
                if (process.message == "successful process") {
                    this.setState({ loading: (<div className='message message-good' >We Have Received Your Entry <br /> Your Confirmation # is: {process.order}</div>) });
                } else if (process.message == "error, this method has already been used") {
                    this.setState({ loading: (<div className='message message-error' >Sorry, we only accept this method once per experience</div>) });
                } else {
                    this.setState({ loading: (<div className='message message-error' >There has been an error please try later</div>) });
                }
            });
        } else {
            this.setState({
                recaptchaMessage: (<div className='message message-error'>Recaptcha required</div>),
            });
        }
    }

    recaptchaLoaded() {
        this.setState({
            recaptcha: false,
        });
    }

    verifyCallback() {
        this.setState({
            recaptcha: true,
            recaptchaMessage: '',
        });
    }

    expiredCallback() {
        this.setState({
            recaptcha: false,
        });
    }

    callback() {
    }

    render() {
            
        return (
            <form onSubmit={ this.props.handleSubmit(this.onSubmit)}>
                <div className="form-group">
                    <div className="div-form">
                        <Field name="firstName" type="text" component={ this.renderInput } label="First Name"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="div-form">
                        <Field name="lastName" type="text" component={ this.renderInput } label="Last Name"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="div-form">
                        <Field name="email" type="email" component={ this.renderInput } label="Email"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="div-form">
                        <Field name="phone" type="number" component={ this.renderInput } label="Phone"/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-6 margin-bottom-0">
                        <div className="div-form">
                            <Field name="country" component={this.renderSelect} options={countryList} label="Country"/>
                        </div>
                    </div>
                    <div className="form-group col-6 margin-bottom-0">
                        <div className="div-form">
                            <Field name="city" type="text" component={ this.renderInput } label="City"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                <div className="form-group col-6 margin-bottom-0">
                        <div className="div-form">
                            <Field name="zip" type="number"  component={ this.renderInput } label="Zip"/>
                        </div>
                    </div>
                    <div className="form-group col-6 margin-bottom-0">
                        <div className="div-form">
                            <Field name="age" type="number" component={ this.renderInput } label="Age"/>
                        </div>
                    </div>
                </div>
                <div className="recaptcha-container">
                    <div className="recaptcha-content">
                        <Recaptcha
                            sitekey="6LdUYYUUAAAAANB8YqVP29xTJ8ABlXu6eQ54vcld"
                            render="explicit"
                            onloadCallback={ this.recaptchaLoaded }
                            verifyCallback={ this.verifyCallback }
                            expiredCallback={ this.expiredCallback}
                        />
                        {this.state.recaptchaMessage}
                    </div>
                </div>
                <div className="blue-button">
                    <button className="primary-button">SUBMIT ENTRY</button>
                </div>
                {this.state.loading}
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.firstName) {
        errors.firstName = "Please enter your first name";
    }
    if (!formValues.lastName) {
        errors.lastName = "Please enter your last name";
    }
    if (!formValues.email) {
        errors.email = "Please enter an email address";
    } else if (EmailValidation(formValues.email)) {
        errors.email = "Please enter a valid email address";
    }
    if (!formValues.phone) {
        errors.phone = "Please enter your phone";
    }
    if (formValues.country == 'Choose a country' || !formValues.country) {
        errors.country = "Please enter your country";
    }
    if (!formValues.city) {
        errors.city = "Please enter your city";
    }
    if (!formValues.zip) {
        errors.zip = "Please enter zip number";
    }
    if (!formValues.age) {
        errors.age = "Please enter your age";
    }
    return errors;
}

export default reduxForm({
    form: 'alternativeMethod',
    validate
})(AlternativeMethod);