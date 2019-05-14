import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Healthmakers from '../../../containers/healthmakers/Healthmakers';
import SummaryExperiences from '../../../containers/summary-experiences';
import SocialFollow from '../../social-follow/index'

import Header from '../../header';
import Footer from '../../footer';
import {fetchAcf} from '../../../actions';
import Spinner from '../../spinner';


class WinnerListing extends Component {

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

    render () {
        const shareUrl = window.location.href;
        const title = 'Facebook';
        if (this.props.acf.length && this.props.acf[0][this.props.id]) {
            let logo = this.props.acf[0][this.props.id].logo ? this.props.acf[0][this.props.id].logo : '';
        
            if (logo === 'other') {
                logo = this.props.acf[0][this.props.id].other_logo ? this.props.acf[0][this.props.id].other_logo : '';
            }

            return (
                <div className="winner-listing">
                    <Header logo={logo} buttonColor={this.props.acf[0][this.props.id].button_color ? this.props.acf[0][this.props.id].button_color : ''} transparent={this.props.acf[0][this.props.id].transparent_header ? 'true' : ''} />
                    <section className="first-section-privacy margin-top-50px">
                        <div className="container">
                            <div className="padding-bottom-50px">
                                <h1 className="blue-h1">{this.props.acf[0][this.props.id].title_sect_one ? this.props.acf[0][this.props.id].title_sect_one : ''}</h1>
                            </div>
                            <div className="enter-container-box">
                                <div>
                                    <p>{this.props.acf[0][this.props.id].text_content_sect_one ? this.props.acf[0][this.props.id].text_content_sect_one : ''}</p>
                                </div>
                            </div>
                        </div>{/*ENDS CONTAINER */}
                    </section>
                    <section className="second-section-winner clearfix">
                        <Healthmakers/>
                    </section>
                    <section className="third-section-winner">
                        <div className="container">
                            <div className="title-third-section-winner">
                                <h4>{this.props.acf[0][this.props.id].text_content_sect_three ? this.props.acf[0][this.props.id].text_content_sect_three : ''}</h4>
                            </div>
                            <SummaryExperiences page={this.props.acf[0][this.props.id]}/>
                            <SocialFollow/>
                        </div>{/* ends container */}
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

export default connect(mapStateToProps, {fetchAcf})(WinnerListing);