import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLogin } from '../../actions';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Spinner from '../../components/spinner';

class LoginFormPart2 extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: '' };
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.customer.length && nextProps.customer.length && ((nextProps.customer[0].date !== this.props.customer[0].date) || (nextProps.customer[0].date && !(this.props.customer[0].length))) ) {
            if (nextProps.customer[0].message == "error, the user could not log in") {
                this.setState({ loading: (<div className='message message-error' >The password seems to be incorrect.</div>) });
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
        let obj = {
            'email': this.props.email,
            'password': event.password,
        };
        this.props.fetchLogin(obj);
    };

    render() {

        let redirect = '';
        if (this.props.customer.length && this.props.customer[0].id > 0){
            location.href = '/profile';
        }

        let text = (<p className='message message-info margin-b-15'>Enter the password for {this.props.email} to sign in.</p>);
        if (this.props.extraMessage == 'enterEmail') {
            text = (<p className='message message-info margin-b-15'>Log in again with {this.props.email} using your new password</p>);
        }

        return (
            <form onSubmit={ this.props.handleSubmit(this.onSubmit)}>
                {text}
                <Field name="password" component={this.renderInput} type="password" placeholder="Password" />
                <div className="blue-button">
                    <button className="primary-button">LET'S GO</button>
                </div>
                {this.state.loading}
                {redirect}
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.password) {
        errors.password = "Please enter your password";
    }
    //  else if (formValues.password.length < 8) {
    //     errors.password = "Please enter your password length";
    // }
    return errors;
}

function mapStateToProps({ customer }) {
    return { customer };
}

const LoginFormPart2ReduxForm = reduxForm({ form: 'LoginFormPart2', validate })(LoginFormPart2);

export default connect(mapStateToProps, { fetchLogin })(LoginFormPart2ReduxForm);