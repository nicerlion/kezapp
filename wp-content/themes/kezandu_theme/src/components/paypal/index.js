import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
import { connect } from 'react-redux';
import { handlePaypalToken } from '../../actions';
import Spinner from '../../components/spinner';
import { Redirect } from 'react-router-dom';

class PaypalButton extends Component {

    constructor(props) {
        super(props)
        window.React = React
        window.ReactDOM = ReactDOM
        this.state = {
            showButton: false,
            loading: '' 
        };
    }

    Token = (data) => {
        this.setState({
            loading: (<div active="true" className="full-spinner"><Spinner /></div>),
        });

        handlePaypalToken(
            data,
            this.props.form,
            this.props.exp_id,
            this.props.entries,
            this.props.amount,
            this.props.userId,
            this.props.entry_id
        ).then(process => {
            this.setState({
                loading: (
                    <Redirect to={{
                        pathname: '/thank-you',
                        search: `?order=${process.order}`,
                    }} />
                ),
            });
        });
    }

    componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {

        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
          if (isScriptLoadSucceed) {
            this.setState({ showButton: true });
            this.renderPaypalButton();
          }
          else this.props.onError()
        }
    }
     
    componentDidMount () {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props
        if (isScriptLoaded && isScriptLoadSucceed) {
            this.setState({ showButton: true });
        }
    }

    componentWillUnmount() {
        delete window.React
        delete window.ReactDOM
    }

    renderPaypalButton(){
        let am = parseInt(this.props.amount);
        am = am.toFixed(2);

        paypal.Button.render({

            env: 'production',

            funding: {
                allowed: [
                    paypal.FUNDING.CARD
                ],
                disallowed: []
            },

            headers: {
                'Accept': 'application/paypal-json-token',
            },

            style: {
                shape: 'rect',
                size: 'responsive',
                color: 'blue'
            },

            commit: true,

            client: {
                sandbox:    'AYEgE1dnp-W_3_DPADaQ8q78WpMdUDVQ9jUfWHYBkjFOYs99H0iEOCcbj26uP1hLlqdQDMTVRowELCzR',
                production: 'AeTEO3y_NzLK66x9hsJWiZv0L81t2PU0v9syRPsS-HgiVz1MBW7Pg-hFFSKtSFTtlctVOozb1O0NEIxP'
            },

            payment: function(data, actions) {
                return actions.payment.create({
                  transactions: [{
                    amount: {
                      total: am,
                      currency: 'USD'
                    },
                    description: this.props.exp_description
                  }]
                });
            },
            payment_options: {
                allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
            },

            // onAuthorize() is called when the buyer approves the payment
            onAuthorize: (data, actions) => {
                
                return actions.payment.execute().then( () => {
                    this.Token(data);
                });
            }

        }, '#paypal-button-container');
    }

    render(){
        return(
            <div>
                <div className="paypal-container">
                    <div id="paypal-button-container"></div>
                    <div className="loader-bar"></div>
                </div>
                {this.state.loading}
            </div>
        )
    }
}

const sl =  scriptLoader('https://www.paypalobjects.com/api/checkout.js');
export default sl(connect(null, {})(PaypalButton));