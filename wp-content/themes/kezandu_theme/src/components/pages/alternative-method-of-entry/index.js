import React, { Component  } from 'react';
import { connect } from 'react-redux';

import Header from '../../header';
import Footer from '../../footer';
import {fetchAcf} from '../../../actions';
import Spinner from '../../spinner';
import AlternativeMethod from '../../../containers/forms/AlternativeMethod';

class AlternativeMethodOfEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expId: null,
        };
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
        const urlParams = new URLSearchParams(this.props.search);
        const expId = urlParams.get('exp');
        this.setState({ expId: expId });
        if (!expId) {
            location.href = '/';
        }
    }

    render(){

        if (this.props.acf.length && this.props.acf[0][this.props.id]) {

            let logo = this.props.acf[0][this.props.id].logo ? this.props.acf[0][this.props.id].logo : '';
        
            if (logo === 'other') {
                logo = this.props.acf[0][this.props.id].other_logo ? this.props.acf[0][this.props.id].other_logo : '';
            }

            let text_one_sect = this.props.acf[0][this.props.id].text_content ? this.props.acf[0][this.props.id].text_content : '';
        
            return(
                <div className="alternative-method">
                        <Header logo={logo} buttonColor={this.props.acf[0][this.props.id].button_color ? this.props.acf[0][this.props.id].button_color : ''} transparent={this.props.acf[0][this.props.id].transparent_header ? 'true' : ''} />
                    <section className="first-section-pro margin-top-50px">
                        <div className="container">
                            <div className="padding-bottom-50px">
                                <h1 className="blue-h1">{this.props.acf[0][this.props.id].title ? this.props.acf[0][this.props.id].title : ''}</h1>
                            </div>
                            <div className="steps-line-profile padding-bottom-50px">
                                <p>{this.props.acf[0][this.props.id].subtitle_text ? this.props.acf[0][this.props.id].subtitle_text : ''}</p>
                            </div>
                        </div>
                    </section>
                    <section className="second-section-pro" id="content-form" editclass="false-edit" style={{backgroundColor:'#ffffff'}}>
                        <div className="container">
                            <div className="box-container-pro">
                                <div className="box-inside-container-pro container-box-485px">
                                    <div className="first-mini-box-pro">
                                        <div id="alternative-method" className="personal-info-profile">
                                            <AlternativeMethod expId={this.state.expId} />
                                        </div>
                                    </div>
                                </div>{/*ENDS BOX INSIDE CONTAINER */}
                            </div>{/*ENDS BOX CONTAINER */}
                        </div>{/*ENDS CONTAINER */}
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

export default connect(mapStateToProps, {fetchAcf})(AlternativeMethodOfEntry);