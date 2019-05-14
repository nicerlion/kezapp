import React, { Component  } from 'react';
import { connect } from 'react-redux';
import AccordionClass from './Accordion';
import { Link } from 'react-router-dom';

//import '../../assets/styles/base.css';
//import './style.css';
//import './media.css';
import Header from '../../header';
import Footer from '../../footer';
import {fetchAcf} from '../../../actions';
import Spinner from '../../spinner';
import ProfileNav from '../../../containers/parts/profileNav';

class ProfileRewards extends Component {

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

    render() {
        if (this.props.acf.length && this.props.acf[0][this.props.id]) {
    
            let logo = this.props.acf[0][this.props.id].logo ? this.props.acf[0][this.props.id].logo : '';
        
            if (logo === 'other') {
                logo = this.props.acf[0][this.props.id].other_logo ? this.props.acf[0][this.props.id].other_logo : '';
            }

            let text_one_sect = this.props.acf[0][this.props.id].text_content ? this.props.acf[0][this.props.id].text_content : '';
        
            return (
            <div className="Profile-rewards">
                        <Header logo={logo} buttonColor={this.props.acf[0][this.props.id].button_color ? this.props.acf[0][this.props.id].button_color : ''} transparent={this.props.acf[0][this.props.id].transparent_header ? 'true' : ''} />
                    <section className="first-section-pro margin-top-50px">
                        <div className="container">
                            <div className="padding-bottom-50px">
                                <h1 className="blue-h1">{this.props.acf[0][this.props.id].title ? this.props.acf[0][this.props.id].title : ''}</h1>
                            </div>
                            <div className="steps-line-profile">
                                <div className="inside-steps-line-profile clearfix">
                                    <ProfileNav />
                                </div>
                                <div className="inside-steps-text-profile">
                                    <p dangerouslySetInnerHTML={{__html: text_one_sect}}></p>
                                </div>
                            </div>
                        </div>{/*ENDS CONTAINER */}
                    </section>{/*ENDS SECTION */}
                    <section className="second-section-profile-rewards">
                        <div className="container">
                            <div className="container-box-485px">
                                <div className="subtitle-second-sec-prof-rewards">
                                    <h4>Your Progress</h4>
                                </div>
                                <div className="step-line-container">
                                    <ul className="events">
                                        <li className="is-done">
                                            <span><strong>1st Donation</strong></span>
                                        </li>
                                        <li className="is-done">
                                            <span><strong>1st Donation</strong></span>
                                        </li>
                                        <li className="is-done">
                                            <span><strong>2nd Donation</strong></span>
                                        </li>
                                        <li className="is-current">
                                            <span><strong>3rd Donation</strong></span>
                                        </li>
                                        <li>
                                            <span><strong>4th Donation</strong></span>
                                        </li>
                                        <li>
                                            <span className="pro-span"><strong>5th Donation</strong></span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="text-second-sect">
                                    <p className="little-thick">...now let's get you closer to quadruple entries!</p>
                                </div>
                                <div className="pro-rew-button-container">
                                    <div className="big-dark-blue-button">
                                        <Link to={this.props.acf[0][this.props.id].button_link ? this.props.acf[0][this.props.id].button_link : ''}>{this.props.acf[0][this.props.id].button_text ? this.props.acf[0][this.props.id].button_text : ''}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="container-box-485px">
                                <h4>Frequently Asked Questions</h4>
                                <div className="accordion-container">
                                    <AccordionClass/>
                                </div>
                            </div>
                        </div>{/*ENDS CONTAINER */}
                    </section>
                    <Footer logo={this.props.acf[0][this.props.id].footer_image ? this.props.acf[0][this.props.id].footer_image.url : ''} titleColor={this.props.acf[0][this.props.id].footer_title_color ? this.props.acf[0][this.props.id].footer_title_color : '#fff'} whiteFooter={this.props.acf[0][this.props.id].footer_background_color ? this.props.acf[0][this.props.id].footer_background_color : 'false'} />
                </div>
        );
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

export default connect(mapStateToProps, {fetchAcf})(ProfileRewards);