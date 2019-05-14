import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SocialFollow from '../../social-follow/index'

import Header from '../../header';
import Footer from '../../footer';
import {fetchAcf} from '../../../actions';
import Spinner from '../../spinner';
import NewsletterForm from '../../../containers/forms/NewsletterForm';



//import '../../assets/styles/base.css';
//import './style.css';
//import './media.css';


class About extends Component {
    
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

        const shareUrl = window.location.href;
        const title = 'Facebook';

        if (this.props.acf.length && this.props.acf[0][this.props.id]) {
    
            let logo = this.props.acf[0][this.props.id].logo ? this.props.acf[0][this.props.id].logo : '';
        
            if (logo === 'other') {
                logo = this.props.acf[0][this.props.id].other_logo ? this.props.acf[0][this.props.id].other_logo : '';
            }

            const backgroundImage = this.props.acf[0][this.props.id].background_image_sect_one ? this.props.acf[0][this.props.id].background_image_sect_one : '';
            const firstSectionStyles = {
                backgroundImage: 'url(' + backgroundImage + ')',
            };

            const backgroundImage_2 = this.props.acf[0][this.props.id].background_image_sect_three ? this.props.acf[0][this.props.id].background_image_sect_three : '';
            const thirdSectionStyles = {
                backgroundImage: 'url(' + backgroundImage_2 + ')',
            };

            const backgroundImage_3 = this.props.acf[0][this.props.id].background_image_sect_four ? this.props.acf[0][this.props.id].background_image_sect_four : '';
            const fourthSectionStyles = {
                backgroundImage: 'url(' + backgroundImage_3 + ')',
            };

            const backgroundImage_4 = this.props.acf[0][this.props.id].background_image_sect_five ? this.props.acf[0][this.props.id].background_image_sect_five : '';
            const fifthSectionStyles = {
                backgroundImage: 'url(' + backgroundImage_4 + ')',
            };

            let title_one_sect = this.props.acf[0][this.props.id].title_sect_one ? this.props.acf[0][this.props.id].title_sect_one : '';
            let text_two_sect = this.props.acf[0][this.props.id].text_content_sect_two ? this.props.acf[0][this.props.id].text_content_sect_two : '';
            let title_three_sect = this.props.acf[0][this.props.id].title_sect_three ? this.props.acf[0][this.props.id].title_sect_three : '';
            let title_four_sect = this.props.acf[0][this.props.id].title_sect_four ? this.props.acf[0][this.props.id].title_sect_four : '';
            let title_five_sect = this.props.acf[0][this.props.id].title_sect_five ? this.props.acf[0][this.props.id].title_sect_five : '';
            let button_text_seven_sect = this.props.acf[0][this.props.id].ask_text_sect_seven ? this.props.acf[0][this.props.id].ask_text_sect_seven : '';

            return(
                <div className="About">
                    <Header logo={logo} buttonColor={this.props.acf[0][this.props.id].button_color ? this.props.acf[0][this.props.id].button_color : ''} transparent={this.props.acf[0][this.props.id].transparent_header ? 'true' : ''} />
                    <section className="first-section-about" style={firstSectionStyles}>
                        <div className="container">
                            <div className="title-first-sect-about">
                                <h5>{this.props.acf[0][this.props.id].subtitle_sect_one ? this.props.acf[0][this.props.id].subtitle_sect_one : ''}</h5>
                                <h1 dangerouslySetInnerHTML={{__html: title_one_sect}}></h1>
                            </div>
                        </div>{/*ENDS CONTAINER */}
                    </section>{/*ENDS FIRST SECTION */}
                    <section className="second-section-about">
                        <div className="container">
                            <div className="container-second-section-about blue-color">
                                <h2 className="blue-h1" dangerouslySetInnerHTML={{__html: text_two_sect}}></h2>
                                <div className="about-container-box">
                                    <div>
                                        <p>{this.props.acf[0][this.props.id].second_text_sect_two ? this.props.acf[0][this.props.id].second_text_sect_two : ''}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="rounded-a-section-about">
                        <div className="container relative">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                                    <div className="div-rounded" style={thirdSectionStyles}>
                                        <img src="/wp-content/themes/kezandu_theme/img/transparent-4px.png" /> 
                                        <div className="Aligner-item">
                                            <div className="rounded-mini-about">
                                                <h3>{this.props.acf[0][this.props.id].subtitle_sect_three ? this.props.acf[0][this.props.id].subtitle_sect_three : ''}</h3>
                                                <span to={this.props.acf[0][this.props.id].button_link_sect_three ? this.props.acf[0][this.props.id].button_link_sect_three : ''} className="blue-square-corners ">{this.props.acf[0][this.props.id].button_text_sect_three ? this.props.acf[0][this.props.id].button_text_sect_three : ''}</span> 
                                            </div>
                                        </div>
                                    </div> 
                                </div>{/* Ends col */}
                                <div className="col-12 col-sm-12 col-md-12 col-lg-6 align-self-center">
                                    <div className="one-box-third-sect-about">
                                        <h3 className="h3-subtitle-about" dangerouslySetInnerHTML={{__html: title_three_sect}}></h3> 
                                    </div>
                                </div>{/* Ends col */}
                            </div>{/* Ends row */}
                            <div className="cross-line-a"></div>
                        </div>{/* Ends container */}
                    </section>{/* Ends section */}
                    <section className="rounded-a-section-about">
                        <div className="container relative">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-6 order-lg-2">
                                    <div className="div-rounded" style={fourthSectionStyles}>
                                        <img src="/wp-content/themes/kezandu_theme/img/transparent-4px.png" /> 
                                        <div className="Aligner-item">
                                            <div className="rounded-mini-about">
                                                <h3>{this.props.acf[0][this.props.id].subtitle_sect_four ? this.props.acf[0][this.props.id].subtitle_sect_four : ''}</h3>
                                                <span to={this.props.acf[0][this.props.id].button_link_sect_four ? this.props.acf[0][this.props.id].button_link_sect_four : ''} className="blue-square-corners">{this.props.acf[0][this.props.id].button_text_sect_four ? this.props.acf[0][this.props.id].button_text_sect_four : ''}</span> 
                                            </div>
                                        </div>
                                    </div> 
                                </div>{/* Ends col */}
                                <div className="col-12 col-sm-12 col-md-12 col-lg-6 align-self-center order-lg-1">
                                    <div className="one-box-third-sect-about text-align-right">
                                        <h3 className="h3-subtitle-about" dangerouslySetInnerHTML={{__html: title_four_sect}}></h3> 
                                    </div>
                                </div>{/* Ends col */}
                            </div>{/* Ends row */}
                            <div className="cross-line-b"></div>
                        </div>{/* Ends container */}
                    </section>{/* Ends section */}
                    <section className="rounded-a-section-about last-a-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                                    <div className="div-rounded" style={fifthSectionStyles}>
                                        <img src="/wp-content/themes/kezandu_theme/img/transparent-4px.png" /> 
                                        <div className="Aligner-item">
                                            <div className="rounded-mini-about">
                                                <h3>{this.props.acf[0][this.props.id].subtitle_sect_five ? this.props.acf[0][this.props.id].subtitle_sect_five : ''}</h3>
                                                <span to={this.props.acf[0][this.props.id].button_link_sect_five ? this.props.acf[0][this.props.id].button_link_sect_five : ''} className="blue-square-corners">{this.props.acf[0][this.props.id].button_text_sect_five ? this.props.acf[0][this.props.id].button_text_sect_five : ''}</span> 
                                            </div>
                                        </div>
                                    </div> 
                                </div>{/* Ends col */}
                                <div className="col-12 col-sm-12 col-md-12 col-lg-6 align-self-center">
                                    <div className="one-box-third-sect-about">
                                    <h3 className="h3-subtitle-about" dangerouslySetInnerHTML={{__html: title_five_sect}}></h3> 
                                    </div>
                                </div>{/* Ends col */}
                            </div>{/* Ends row */}
                        </div>{/* Ends container */}
                    </section>{/* Ends section */}
                    <section className="social-box-about">
                        <div className="container">
                            <div className="text-second-sect">
                                <p className="little-thick">{this.props.acf[0][this.props.id].text_content_sect_six ? this.props.acf[0][this.props.id].text_content_sect_six : ''}</p>
                            </div>
                            <SocialFollow/>
                        </div>
                    </section>
                    <section className="extra-sign-about">
                    <div className="container">
                            <div className="sign-row">
                                <h3 className="blue-color">{this.props.acf[0][this.props.id].text_content_sect_seven ? this.props.acf[0][this.props.id].text_content_sect_seven : ''}</h3>
                                <p className="">{this.props.acf[0][this.props.id].sub_text_content_sect_seven ? this.props.acf[0][this.props.id].sub_text_content_sect_seven : ''}</p>
                                <div className="newsletter-form-container">
                                    <NewsletterForm />
                                </div>
                                <div className="checkbox">
                                    <span className="dark-gray-color" dangerouslySetInnerHTML={{__html: button_text_seven_sect}}></span>
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

export default connect(mapStateToProps, {fetchAcf})(About);