import React, { Component } from 'react';
import { fetchAlternativePasswordChange, fetchLogin } from '../../actions';
import { Field, reduxForm } from 'redux-form';
import Spinner from '../../components/spinner';

class ChangeYourPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: ''};
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

        let obj = {
            id: this.props.customer_data[0].id,
            email: this.props.customer_data[0].email,
            current_password: event.CurrentPassword,
            new_password: event.NewPassword,
            re_type_password: event.ReTypePassword,
        };

        fetchAlternativePasswordChange(obj).then(answer => {
            if (answer.status == 200) {
                this.props.initialize({
                    CurrentPassword: '',
                });
                this.setState({
                    loading: (<div><div className='message message-info message-good'>The changed password was successful</div></div>),
                });
                if (typeof (Storage) !== "undefined") {
                    localStorage.setItem("enterEmail", answer.email);
                }
                location.replace("/sign-in");
            } else {
                this.props.initialize({
                    CurrentPassword: '',
                    NewPassword: '',
                    ReTypePassword: '',
                });
                this.setState({
                    loading: (<div><div className='message message-info message-error'>The entered password is incorrect</div></div>),
                });

            }
        });
    };

    render() {

        return (
            <div>
                <form onSubmit={ this.props.handleSubmit(this.onSubmit)}>
                    <Field name="CurrentPassword" component={this.renderInput} type="password" placeholder="Current Password" />
                    <Field name="NewPassword" component={this.renderInput} type="password" placeholder="New Password" />
                    <Field name="ReTypePassword" component={this.renderInput} type="password" placeholder="Re-type Password" />
                    <div className="blue-button">
                        <button className="primary-button">CHANGE PASSWORD</button>
                    </div>
                    {this.state.loading}
                </form>
            </div>
        )
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.CurrentPassword) {
        errors.CurrentPassword = "Please enter your current password";
    }
    if (!formValues.NewPassword) {
        errors.NewPassword = "Please enter a new password";
    }
    if (!formValues.ReTypePassword) {
        errors.ReTypePassword = "Please enter your new password again";
    } else if (formValues.ReTypePassword != formValues.NewPassword) {
        errors.ReTypePassword = "Your new password and retype password are not the same";
    }
    return errors;
}

export default reduxForm({
    form: 'ChangeYourPassword',
    validate
})(ChangeYourPassword);