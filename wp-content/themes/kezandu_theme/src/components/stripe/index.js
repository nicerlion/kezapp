import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleStripeToken } from '../../actions';
import Spinner from '../../components/spinner';
import { Redirect } from 'react-router-dom';

class StripePayment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: ''
        };
    }
    close = () => {
        this.setState({
            loading: '',
        });
    }

    Token = (token) => {
        this.setState({
            loading: (<div active="true" className="full-spinner"><Spinner /></div>),
        });

        handleStripeToken(
            token,
            this.props.form,
            this.props.exp_id,
            this.props.entries,
            this.props.amount,
            this.props.userId,
            this.props.entry_id
        ).then(process => {
            if (process.message == "error, mistake when making the charge") {
                this.setState({
                    loading: (
                        <div className="message-popup">
                            <div className="message-popup-close" onClick={() => {this.close();}}></div>
                            <div className="message-popup-content">
                                <div className="message-close" onClick={() => {this.close();}}>X</div>
                                <p>There was a problem charging your credit card. Please contact the website administrator.</p>
                            </div>
                        </div>
                    ),
                });

            } else {
                this.setState({
                    loading: (
                        <Redirect to={{
                            pathname: '/thank-you',
                            search: `?order=${process.order}`,
                        }} />
                    ),
                });
            }
        });
    }
    render() {
        return(
            <div>
                <StripeCheckout
                    name="Kezandu LLC"
                    amount={this.props.amount * 100} 
                    token={token => this.Token(token)}
                    stripeKey={process.env.REACT_APP_STRIPE_KEY}
                    email={this.props.form.email}
                >
                    <button className="margin-0 pay-button">CREDIT CARD</button>
                </StripeCheckout>
                {this.state.loading}
            </div>
        )
    }
}

export default connect(null, {})(StripePayment);