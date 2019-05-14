import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SocialFollow from '../../social-follow/index'

import Header from '../../header';
import Footer from '../../footer';
import {fetchAcf} from '../../../actions';
import Spinner from '../../spinner';
import Healthmakers from '../../../containers/healthmakers/Healthmakers';
import SummaryExperiences from '../../../containers/summary-experiences';



class WinnerSingle extends Component {
    
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

            return(
                <div className="">
                    <Header logo={logo} buttonColor={this.props.acf[0][this.props.id].button_color ? this.props.acf[0][this.props.id].button_color : ''} transparent={this.props.acf[0][this.props.id].transparent_header ? 'true' : ''} />
                    <section className="first-section-winner-single">
                        <div className="container">
                            <div className="first-section-ws-main-container">
                                <div className="first-section-ws-image-container">
                                    <img src="http://kezanduapp.local/wp-content/uploads/2019/01/winner-single-video.jpg"/>
                                </div>
                                <h4 className="light-blue">NEW BRITAIN, CT</h4>
                            </div>
                            <div className="title-box-ws">
                                <h1 className="dark-blue">Shane Lloyd</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
                            </div>
                        </div>
                    </section>
                    <section className="second-section-winner clearfix">
                        <div className="container">
                            <div className="title-second-section-ws">
                                <h2 className="dark-blue">MEET OUT<br/>
                                HEALTHMAKERS</h2>
                            </div>
                        </div>
                        <Healthmakers/>
                    </section>
                    <section className="third-section-winner">
                        <div className="container">
                            <div className="title-third-section-winner">
                                <h4>{this.props.acf[0][this.props.id].text_content_sect_three ? this.props.acf[0][this.props.id].text_content_sect_three : ''}</h4>
                            </div>
                            <SummaryExperiences page={this.props.acf[0][this.props.id]}/>
                            <SocialFollow />
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

export default connect(mapStateToProps, {fetchAcf})(WinnerSingle);