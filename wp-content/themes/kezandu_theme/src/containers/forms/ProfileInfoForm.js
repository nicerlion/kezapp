import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { EmailValidation, PhoneValidation} from '../../utils/Validation';
import countryList from '../../utils/countryList';
import { fetchCustomerInfo, fetchCustomerInfoUpdate } from '../../actions';
import Spinner from '../../components/spinner';

class ProfileInfoForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: (<div className="black-cloak"><div active="true" className="loading-spinner"><Spinner /></div></div>),
            customer_info: {
                id: '',
                email: '',
            },
            firstName: null,
            lastName: null,
            email: null,
            date: null,
            phone: null,
            country: null,
        };
    }

    componentDidMount() {

        let obj = {
            id: this.props.customer_data[0].id,
            email: this.props.customer_data[0].email,
            info: 'info',
        };

        this.setState({
            customer_info: {
                id: this.props.customer_data[0].id,
                email: this.props.customer_data[0].email,
            }
        });

        fetchCustomerInfo(obj).then(info => {

            this.props.initialize({
                firstName: info.first_name,
                lastName: info.last_name,
                email: info.email,
                date: info.date_of_birth,
                phone: info.phone_number,
                country: info.country,
            });

            this.setState({
                loading: '',
                firstName: info.first_name,
                lastName: info.last_name,
                email: info.email,
                date: info.date_of_birth,
                phone: info.phone_number,
                country: info.country,
            });
        });

    }

    renderError({error, touched}) {
        if ( touched && error ) {
            return (
                <div>
                    <div className='message message-error'>{ error }</div>
                </div>
            )
        }
    }

    renderInput = ({ input, meta, placeholder, label, type, active}) => {
        if (active == 'none') {
            return (
                <div>
                    <input {...input} autoComplete="off" className="form-control" placeholder={ placeholder } disabled type={ type } />
                    <label className="style-label"><span className="label-content"><span className="label-one">{label}</span><span className="label-two"></span></span></label>
                    { this.renderError(meta) }
                </div>
            )
        }
        
        return (
            <div>
                <input {...input} autoComplete="off" className="form-control" placeholder={ placeholder } type={ type } />
                <label className="style-label"><span className="label-content"><span className="label-one">{label}</span><span className="label-two"></span></span></label>
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

    renderSelect = ({ input, meta, options, placeholder }) => {
        return (
            <div className="form-group">
                <select {...input} autoComplete="off" className="form-control" placeholder={ placeholder }>
                    {this.selectOptions(options)};
                </select>
                { this.renderError(meta) }
            </div>
        )
    }

    onSubmit = (event) => {
        this.setState({ loading: (<div className="black-cloak"><div active="true" className="loading-spinner"><Spinner /></div></div>) });

        let obj = {
            id: this.state.customer_info.id,
            email: this.state.customer_info.email,
            info: 'info',
            data: [
                ['first_name', event.firstName],
                ['last_name', event.lastName],
                ['date_of_birth', event.date],
                ['phone_number', event.phone],
                ['country', event.country],
            ],
        };

        fetchCustomerInfoUpdate(obj).then(info => {

            this.props.initialize({
                firstName: info.first_name,
                lastName: info.last_name,
                email: info.email,
                date: info.date_of_birth,
                phone: info.phone_number,
                country: info.country,
            });

            this.setState({
                loading: '',
                firstName: info.first_name,
                lastName: info.last_name,
                email: info.email,
                date: info.date_of_birth,
                phone: info.phone_number,
                country: info.country,
            });

            document.getElementById('content-form').attributes.editclass.value = 'false-edit';
        });
    }

    cancel() {
        document.getElementById('content-form').attributes.editclass.value = 'false-edit';
        this.props.initialize({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            date: this.state.date,
            phone: this.state.phone,
            country: this.state.country,
        });
    }

    render () {

        let name = this.state.firstName ? this.state.firstName + ' ' : '';
        name = this.state.lastName ? name + this.state.lastName : name;

        return (
            <div className='content-form'>
                <form className="edit-profile-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="form-group">
                        <div className="div-form">
                            <Field name="firstName" type="text" component={this.renderInput} label="First Name" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="div-form">
                            <Field name="lastName" type="text" component={this.renderInput} label="Last Name" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="div-form">
                            <Field name="email" type="email" component={ this.renderInput } label="Email"  active="none" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="div-form">
                            <Field name="date" type="date" component={ this.renderInput } label="Date of Birth" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="div-form">
                            <Field name="phone" type="number" component={ this.renderInput } label="Phone" />
                        </div>
                    </div>
                    <div className="form-group">
                        <Field name="country" component={ this.renderSelect } placeholer="country" options={countryList} />
                    </div>
                    <div className="button-pro-container">
                        <div className="cancel-form-button"  onClick={() => this.cancel() }>Cancel</div>
                        <button className="save-form-button">Save</button>
                    </div>
                </form>
                <div className="edit-profile-info">
                    <div className="edit-profile-detail">
                        <span>Name:</span>
                        <p>{name ? name : '---------'}</p>
                    </div>
                    <div className="edit-profile-detail">
                        <span>Email:</span>
                        <p>{this.state.email ? this.state.email : '---------'}</p>
                    </div>
                    <div className="edit-profile-detail">
                        <span>Date of Birth:</span>
                        <p>{this.state.date ? this.state.date : '---------'}</p>
                    </div>
                    <div className="edit-profile-detail">
                        <span>Phone Number:</span>
                        <p>{this.state.phone ? this.state.phone : '---------'}</p>
                    </div>
                    <div className="edit-profile-detail">
                        <span>Country:</span>
                        <p>{this.state.country ? this.state.country : '---------'}</p>
                    </div>
                </div>
                {this.state.loading}
            </div>
        )
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.firstName) {
        errors.firstName = "Please enter your First Name";
    }
    if (!formValues.lastName) {
        errors.lastName = "Please enter your Last Name";
    }
    if (!formValues.email) {
        errors.email = "Please enter your Email Address";
    } else if (EmailValidation(formValues.email)) {
        errors.email = "Please enter a valid Email Address";
    }
    if (!formValues.date) {
        errors.date = "Please enter your Date";
    }
    if (!formValues.phone) {
        errors.phone = "Please enter your Phone Number";
    } else if (PhoneValidation(formValues.phone)) {
        errors.phone = "Please enter a valid Phone Number";
    }
    if (formValues.country == 'Choose a country' || !formValues.country) {
        errors.country = "Please enter your Country";
    }
    return errors;
}

export default reduxForm({
    form: 'ProfileInfoForm',
    validate
})(ProfileInfoForm);