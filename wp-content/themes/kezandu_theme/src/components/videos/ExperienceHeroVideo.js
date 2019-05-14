import React, { Component } from 'react';
import YouTube from 'react-youtube';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class ExperienceHeroVideo extends Component {

    constructor(props){
        super(props);
        window.React = React;
        window.ReactDOM = ReactDOM;
    }

    componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {

        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
          if (isScriptLoadSucceed) {
          }
          else this.props.onError()
        }
      }
     
    componentDidMount () {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props
        if (isScriptLoaded && isScriptLoadSucceed) {
        }
    }

    componentWillUnmount() {
        delete window.React
        delete window.ReactDOM
    }

    renderYouTubeVideo() {
        
    }

    render() {
        
        const opts = {
            height: 'auto',
            width: '100%',
            playerVars: {
                autoplay: this.props.autoplay,
                rel: 0
            }
        };

        return (
            this.props.isScriptLoadSucceed? <YouTube
                videoId={ this.props.videoId }
                opts={ opts }
                onReady={ this._onReady }
                onSlide={ this.onSlide }
            />:
            null
        )
    }

    _onReady(event) {
        //event.target.pauseVideo();
    }

    _onOut(event) {
        //event.target.pauseVideo();
    }

}
export default scriptLoader('https://s.ytimg.com/yts/jsbin/www-widgetapi-vflHdGmps/www-widgetapi.js')(ExperienceHeroVideo);
