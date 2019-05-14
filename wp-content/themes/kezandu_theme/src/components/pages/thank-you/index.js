import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import Header from '../../header';
import Footer from '../../footer';
import {fetchAcf} from '../../../actions';
import Spinner from '../../spinner';

class ThankYou extends Component {

    constructor() {
        super();
        this.state = {
            redirect: '',
            order: ' ',
        }
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(this.props.search);
        const order = urlParams.get('order');
        this.setState({ order: order });
        if (!order) {
            this.setState({ redirect: (<Redirect to='/' />) });
        }
        let obj = {
            id: this.props.id,
            pages: false
        };
        if (this.props.acf.length) {
            obj.pages = this.props.acf[0];
        }
        this.props.fetchAcf(obj);
    }

    onClick = () => {
        this.setState({ redirect: (<Redirect to='/' />) });
    }

    render(){
        if (this.props.acf.length && this.props.acf[0][this.props.id]) {
    
            let logo = this.props.acf[0][this.props.id].logo ? this.props.acf[0][this.props.id].logo : '';
        
            if (logo === 'other') {
                logo = this.props.acf[0][this.props.id].other_logo ? this.props.acf[0][this.props.id].other_logo : '';
            }

            let contactText = this.props.acf[0][this.props.id].text_content ? this.props.acf[0][this.props.id].text_content : '';
            
            return(
                <div className="contact-us">
                    <Header logo={logo} buttonColor={this.props.acf[0][this.props.id].button_color ? this.props.acf[0][this.props.id].button_color : ''} transparent={this.props.acf[0][this.props.id].transparent_header ? 'true' : ''} />
                    <section className="first-section" className="thank-you">
                        <div className="container">
                            <div className="thank-you-content">
                                <div className="thank-you-header">
                                    <div className="thank-you-successful"></div>
                                </div>
                                <div className="thank-you-boddy">
                                    <p>Thanks for donating. Your order ID is: {this.state.order}. Please check your email to see your donation details.</p>
                                    <button className="thank-you-button" onClick={() => { this.onClick(); }}>Return home?</button>
                                    {this.state.redirect}
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </div>
                
            )
        } else {
            return (
                <Spinner />
            );
        }
    }
}

function mapStateToProps({acf}) {
    return {acf};
}

export default  connect(mapStateToProps, {fetchAcf})(ThankYou);