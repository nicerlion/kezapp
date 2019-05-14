import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMailVerificationTwo } from '../../actions';
import { Field, reduxForm } from 'redux-form';
import { EmailValidation } from '../../utils/Validation'
import LoginFormPart2 from './LoginFormPart2';
import Spinner from '../../components/spinner';
import { Redirect } from 'react-router-dom';

class LoginFormPart1 extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: '',
            enterEmail: '',
            process: null,
        }
    }

    componentDidMount() {
        if (typeof (Storage) !== 'undefined') {
            if (localStorage.getItem('enterEmail') !== null && localStorage.getItem('enterEmail') !== 'null') {
                let enterEmail = localStorage.getItem('enterEmail');
                this.setState({ enterEmail: enterEmail });
                localStorage.setItem('enterEmail', null);
                fetchMailVerificationTwo(enterEmail, 'enterEmail').then(process => {
                    this.setState({ process: process });
                });
            }
        }
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

    renderInput = ({ input, placeholder, type, meta }) => {
        return (
            <div className="form-group">
                <input {...input} autoComplete="off" className="form-control" type={type} placeholder={placeholder} />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (event) => {
        this.setState({ loading: (<div id="loading" active="true" className="loading-spinner"><Spinner /></div>) });
        fetchMailVerificationTwo(event.email, 'login').then(process => {
            this.setState({ process: process, loading: '' });
        });
    };

    render() {

        let redirect = '';

        if (this.state.process != null) {
            if (this.state.process.extraMessage == 'no password') {
                localStorage.setItem('wp_log_action', this.state.process.email);
                location.reload();
            } else if (this.state.process.extraMessage == 'facebook') {
                localStorage.setItem('wp_log_action', 'facebook');
                location.reload();
            } else {

                if (this.state.process.message == 'registered mail') {
                    return (<LoginFormPart2 email={this.state.process.email} extraMessage={this.state.process.extraMessage} />);
                } else if (this.state.process.message == 'error, unregistered mail') {
                    if (typeof (Storage) !== 'undefined') {
                        localStorage.setItem('registerEmail', this.state.process.email);
                    }
                    redirect = (<Redirect to='/create-an-account' />);
                }

            }
        }

        return (
            <div>
                <form onSubmit={ this.props.handleSubmit(this.onSubmit)}>
                    <Field name="email" component={this.renderInput} type="mail" placeholder="Email" />
                    <div className="blue-button">
                        <button className="primary-button">CONTINUE</button>
                    </div>
                    {this.state.loading}
                    {redirect}
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

function mapStateToProps({ process }) {
    return { process };
}

const LoginFormPart1ReduxForm = reduxForm({ form: 'LoginFormPart1', validate })(LoginFormPart1);

export default connect(mapStateToProps, {})(LoginFormPart1ReduxForm);