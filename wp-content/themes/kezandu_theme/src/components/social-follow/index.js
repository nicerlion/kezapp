import React, { Component } from 'react';
import {fetchThemeOption} from '../../actions/index';

class SocialFollow extends Component {

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

    render () {

        let social_facebook = this.state.themeOption ? this.state.themeOption.pw_social_facebook : '';
        let social_twitter = this.state.themeOption ? this.state.themeOption.pw_social_twitter : '';
        let social_instagram = this.state.themeOption ? this.state.themeOption.pw_social_instagram : '';
        let social_youtube = this.state.themeOption ? this.state.themeOption.pw_social_youtube : '';

        return (
            <div className="expe-social-container">
                <div className="expe-mini-box-1 facebook-box clearfix">
                    <div className="expe-icon-box">
                        <a href={social_facebook} className="" target="_blank">
                            <div className="img-social-follow">
                                <img src={'/wp-content/themes/kezandu_theme/img/facebook-social.png'}/>
                            </div>
                            <div className="follow-icon-text-box">
                                <p>FOLLOW US<br/> ON FACEBOOK</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="expe-mini-box-1 twitter-box clearfix">
                    <div className="expe-icon-box">
                        <a href={social_twitter} className="" target="_blank">
                            <div className="img-social-follow">
                                <img src={'/wp-content/themes/kezandu_theme/img/twitter-social.png'}/>
                            </div>
                            <div className="follow-icon-text-box">
                                <p>FOLLOW US<br/> ON TWITTER</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="expe-mini-box-1 instagram-box clearfix">
                    <div className="expe-icon-box">
                        <a href={social_instagram}className="" target="_blank">
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
                        <a href={social_youtube} className="" target="_blank">
                            <div className="img-social-follow">
                                <img src={'/wp-content/themes/kezandu_theme/img/youtube-social.png'}/>
                            </div>
                            <div className="follow-icon-text-box">
                                <p>FOLLOW US<br/> ON YOUTUBE</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
           
        )
    }
}

export default SocialFollow;