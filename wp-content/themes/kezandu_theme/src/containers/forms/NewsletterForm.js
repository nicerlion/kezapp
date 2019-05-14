import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {EmailValidation} from '../../utils/Validation';
import { fetchSendMail } from '../../actions';
import Spinner from '../../components/spinner';
import Mailchimp from 'react-mailchimp-form'

class NewsletterForm extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: '' };
    }

    renderInput = ({ input, placeholder, meta, id }) => {
        return (
            <div className="form-group">
                <input {...input} autoComplete="off" type="email" className="form-control one-special-input" placeholder={ placeholder } id={id} />
                <div className="blue-button-re-container">
                    <div className="blue-button-re-box">
                        <button type="submit" className="blue-button-re">SIGN ME UP</button>
                    </div>
                </div>
                { this.renderError(meta) }
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

    onSubmit = (event) => {
        this.setState({ loading: (<div id="loading" active="true" className="loading-spinner"><Spinner /></div>) });
        let obj = {
            'subject': 'Newsletter',
            'body': {
                'Email': event.email,
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
            <div>
                <form action="https://company.us10.list-manage.com/subscribe/post?u=3c93b41ed487f7050fdbdab35&amp;id=4d5ecaff94" className="form-group des-font flex" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" >
                <Field name="EMAIL" component={ this.renderInput } id="mce-EMAIL"  placeholder="Enter your email here"/>
                    {this.state.loading}
                </form>
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
    return errors;
}

export default reduxForm({
    form: 'newsletterForm',
    validate
})(NewsletterForm);