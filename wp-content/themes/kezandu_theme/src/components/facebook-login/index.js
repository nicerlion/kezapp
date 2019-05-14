import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import { fetchFacebookLogin } from '../../actions';
import Spinner from '../spinner';

class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      clicked: false,
      userID: '',
      name: '',
      email: '',
      picture: '',
      loading: ''
    }
  }

  responseFacebook = response => {
    if (this.state.clicked) {
      this.setState({loading: (<div active="true" className="loading-spinner"><Spinner /></div>) });
      fetchFacebookLogin(response).then(data => {        
        if (data.message == 'successful'){
          if (this.props.redirection == '#') {
            location.reload();
          } else {
            location.href = this.props.redirection;
          }
        } else if (data.message == 'error, not authorized') {
          this.setState({loading: (<div className="message message-error">Sorry, your account is not authorized to login through Facebook.</div>) });
        } else {
          this.setState({loading: (<div className="message message-error">An error has occurred please try later</div>) });
        }
      });
    }
  }

  componentClicked = () => {
    this.setState({ clicked: true, loading: ''});
  }

  render() {
    let fbContent;

    if(this.state.isLoggedIn) {
      fbContent = null;
    }else {
      fbContent = (
        <div>
          <FacebookLogin
            appId="778088635897245"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
          {this.state.loading}
          <div className="message-facebook-padding"></div>
        </div>
      )
    }
    return(
      <div>
        {fbContent}
      </div>
    )
  }

}

export default Facebook;
