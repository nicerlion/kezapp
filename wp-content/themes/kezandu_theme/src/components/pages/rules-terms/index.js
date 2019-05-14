import React, { Component  } from 'react';
import { connect } from 'react-redux';

import Header from '../../header';
import Footer from '../../footer';
import {fetchAcf} from '../../../actions';
import Spinner from '../../spinner';

class RulesTerms extends Component {

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

            let title_one_sect = this.props.acf[0][this.props.id].title_sect_one ? this.props.acf[0][this.props.id].title_sect_one : '';
            let text_two_sect = this.props.acf[0][this.props.id].text_content_sect_two ? this.props.acf[0][this.props.id].text_content_sect_two : '';
        
            return (
            <div className="privacy-policy">
                    <Header logo={logo} buttonColor={this.props.acf[0][this.props.id].button_color ? this.props.acf[0][this.props.id].button_color : ''} transparent={this.props.acf[0][this.props.id].transparent_header ? 'true' : ''} />
                    <section className="first-section-privacy margin-top-50px">
                        <div className="container">
                            <div className="padding-bottom-50px">
                                <h1 className="blue-h1" dangerouslySetInnerHTML={{__html: title_one_sect}}></h1>
                            </div>
                        </div>{/*ENDS CONTAINER */}
                    </section>
                    <section className="second-section-policy">
                        <div className="container">
                            <div className="container-second-section-policy container-box-780px">
                                <div dangerouslySetInnerHTML={{__html: text_two_sect}}></div>
                            </div>
                        </div>
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

export default connect(mapStateToProps, {fetchAcf})(RulesTerms);