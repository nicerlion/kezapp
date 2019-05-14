import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {EmailValidation} from '../../utils/Validation';
import { fetchSendMail } from '../../actions';
import countryList from '../../utils/countryList';
import Spinner from '../../components/spinner';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: '' };
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

    renderInput = ({ input, placeholder, meta }) => {
        return (
            <div className="form-group">
                <input {...input} autoComplete="off" className="form-control" placeholder={ placeholder }/>
                { this.renderError(meta) }
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

    renderSelect = ({ input, meta, options }) => {
        return (
            <div className="form-group">
                <select {...input} autoComplete="off" className="form-control">
                    {this.selectOptions(options)};
                </select>
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
        this.setState({ loading: (<div id="loading" active="true" className="loading-spinner"><Spinner /></div>) });
        let obj = {
            'subject': 'Contact Us',
            'body': {
                'Email': event.email,
                'Name': event.name,
                'Country': event.country,
                'Message': event.message,
            },
        };
        
        fetchSendMail(obj).then(sendMail => {
            if (sendMail.message == "Message sent") {
                this.setState({ loading: (<div className='message message-good' >Thank you for your message. It has been sent.</div>) });
            } else {
                this.setState({ loading: (<div className='message message-error' >There was an error trying to send your message. Please try again later.</div>) });
            }
        });
    }

    render() {
            
        return (
            <form onSubmit={ this.props.handleSubmit(this.onSubmit)}>
                <Field name="email" component={ this.renderInput }  placeholder="Email"/>
                <Field name="name" component={ this.renderInput }  placeholder="Name"/>
                <Field name="country" component={ this.renderSelect }  options={countryList} />
                <Field name="message" rows="5" component={ this.renderArea }  placeholder="Message"/>
                <div className="blue-button">
                    <button className="primary-button">Submit</button>
                </div>
                {this.state.loading}
            </form>
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
    if (!formValues.name) {
        errors.name = "Please enter your first name";
    }
    if (formValues.country == 'Choose a country' || !formValues.country) {
        errors.country = "Please enter your country";
    }
    if (!formValues.message) {
        errors.message = "Please enter a message";
    }
    return errors;
}

export default reduxForm({
    form: 'contactForm',
    validate
})(ContactForm);