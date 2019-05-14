import React, {Component} from 'react';

import Menu from '../containers/parts/menu';
import {fetchThemeOption} from '../actions/index';
export default class Footer extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            themeOption: null,
        };
    }

    componentDidMount() {
        let options = ['pw_copyright', 'pw_questions', 'pw_social_facebook', 'pw_social_twitter', 'pw_social_instagram', 'pw_social_youtube'];

        fetchThemeOption(options).then(themeOption => {
            this.setState({ themeOption });
        });
    }
    
    getYear() {
        var date = new Date();
        return date.getFullYear();
    }

    render() {
        const titleColor = {
            color: this.props.titleColor ? this.props.titleColor : '#ffffff',
        };

        const whiteFooter = this.props.whiteFooter == 'true' ? 'white-footer' : 'blue-footer';
        let copyright = this.state.themeOption ? this.state.themeOption.pw_copyright : '';
        let questions = this.state.themeOption ? this.state.themeOption.pw_questions : '';
        let social_facebook = this.state.themeOption ? this.state.themeOption.pw_social_facebook : '';
        let social_twitter = this.state.themeOption ? this.state.themeOption.pw_social_twitter : '';
        let social_instagram = this.state.themeOption ? this.state.themeOption.pw_social_instagram : '';
        let social_youtube = this.state.themeOption ? this.state.themeOption.pw_social_youtube : '';
        
        let contentSocial = (
                <ul>
                    <li><a href={social_facebook} target="_blank"><img src="/wp-content/themes/kezandu_theme/img/facebook-gray.png" />Facebook</a></li>
                    <li><a href={social_twitter} target="_blank"><img src="/wp-content/themes/kezandu_theme/img/twitter-gray.png" />Twitter</a></li>
                    <li><a href={social_instagram} target="_blank"><img src="/wp-content/themes/kezandu_theme/img/instagram-gray.png" />Instagram</a></li>
                    <li><a href={social_youtube} target="_blank"><img src="/wp-content/themes/kezandu_theme/img/youtube-gray-social-18px.png" />Youtube</a></li>
                </ul>
            );

        if  (this.props.whiteFooter != "true") {
            contentSocial = (
                <ul>
                    <li><a href={social_facebook} target="_blank" ><img src="/wp-content/themes/kezandu_theme/img/faceboook-white-social-18px.png" />Facebook</a></li>
                    <li><a href={social_twitter} target="_blank" ><img src="/wp-content/themes/kezandu_theme/img/twitter-white-social-18px.png" />Twitter</a></li>
                    <li><a href={social_instagram} target="_blank" ><img src="/wp-content/themes/kezandu_theme/img/instagram-white-social-18px.png" />Instagram</a></li>
                    <li><a href={social_youtube} target="_blank" ><img src="/wp-content/themes/kezandu_theme/img/youtube-white-social-18px.png" />Youtube</a></li>
                </ul>
                );
        }

        return (
            <footer className={whiteFooter} >
                <div className="container">
                    <div className="row first-content-footer">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                            <img src={this.props.logo ? this.props.logo : '/wp-content/themes/kezandu_theme/img/blue-logo-footer.png'} alt='logo-footer' className='logo-img logo-image-footer' />
                        </div>{/*ENDS COL */}
                        <div className="col-12 col-sm-12 col-md-2 col-lg-2">
                            <div className="mini-box-footer">
                                <h4 style={titleColor} >KEZANDU</h4>
                                <Menu name="footer_menu"/>
                                
                            </div>
                        </div>{/*ENDS COL */}
                        <div className="col-12 col-sm-12 col-md-2 col-lg-2">
                            <div className="mini-box-footer">
                                <h4 style={titleColor} >MORE</h4>
                                <Menu name="footer_menu_two"/>
                                
                            </div>
                        </div>{/*ENDS COL */}
                        <div className="col-12 col-sm-12 col-md-2 col-lg-2">
                            <div className="mini-box-footer">
                                <h4 style={titleColor} >SOCIAL MEDIA</h4>
                                <div className="social-footer">
                                    {contentSocial}
                                </div>
                            </div>
                        </div>{/*ENDS COL */}
                    </div>{/*ENDS ROW */}
                    <div className="row second-content-footer dark-gray-color">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                            <p dangerouslySetInnerHTML={{__html: copyright}}></p>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                            <p className="second-box-copy" dangerouslySetInnerHTML={{__html: questions}}></p>
                        </div>
                    </div>
                    </div>{/*ENDS CONTAINER */}
            </footer>
        );
    }
}
