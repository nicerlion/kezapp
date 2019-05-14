import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../../header';
import Footer from '../../footer';
import {fetchAcf, fetchEntryBox, fetchThemeOption} from '../../../actions';
import Spinner from '../../spinner';
import EntryList from '../../../containers/entries/EntryList';

class EnterNow extends Component {

    constructor(props){
        super(props);
        this.state = {
            themeOption: null,
        };

        this.verifyExperienceExpiration = this.verifyExperienceExpiration.bind(this);
    }

    edit(formCont) {
        document.getElementById('content-form').attributes.editclass.value = formCont;
    }

    cancel() {
        document.getElementById('content-form').attributes.editclass.value = 'false-edit';

        jQuery("html, body").animate({
            scrollTop: jQuery("#back-policy").offset().top - 200
        }, 400, "linear");
    }

    verifyExperienceExpiration() {
        let currentDate = new Date();
        let experienceED = (this.props.acf[0][this.state.expId].counterdown_date_end).replace(/\-/g,'/');
        let experienceEndDate = new Date(experienceED);

        if( experienceEndDate && currentDate < experienceEndDate) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        this.getPages();
        this.props.fetchEntryBox();

        let options = ['pw_privacy_policy',];

        fetchThemeOption(options).then(themeOption => {
            this.setState({ themeOption });
        });
        
    }    
    
    getPages() {
        const urlParams = new URLSearchParams(this.props.search);
        const expId = urlParams.get('exp');
        this.setState({ expId });

        let pagesIds = [this.props.id]

        if (!expId) {
            this.props.history.push('/');
        } else {
            pagesIds[1] = expId;
        }

        let obj = {
            id: pagesIds,
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

            const backgroundImage_1 = this.props.acf[0][this.state.expId] ? this.props.acf[0][this.state.expId].background_image_sect1 : '';
            const bannerSectionStyles = {
                backgroundImage: 'url(' + backgroundImage_1 + ')',
            };

            let title_banner = this.props.acf[0][this.state.expId].title_sect1 ? this.props.acf[0][this.state.expId].title_sect1 : '';
            let list_banner_sect = this.props.acf[0][this.state.expId].text_content_enter ? this.props.acf[0][this.state.expId].text_content_enter : '';
            let text_sect_three = this.props.acf[0][this.props.id].text_content_sect_three ? this.props.acf[0][this.props.id].text_content_sect_three : '';
            let privacy_policy = this.state.themeOption ? this.state.themeOption.pw_privacy_policy : '';

            return (
                <div className="enter-now">
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
                    <section className="banner-section-enter">
                        <div className="container">
                            <div className="row banner-out-box-enter">
                                <div className="col-12 col-sm-12 col-md-3 padding-0-enter-col one-col-enter img-md-none" style={bannerSectionStyles}>
                                    <img src={backgroundImage_1} />
                                    <div className="counter-enter">
                                        <span>18 DAYS LEFT</span>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md padding-0">
                                    <div className="banner-box-enter">
                                        <h4 className="light-blue">{this.props.acf[0][this.state.expId].subtitle_enter ? this.props.acf[0][this.state.expId].subtitle_enter : ''}</h4>
                                        <h3 className="dark-blue" dangerouslySetInnerHTML={{__html: title_banner}}></h3>
                                        <div dangerouslySetInnerHTML={{__html: list_banner_sect}}>
                                        </div>
                                    </div>
                                </div>{/*ends col*/}
                            </div>
                        </div>
                    </section>
                    <section className="second-section-enter margin-bottom-50px" id="content-form" editclass="false-edit">
                        <div className="container">
                            <div className="row margin-bottom-50px number-color">
                                { this.props.entryBox && this.verifyExperienceExpiration() ? <EntryList pageid={this.state.expId}/> : '' }
                            </div>{/*ENDS ROW */}
                            <div className="big-price" id="back-policy">
                                <h6 className="dark-gray-color">
                                    It's boring, but it's legal... <a className="show-privacy-button" onClick={() => this.edit('edit-profile-info-form')} >here</a> is what lawyers like you to know...
                                </h6>
                            </div>
                            <div className="edit-profile-form">
                                <div dangerouslySetInnerHTML={{__html: privacy_policy}}></div>
                                <div className="button-pro-container">
                                    <span className="cancel-privacy-button"   onClick={() => this.cancel() } >Read Less</span>
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

function mapStateToProps({acf, entryBox}) {
    return {acf, entryBox};
}

export default connect(mapStateToProps, {fetchAcf, fetchEntryBox})(EnterNow);