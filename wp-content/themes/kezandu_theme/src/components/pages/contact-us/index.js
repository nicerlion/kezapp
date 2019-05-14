import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../../header';
import Footer from '../../footer';
import {fetchAcf} from '../../../actions';
import Spinner from '../../spinner';
import ContactForm from '../../../containers/forms/ContactForm';


class Contact extends Component {
    
    componentDidMount() {
        let obj = {
            id: this.props.id,
            pages: false
        };
        if (this.props.acf.length) {
            obj.pages = this.props.acf[0];
        }
        this.props.fetchAcf(obj);
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
                    <section className="first-section">
                        <div className="container">
                            <div className="padding-top-bottom">
                                <div className="main-title-container padding-bottom-50px">
                                    <h1 className="blue-h1">{this.props.acf[0][this.props.id].title ? this.props.acf[0][this.props.id].title : ''}</h1>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-7 col-lg-7">
                                        <div className="contact-form-container">
                                            <ContactForm />
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-5 col-lg-5">
                                        <div className="contact-info-container" dangerouslySetInnerHTML={{__html: contactText}}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer logo={this.props.acf[0][this.props.id].footer_image ? this.props.acf[0][this.props.id].footer_image.url : ''} titleColor={this.props.acf[0][this.props.id].footer_title_color ? this.props.acf[0][this.props.id].footer_title_color : '#fff'} whiteFooter={this.props.acf[0][this.props.id].footer_background_color ? this.props.acf[0][this.props.id].footer_background_color : 'false'} />
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

export default  connect(mapStateToProps, {fetchAcf})(Contact);