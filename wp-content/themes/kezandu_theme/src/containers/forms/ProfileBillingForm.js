import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { fetchCustomerInfo, fetchCustomerInfoUpdate } from '../../actions';
import Spinner from '../../components/spinner';

class ProfileBillingForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: (<div className="black-cloak"><div active="true" className="loading-spinner"><Spinner /></div></div>),
            customer_info: {
                id: '',
                email: '',
            },
            cardNumber: null,
            expirationDate: null,
            zipNumber: null,
        };
    }

    componentDidMount() {

        let obj = {
            id: this.props.customer_data[0].id,
            email: this.props.customer_data[0].email,
            info: 'billing',
        };

        fetchCustomerInfo(obj).then(info => {

            this.props.initialize({
                cardNumber: info.card_number,
                expirationDate: info.expiration_date,
                zipNumber: info.zip_code,
            });

            this.setState({
                cardNumber: info.card_number,
                expirationDate: info.expiration_date,
                zipNumber: info.zip_code,
            });
        });

    }

    componentDidMount() {

        let obj = {
            id: this.props.customer_data[0].id,
            email: this.props.customer_data[0].email,
            info: 'billing',
        };

        this.setState({
            customer_info: {
                id: this.props.customer_data[0].id,
                email: this.props.customer_data[0].email,
            }
        });

        fetchCustomerInfo(obj).then(info => {

            this.props.initialize({
                cardNumber: info.card_number,
                expirationDate: info.expiration_date,
                zipNumber: info.zip_code,
            });

            this.setState({
                loading: '',
                cardNumber: info.card_number,
                expirationDate: info.expiration_date,
                zipNumber: info.zip_code,
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
                    <label className="style-disabled"><span className="disabled-content"><span className="disabled-one">{label}</span><span className="disabled-two"></span></span></label>
                    <input {...input} autoComplete="off" className="form-control" placeholder={placeholder} disabled type={type} />
                    {this.renderError(meta)}
                </div>
            )
        }

        return (
            <div>
                <label>{label}</label>
                <input {...input} autoComplete="off" className="form-control" placeholder={ placeholder } type={ type }/>
                { this.renderError(meta) }
            </div>
        )
    }


    renderInputRadio = ({ input, meta, type}) => {
        return (
            <input {...input} className="form-control" type={type}  />
        )
    }


    onSubmit = (event) => {
        this.setState({ loading: (<div className="black-cloak"><div active="true" className="loading-spinner"><Spinner /></div></div>) });

        let obj = {
            id: this.state.customer_info.id,
            email: this.state.customer_info.email,
            info: 'billing',
            data: [
                ['card_number', event.cardNumber],
                ['expiration_date', event.expirationDate],
                ['zip_code', event.zipNumber],
            ],
        };

        fetchCustomerInfoUpdate(obj).then(info => {

            this.props.initialize({
                cardNumber: info.card_number,
                expirationDate: info.expiration_date,
                email: info.email,
                zipNumber: info.zip_code,
            });

            this.setState({
                loading: '',
                cardNumber: info.card_number,
                expirationDate: info.expiration_date,
                email: info.email,
                zipNumber: info.zip_code,
            });

            document.getElementById('content-form').attributes.editclass.value = 'false-edit';
        });
    }

    cancel() {
        document.getElementById('content-form').attributes.editclass.value = 'false-edit';
        this.props.initialize({
            cardNumber: this.state.cardNumber,
            expirationDate: this.state.expirationDate,
            email: this.state.email,
            zipNumber: this.state.zipNumber,
            phone: this.state.phone,
            country: this.state.country,
        });
    }

    render() {
        return(
            <div className='content-form'>
                {/* <form className="profile-billing-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="form-group">
                        <div className="div-form">
                            <Field name="cardNumber" type="number" component={ this.renderInput } label="Card Number" placeholder="*** **** **** 9087" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <div className="div-form">
                                <Field name="expirationDate" type="date" component={ this.renderInput } label="Expiration Date" placeholder="941908" />
                            </div>
                        </div>
                        <div className="form-group col-6">
                            <div className="div-form">
                                <Field name="zipNumber" type="number" component={ this.renderInput } label="Zip" placeholder="941908" />
                            </div>
                        </div>
                    </div>
                    <div className="button-pro-container">
                        <div className="cancel-form-button"  onClick={() => this.cancel() }>Cancel</div>
                        <button className="save-form-button">Save</button>
                    </div>
                </form> */}
                <div className="profile-billing-info">
                    <div className="edit-profile-detail">
                        <span>Card Number:</span>
                        <p>{this.state.cardNumber ? this.state.cardNumber : '---------'}</p>
                    </div>
                    <div className="edit-profile-detail">
                        <span>Expiration Date:</span>
                        <p>{this.state.expirationDate ? this.state.expirationDate : '---------'}</p>
                    </div>
                    <div className="edit-profile-detail">
                        <span>Zip Code:</span>
                        <p>{this.state.zipNumber ? this.state.zipNumber : '---------'}</p>
                    </div>
                </div>
                {this.state.loading}
            </div>
        )
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.cardNumber) {
        errors.cardNumber = "Please enter your Card Number";
    }
    if (!formValues.expirationDate) {
        errors.expirationDate = "Please enter your Expiration Date";
    }
    if (!formValues.zipNumber) {
        errors.zipNumber = "Please enter Zip Number";
    }
    return errors;
}

export default reduxForm({
    form: 'ProfileBillingForm',
    validate
}) (ProfileBillingForm);