import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    FacebookShareButton,
    GooglePlusShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
  } from 'react-share';
import Header from '../../header';
import Footer from '../../footer';
import {fetchAcf, fetchEntryBox, fetchThemeOption} from '../../../actions';
import Spinner from '../../spinner';
import EntryList from '../../../containers/entries/EntryList';
import ExperienceHeroVideo from '../../videos/ExperienceHeroVideo';
import CounterDown from '../../../containers/counter';
 


class ExperienceMedina extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            themeOption: null,
            video1: false,
            video2: false,
            video3: false,
            showEntries: false
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

    open(id, video) {
        jQuery(id).modal('show');
        if (video == 'video1') {
            this.setState({video1: true});
        }
        if (video == 'video2') {
            this.setState({video2: true});
        }
        if (video == 'video3') {
            this.setState({video3: true});
        }
    }

    close(id, video) {
        jQuery(id).modal('hide');
        if (video == 'video1') {
            this.setState({video1: false});
        }
        if (video == 'video2') {
            this.setState({video2: false});
        }
        if (video == 'video3') {
            this.setState({video3: false});
        }
    }

    verifyExperienceExpiration() {
        let currentDate = new Date();
        let experienceED = (this.props.acf[0][this.props.id].counterdown_date_end).replace(/\-/g,'/');
        let experienceEndDate = new Date(experienceED);

        if( experienceEndDate && currentDate < experienceEndDate) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        let obj = {
            id: this.props.id,
            pages: false
        };
        if (this.props.acf.length) {
            obj.pages = this.props.acf[0];
        }
        this.props.fetchAcf(obj);
        this.props.fetchEntryBox();

        let options = ['pw_privacy_policy', 'pw_alternative_text'];

        fetchThemeOption(options).then(themeOption => {
            this.setState({ themeOption });
        });
    }

    render(){
        
        const shareUrl = window.location.href;
        const title = 'Facebook';
        
        if (this.props.acf.length && this.props.acf[0][this.props.id]) {
    
            let logo = this.props.acf[0][this.props.id].logo ? this.props.acf[0][this.props.id].logo : '';
        
            if (logo === 'other') {
                logo = this.props.acf[0][this.props.id].other_logo ? this.props.acf[0][this.props.id].other_logo : '';
            }

            const backgroundImage = this.props.acf[0][this.props.id].background_image_sect1 ? this.props.acf[0][this.props.id].background_image_sect1 : '';
            const firstSectionStyles = {
                backgroundImage: 'url(' + backgroundImage + ')',
            };

            const backgroundImage_2 = this.props.acf[0][this.props.id].background_image_sect3 ? this.props.acf[0][this.props.id].background_image_sect3 : '';
            const thirdSectionStyles = {
                backgroundImage: 'url(' + backgroundImage_2 + ')',
            };

            const backgroundImage_3 = this.props.acf[0][this.props.id].background_image_sect5 ? this.props.acf[0][this.props.id].background_image_sect5 : '';
            const fifthSectionStyles = {
                backgroundImage: 'url(' + backgroundImage_3 + ')',
            };

            //Custom fields
            let title_one_sect = this.props.acf[0][this.props.id].title_sect1 ? this.props.acf[0][this.props.id].title_sect1 : '';
            let title_two_sect = this.props.acf[0][this.props.id].title_sect2 ? this.props.acf[0][this.props.id].title_sect2 : '';
            let text_two_sect = this.props.acf[0][this.props.id].text_content_sect2 ? this.props.acf[0][this.props.id].text_content_sect2 : '';
            let text_three_sect = this.props.acf[0][this.props.id].text_content_sect3 ? this.props.acf[0][this.props.id].text_content_sect3 : '';
            let title_fourth_sect = this.props.acf[0][this.props.id].title_sect4 ? this.props.acf[0][this.props.id].title_sect4 : '';
            let text_fifth_sect = this.props.acf[0][this.props.id].text_content_sect5 ? this.props.acf[0][this.props.id].text_content_sect5 : '';
            let privacy_policy = this.state.themeOption ? this.state.themeOption.pw_privacy_policy : '';
            let alternative_text = this.state.themeOption ? this.state.themeOption.pw_alternative_text : '';

            return(
                <div className="experience-container">
                        <Header logo={logo} buttonColor={this.props.acf[0][this.props.id].button_color ? this.props.acf[0][this.props.id].button_color : ''} transparent={this.props.acf[0][this.props.id].transparent_header ? 'true' : ''} />
                    <section className="first-section padding-top-150px-lg-50px-sm" style={firstSectionStyles}>
                        <div className="container">
                            <div className="title-first-sect">
                                <h5>{this.props.acf[0][this.props.id].subtitle_sect1 ? this.props.acf[0][this.props.id].subtitle_sect1 : ''}</h5>
                                <h1 dangerouslySetInnerHTML={{__html: title_one_sect}}></h1>
                            </div>
                        </div>
                        <div className="video-container">
                            <div className="video-content top-82px" onClick={() => this.open('#videoModal1', 'video1')}>
                                <img src={this.props.acf[0][this.props.id].video_poster_sect1 ? this.props.acf[0][this.props.id].video_poster_sect1.url : ''} alt={this.props.acf[0][this.props.id].video_poster_sect1 ? this.props.acf[0][this.props.id].video_poster_sect1.alt : ''}/>                               
                                <div className="play-object">
                                    <div className="play-object-mini-box">
                                        <div className="rounded-object"></div>
                                        <p>CLICK TO WATCH <br/> THE VIDEO</p>
                                    </div>
                                </div>
                            </div>
                            {/* --------------- modal ---------------- */}
                            <div className="modal" id="videoModal1">
                                <div className="modal-close" onClick={() => this.close('#videoModal1', 'video1')}></div>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-body video-content">
                                            {this.state.video1 ? <ExperienceHeroVideo videoId={ this.props.acf[0][this.props.id].video_sect1 } autoplay={ this.props.acf[0][this.props.id].video_autoplay_sect_one }/> : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>{/* --------------- Ends modal ---------------- */}
                        </div>
                    </section>{/*ENDS FIRST SECTION */}
                    <section className="second-section">
                        <div className="container">
                            <div className="text-content-second-sect container-box-750px">
                                <span>{process.env.API_URL}</span>
                                <h2 className="submain-title blue-color" dangerouslySetInnerHTML={{__html: title_two_sect}}></h2>
                                <div dangerouslySetInnerHTML={{__html: text_two_sect}}></div>
                            </div>
                            <div className="big-dark-blue-button">
                                {this.verifyExperienceExpiration() ? 
                                    <Link to={{
                                    pathname: this.props.acf[0][this.props.id].enter_now_url_section2 ? this.props.acf[0][this.props.id].enter_now_url_section2 : '',
                                    search: `exp=${this.props.id}`,
                                    }} >
                                        {this.props.acf[0][this.props.id].button_text_sect2 ? this.props.acf[0][this.props.id].button_text_sect2 : ''}
                                    </Link>
                                    : ''
                                }
                            </div>
                            <div className="read-more-text">
                                <Link 
                                    className="green-medina-color" 
                                    to={this.props.acf[0][this.props.id].rules_url_sect2 ? this.props.acf[0][this.props.id].rules_url_sect2 : ''}>
                                    {this.props.acf[0][this.props.id].mini_text_sect2 ? this.props.acf[0][this.props.id].mini_text_sect2 : ''}
                                </Link>

                            </div>
                            <div>
                                {this.props.acf[0][this.props.id].counterdown_date_start && this.props.acf[0][this.props.id].counterdown_date_end ? <CounterDown color={this.props.acf[0][this.props.id].footer_title_color ? this.props.acf[0][this.props.id].footer_title_color : '#354389'} startdate={this.props.acf[0][this.props.id].counterdown_date_start} startdate={this.props.acf[0][this.props.id].counterdown_date_start} enddate={this.props.acf[0][this.props.id].counterdown_date_end} /> : '' }
                            </div>
                            <div className="text-second-sect">
                                <p className="little-thick">{this.props.acf[0][this.props.id].share_text_sect2 ? this.props.acf[0][this.props.id].share_text_sect2 : ''}</p>
                            </div>
                            <div className="expe-social-container">
                                <div className="expe-mini-box-1 clearfix">
                                    <div className="expe-icon-box">
                                        <FacebookShareButton
                                            url={shareUrl}
                                            quote={title}
                                            className="expe-icon-social">
                                            <FacebookIcon size={55} />
                                            <div className="social-icon-text-box">
                                                <p>SHARE ON FACEBOOK</p>
                                            </div>
                                        </FacebookShareButton>
                                    </div>
                                </div>
                                <div className="expe-mini-box-1 twitter-box clearfix">
                                    <div className="expe-icon-box">
                                        <TwitterShareButton
                                            url={shareUrl}
                                            quote={title}
                                            className="expe-icon-social">
                                            <TwitterIcon size={55} />
                                            <div className="social-icon-text-box">
                                                <p>SHARE ON TWITTER</p>
                                            </div>
                                        </TwitterShareButton>
                                    </div>
                                </div>
                                <div className="expe-mini-box-1 instagram-box clearfix">
                                    <div className="expe-icon-box">
                                        <a className="" href="https://www.instagram.com/kezandu/" target="_blank">
                                            <div className="img-social-follow">
                                                <img src={'/wp-content/themes/kezandu_theme/img/instagram-social.png'}/>
                                            </div>
                                            <div className="follow-icon-text-box">
                                                <p>FOLLOW US<br/> ON INSTAGRAM</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="expe-mini-box-1 youtube-box clearfix">
                                    <div className="expe-icon-box">
                                        <a className="" href="https://www.youtube.com/" target="_blank">
                                            <div className="img-social-follow">
                                                <img src={'/wp-content/themes/kezandu_theme/img/youtube-social.png'}/>
                                            </div>
                                            <div className="follow-icon-text-box">
                                                <p>FOLLOW US<br/> ON YOUTUBE</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>{/*ENDS expe-social-container */}
                        </div>{/*ENDS CONTAINER */}
                    </section>{/*ENDS SECOND SECTION */}
                    <section className="third-section-medina" style={thirdSectionStyles}>
                        <div className="container">
                            <div className="row">
                                <div className="col-0 col-sm-0 col-md col-lg">
                                </div>
                                <div className="col-12 col-sm-12 col-md-auto col-lg-auto">
                                    <div className="third-section-container width-470px">
                                        <div className="text-content-third-sect width-425px" dangerouslySetInnerHTML={{__html: text_three_sect}}>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 order-md-1">
                                                <div className="video-container">
                                                    <div className="video-content margin-bottom-35px" onClick={() => this.open('#videoModal2', 'video2')}>
                                                        <img src={this.props.acf[0][this.props.id].video_poster_1_sect3_ ? this.props.acf[0][this.props.id].video_poster_1_sect3_.url : ''} alt={this.props.acf[0][this.props.id].video_poster_1_sect3_ ? this.props.acf[0][this.props.id].video_poster_1_sect3_.alt : ''}/>                               
                                                        <div className="play-object">
                                                            <div className="play-object-mini-box">
                                                                <div className="little-rounded-object"></div>
                                                                <p className="little-play-object-text">CLICK TO WATCH <br/> THE VIDEO</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* --------------- modal ---------------- */}
                                                    <div className="modal" id="videoModal2">
                                                        <div className="modal-close" onClick={() => this.close('#videoModal2', 'video2')}></div>
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-body video-content">
                                                                    {this.state.video2 ? <ExperienceHeroVideo videoId={ this.props.acf[0][this.props.id].video_one_sect3 } autoplay={ this.props.acf[0][this.props.id].video_one_autoplay_sect3 }/> : ''}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>{/* --------------- Ends modal ---------------- */}
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 order-md-3">    
                                                <div className="extra-logo-third first-extra-logo">
                                                    <img src={this.props.acf[0][this.props.id].logo_image_one_sect3 ? this.props.acf[0][this.props.id].logo_image_one_sect3.url : ''} alt={this.props.acf[0][this.props.id].logo_image_one_sect3 ? this.props.acf[0][this.props.id].logo_image_one_sect3.alt : ''} />
                                                </div>
                                            </div> 
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 order-md-2">
                                                <div className="video-container">
                                                    <div className="video-content margin-bottom-35px" onClick={() => this.open('#videoModal3', 'video3')}>
                                                        <img src={this.props.acf[0][this.props.id].video_poster_2_sect3 ? this.props.acf[0][this.props.id].video_poster_2_sect3.url : ''} alt={this.props.acf[0][this.props.id].video_poster_2_sect3 ? this.props.acf[0][this.props.id].video_poster_2_sect3.alt : ''}/>                               
                                                        <div className="play-object">
                                                            <div className="play-object-mini-box">
                                                                <div className="little-rounded-object"></div>
                                                                <p className="little-play-object-text">CLICK TO WATCH <br/> THE VIDEO</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* --------------- modal ---------------- */}
                                                    <div className="modal" id="videoModal3">
                                                        <div className="modal-close" onClick={() => this.close('#videoModal3', 'video3')}></div>
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-body video-content">
                                                                    {this.state.video3 ? <ExperienceHeroVideo videoId={ this.props.acf[0][this.props.id].video_two_sect3 } autoplay={ this.props.acf[0][this.props.id].video_two_autoplay_sect3 }/> : ''}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>{/* --------------- Ends modal ---------------- */}
                                                </div>
                                            </div>  
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 order-md-4">    
                                                <div className="extra-logo-third">
                                                <img src={this.props.acf[0][this.props.id].logo_image_two_sect3 ? this.props.acf[0][this.props.id].logo_image_two_sect3.url : ''} alt={this.props.acf[0][this.props.id].logo_image_two_sect3 ? this.props.acf[0][this.props.id].logo_image_two_sect3.alt : ''} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>{/*ENDS COL */}
                            </div>{/*ENDS ROW */}
                        </div>{/*ENDS CONTAINER */}
                    </section>{/*ENDS THIRD SECTION */}
                    <section className="fourth-section-medina" id="content-form" editclass="false-edit">
                        <div className="container padding-top-bottom-85pxlg-25sm">
                            <div className="text-content-fourth-sect">
                                <div className="container-box-750px" dangerouslySetInnerHTML={{__html: title_fourth_sect}}>
                                </div>
                                <h6 className="dark-gray-color">{this.props.acf[0][this.props.id].mini_text_sect4 && this.verifyExperienceExpiration() ? this.props.acf[0][this.props.id].mini_text_sect4 : ''}</h6>
                            </div>
                            <div className="row margin-bottom-50px">
                                { this.props.entryBox && this.verifyExperienceExpiration() ? <EntryList pageid={this.props.id}/> : '' }
                            </div>{/*ENDS ROW */}
                            <div className="big-price" id="back-policy">
                                <h6 className="dark-gray-color">
                                    It's boring, but it's legal... <a className="show-privacy-button" onClick={() => this.edit('edit-profile-info-form')} >here</a> is what lawyers like you to know...
                                </h6>
                            </div>
                            <div className="edit-profile-form">
                                <div dangerouslySetInnerHTML={{__html: privacy_policy}}></div>
                                <Link to={{
                                    pathname: '/alternative-method-of-entry',
                                    search: `exp=${this.props.id}`,
                                }} >
                                    Alternative Method of Entry
                                </Link>
                                <div className="button-pro-container">
                                    <span className="cancel-privacy-button"   onClick={() => this.cancel() } >Read Less</span>
                                </div>
                            </div>
                        </div>{/*ENDS CONTAINER */}
                    </section>{/*ENDS FOURTH SECTION */}
                    <section className="fifth-Section" style={fifthSectionStyles}>
                    <div className="container">
                        <div className="box-container-fourth-sec" dangerouslySetInnerHTML={{__html: text_fifth_sect}}>
                        </div>
                    </div>{/*ENDS CONTAINER */}
                    </section>
                    <section className="social-share-section">
                        <div className="container">
                        <div className="expe-social-container">
                                <div className="expe-mini-box-1 clearfix">
                                    <div className="expe-icon-box">
                                        <FacebookShareButton
                                            url={shareUrl}
                                            quote={title}
                                            className="expe-icon-social">
                                            <FacebookIcon size={55} />
                                            <div className="social-icon-text-box">
                                                <p>SHARE ON FACEBOOK</p>
                                            </div>
                                        </FacebookShareButton>
                                    </div>
                                </div>
                                <div className="expe-mini-box-1 twitter-box clearfix">
                                    <div className="expe-icon-box">
                                        <TwitterShareButton
                                            url={shareUrl}
                                            quote={title}
                                            className="expe-icon-social">
                                            <TwitterIcon size={55} />
                                            <div className="social-icon-text-box">
                                                <p>SHARE ON TWITTER</p>
                                            </div>
                                        </TwitterShareButton>
                                    </div>
                                </div>
                                <div className="expe-mini-box-1 instagram-box clearfix">
                                    <div className="expe-icon-box">
                                        <a className="" href="https://www.instagram.com/kezandu/" target="_blank">
                                            <div className="img-social-follow">
                                                <img src={'/wp-content/themes/kezandu_theme/img/instagram-social.png'}/>
                                            </div>
                                            <div className="follow-icon-text-box">
                                                <p>FOLLOW US<br/> ON INSTAGRAM</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="expe-mini-box-1 youtube-box clearfix">
                                    <div className="expe-icon-box">
                                        <a className="" href="https://www.youtube.com/" target="_blank">
                                            <div className="img-social-follow">
                                                <img src={'/wp-content/themes/kezandu_theme/img/youtube-social.png'}/>
                                            </div>
                                            <div className="follow-icon-text-box">
                                                <p>FOLLOW US<br/> ON YOUTUBE</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>{/*ENDS expe-social-container */}
                        </div>
                    </section>
                    <div className="medina-footer">
                        <Footer logo={this.props.acf[0][this.props.id].footer_image ? this.props.acf[0][this.props.id].footer_image.url : ''} titleColor={this.props.acf[0][this.props.id].footer_title_color ? this.props.acf[0][this.props.id].footer_title_color : '#fff'} whiteFooter={this.props.acf[0][this.props.id].footer_background_color ? this.props.acf[0][this.props.id].footer_background_color : 'false'} />
                    </div>
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

export default connect(mapStateToProps, {fetchAcf, fetchEntryBox})(ExperienceMedina);