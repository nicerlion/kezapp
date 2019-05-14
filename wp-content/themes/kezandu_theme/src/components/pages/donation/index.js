import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchAcf, fetchEntryDataItem, fetchCustomer } from '../../../actions';
import Spinner from '../../spinner';
import EntryDetail from '../../../containers/entries/EntryDetail';
import UserForm from '../../../containers/forms/UserForm';

import Header from '../../header';
import Footer from '../../footer';

class Donation extends Component {
    constructor(props) {
        super(props);
        this.state = {
          entry: null,
          isChecked: true,
          expId: null,
        };
    }
  
    componentDidMount() {
        if (typeof (Storage) !== "undefined") {
            let id = localStorage.getItem("wordpress_logged_user");
            this.props.fetchCustomer(id);
        }

        this.getPages();

        if (
            this.props.history.location &&
            this.props.history.location.state &&
            this.props.history.location.state.entry
        ) {
            this.setState({ entry: this.props.history.location.state.entry });
        } else {
            this.getEntry();
        }
    }

    getEntry() {
        const urlParams = new URLSearchParams(this.props.location.search);
        const entryId = urlParams.get('ent');
        if (!entryId) {
            this.props.history.push('/');
        }

        fetchEntryDataItem(entryId).then(entry => {
            this.setState({ entry });
        });
    }

    getPages() {
        const urlParams = new URLSearchParams(this.props.location.search);
        const expId = urlParams.get('exp');
        this.setState({ expId });

        let pagesIds = [this.props.id]

        if (!expId) {
            location.href = '/';
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

    userFormHelper(){
        return(
            this.state.entry 
                && this.props.customer.length 
                && this.props.acf.length
                && this.props.acf[0][this.props.id]
                && this.props.acf[0][this.state.expId] ?
                <UserForm propsdata={this.props.acf} userId={this.props.customer[0].id} userMail={this.props.customer[0].email} statedata={this.state} exp_id={this.state.expId} experience={this.props.acf[0][this.state.expId]}/> :
            null
            
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            this.getEntry();
        }
    }

    render() {
        if (this.props.acf.length 
            && this.props.acf[0][this.props.id] 
            && this.props.acf[0][this.state.expId]) {
    
            let logo = this.props.acf[0][this.props.id].logo ? this.props.acf[0][this.props.id].logo : '';
        
            if (logo === 'other') {
                logo = this.props.acf[0][this.props.id].other_logo ? this.props.acf[0][this.props.id].other_logo : '';
            }
            
            return(
                <div className="donation">
                    <Header logo={logo} buttonColor={this.props.acf[0][this.props.id].button_color ? this.props.acf[0][this.props.id].button_color : ''} transparent={this.props.acf[0][this.props.id].transparent_header ? 'true' : ''} />
                    <section className="first-section-pro margin-top-50px">
                        <div className="container">
                            <div className="padding-bottom-50px">
                                <h1 className="blue-h1">{this.props.acf[0][this.props.id].title ? this.props.acf[0][this.props.id].title : ''}</h1>
                            </div>
                            <div className="progressbar-container clearfix">
                                <ul className="progressbar-donation clearfix">
                                    <li>CHOOSE AMOUNT</li>
                                    <li className="active">ENTER YOUR INFO</li>
                                    <li>YOU'RE ALL SET</li>
                                </ul>
                            </div>
                        </div>{/*ENDS CONTAINER */}
                    </section>
                    <section className="second-section-donation">
                        <div className="container">
                            {this.userFormHelper()}
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

function mapStateToProps({ acf, customer }) {
    return {
        acf, customer
    };
}

export default connect(mapStateToProps, {fetchAcf, fetchCustomer})(withRouter(Donation));