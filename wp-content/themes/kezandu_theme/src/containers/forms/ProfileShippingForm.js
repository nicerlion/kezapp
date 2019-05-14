import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {EmailValidation} from '../../utils/Validation';
import countryList from '../../utils/countryList';
import { fetchCustomerInfo, fetchCustomerInfoUpdate } from '../../actions';
import Spinner from '../../components/spinner';

class ProfileShippingForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: (<div className="black-cloak"><div active="true" className="loading-spinner"><Spinner /></div></div>),
            customer_info: {
                id: '',
                email: '',
            },
            country: null,
            city: null,
            zip: null,
            address: null,
        };
    }

    componentDidMount() {

        let obj = {
            id: this.props.customer_data[0].id,
            email: this.props.customer_data[0].email,
            info: 'shipping',
        };

        this.setState({
            customer_info: {
                id: this.props.customer_data[0].id,
                email: this.props.customer_data[0].email,
            }
        });

        fetchCustomerInfo(obj).then(info => {

            this.props.initialize({
                country: info.country,
                city: info.city,
                zip: info.zip_code,
                address: info.address,
            });

            this.setState({
                loading: '',
                country: info.country,
                city: info.city,
                zip: info.zip_code,
                address: info.address,
            });
        });

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

    renderInput = ({ input, placeholder, meta, label, type, active }) => {
        if (active == 'none') {
            return (
                <div>
                    <input {...input} autoComplete="off" className="form-control" placeholder={placeholder} disabled type={type} />
                    <label className="style-label"><span className="label-content"><span className="label-one">{label}</span><span className="label-two"></span></span></label>
                    {this.renderError(meta)}
                </div>
            )
        }

        return (
            <div className="form-group">
                <input {...input} autoComplete="off" className="form-control" placeholder={ placeholder } type={ type }/>
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


    onSubmit = (event) => {
        this.setState({ loading: (<div className="black-cloak"><div active="true" className="loading-spinner"><Spinner /></div></div>) });

        let obj = {
            id: this.state.customer_info.id,
            email: this.state.customer_info.email,
            info: 'shipping',
            data: [
                ['country', event.country],
                ['city', event.city],
                ['zip_code', event.zip],
                ['address', event.address],
            ],
        };

        fetchCustomerInfoUpdate(obj).then(info => {

            this.props.initialize({
                country: info.country,
                city: info.city,
                email: info.email,
                zip: info.zip_code,
                address: info.address,
                country: info.country,
            });

            this.setState({
                loading: '',
                country: info.country,
                city: info.city,
                email: info.email,
                zip: info.zip_code,
                address: info.address,
            });

            document.getElementById('content-form').attributes.editclass.value = 'false-edit';
        });
    }

    cancel() {
        document.getElementById('content-form').attributes.editclass.value = 'false-edit';
        this.props.initialize({
            country: this.state.country,
            city: this.state.city,
            email: this.state.email,
            zip: this.state.zip,
            address: this.state.address,
        });
    }

    render () {
        return (
            <div className='content-form'>
                <form className="profile-shipping-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="form-group">
                        <div className="div-form">
                            <Field name="country" component={ this.renderSelect } options={countryList} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <div className="div-form">
                                <Field name="city" type="text" component={ this.renderInput } label="City" />
                            </div>
                        </div>
                        <div className="form-group col-6">
                            <div className="div-form">
                                <Field name="zip" type="number" component={ this.renderInput } label="Zip" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="div-form">
                            <Field name="address" type="text" component={ this.renderInput } label="Address" />
                        </div>
                    </div>
                    <div className="button-pro-container">
                        <div className="cancel-form-button"  onClick={() => this.cancel() }>Cancel</div>
                        <button className="save-form-button">Save</button>
                    </div>
                </form>
                <div className="profile-shipping-info">
                    <div className="edit-profile-detail">
                        <span>Country:</span>
                        <p>{this.state.country ? this.state.country : '---------'}</p>
                    </div>
                    <div className="edit-profile-detail">
                        <span>City:</span>
                        <p>{this.state.city ? this.state.city : '---------'}</p>
                    </div>
                    <div className="edit-profile-detail">
                        <span>Zip code:</span>
                        <p>{this.state.zip ? this.state.zip : '---------'}</p>
                    </div>
                    <div className="edit-profile-detail">
                        <span>Address:</span>
                        <p>{this.state.address ? this.state.address : '---------'}</p>
                    </div>
                </div>
                {this.state.loading}
            </div>
        )
    }
} 

const validate = (formValues) => {
    const errors = {};

    if (formValues.country == 'Choose a country' || !formValues.country) {
        errors.country = "Please enter your Country";
    }
    if (!formValues.city) {
        errors.city = "Please enter your City";
    }
    if (!formValues.zip) {
        errors.zip = "Please enter your Zip Code";
    }
    if (!formValues.address) {
        errors.address = "Please enter your Address";
    }
    return errors;
}

export default reduxForm({
    form: 'profileShippingForm',
    validate
}) (ProfileShippingForm);