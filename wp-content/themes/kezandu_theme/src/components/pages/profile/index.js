import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

//import '../../assets/styles/base.css';
//import './style.css';
//import './media.css';
import Header from '../../header';
import Footer from '../../footer';
import { fetchAcf, fetchCustomer} from '../../../actions';
import Spinner from '../../spinner';
import ProfileInfoForm from '../../../containers/forms/ProfileInfoForm';
import ProfileShippingForm from '../../../containers/forms/ProfileShippingForm';
import ProfileBillingForm from '../../../containers/forms/ProfileBillingForm';
import ChangeYourPassword from '../../../containers/forms/ChangeYourPassword';
import ProfileNav from '../../../containers/parts/profileNav';


class Profile extends Component {

    edit(formCont) {
        document.getElementById('content-form').attributes.editclass.value = formCont;
    }

    componentDidMount() {
        if (typeof (Storage) !== "undefined") {
            let id = localStorage.getItem("wordpress_logged_user");
            this.props.fetchCustomer(id);
        }

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

        if (this.props.customer.length) {
            if (this.props.customer[0].id < 1) {
                return (<Redirect to='/' />);
            }
        }

        if (this.props.acf.length && this.props.acf[0][this.props.id] && this.props.customer.length && this.props.customer[0] && this.props.customer[0].id) {

            let logo = this.props.acf[0][this.props.id].logo ? this.props.acf[0][this.props.id].logo : '';
        
            if (logo === 'other') {
                logo = this.props.acf[0][this.props.id].other_logo ? this.props.acf[0][this.props.id].other_logo : '';
            }

            let text_one_sect = this.props.acf[0][this.props.id].text_content ? this.props.acf[0][this.props.id].text_content : '';
        
            return(
                <div className="Profile">
                        <Header logo={logo} buttonColor={this.props.acf[0][this.props.id].button_color ? this.props.acf[0][this.props.id].button_color : ''} transparent={this.props.acf[0][this.props.id].transparent_header ? 'true' : ''} />
                    <section className="first-section-pro margin-top-50px">
                        <div className="container">
                            <div className="padding-bottom-50px">
                                <h1 className="blue-h1">{this.props.acf[0][this.props.id].title ? this.props.acf[0][this.props.id].title : ''}</h1>
                            </div>
                            <div className="steps-line-profile">
                                <div className="inside-steps-line-profile clearfix">
                                    <ProfileNav />
                                </div>
                                <div className="inside-steps-text-profile">
                                    <p dangerouslySetInnerHTML={{__html: text_one_sect}}></p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="second-section-pro" id="content-form" editclass="false-edit" style={{backgroundColor:'#ffffff'}}>
                        <div className="container">
                            <div className="box-container-pro">
                                <div className="box-inside-container-pro container-box-485px">
                                    <div className="first-mini-box-pro">
                                        <h4 className="display-inl-block">About You</h4> 
                                        <button className="edit-form-button" onClick={() => this.edit('edit-profile-info-form')} >Edit</button>
                                        <div id="info-profile" className="personal-info-profile">
                                            <ProfileInfoForm customer_data={this.props.customer} />
                                        </div>
                                    </div>
                                    <div className="first-mini-box-pro">
                                        <h4 className="display-inl-block">Shipping Address</h4>
                                        <button className="edit-form-button" onClick={() => this.edit('edit-shipping-info-form') }>Edit</button>
                                        <div className="personal-info-profile">
                                            <ProfileShippingForm customer_data={this.props.customer} />
                                        </div>
                                    </div>
                                    <div className="first-mini-box-pro">
                                        <h4 className="display-inl-block">Billing Information</h4>
                                        {/* <button className="edit-form-button" onClick={() => this.edit('edit-billing-info-form') }>Edit</button> */}
                                        <div className="personal-info-profile">
                                            <ProfileBillingForm customer_data={this.props.customer} />
                                        </div>
                                    </div>
                                    <div className="first-mini-box-pro">
                                        <h4>Change your Password</h4>
                                        <div className="personal-info-profile">
                                            {/* <form action="/action_page.php">
                                                <div className="form-group">
                                                    <input type="password" className="form-control" id="pwd" placeholder="Current Password" />
                                                </div>
                                                <div className="form-group ">
                                                    <input type="password" className="form-control" id="new-pwd" placeholder="New Password" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control" id="current-pwd" placeholder="Re-type Password" />
                                                </div>
                                                <div className="blue-button margin-top-50px">
                                                    <Link to="#" className="btn btn-default">{this.props.acf[0][this.props.id].text_button ? this.props.acf[0][this.props.id].text_button : ''}</Link>
                                                </div>
                                                <div className="checkbox">
                                                    <p className="little-thick">{this.props.acf[0][this.props.id].text_forgot_password ? this.props.acf[0][this.props.id].text_forgot_password : ''} <Link to={this.props.acf[0][this.props.id].link_next_forgot ? this.props.acf[0][this.props.id].link_next_forgot : ''}>{this.props.acf[0][this.props.id].text_next_forgot ? this.props.acf[0][this.props.id].text_next_forgot : ''}</Link></p>
                                                </div>
                                            </form> */}
                                            <ChangeYourPassword customer_data={this.props.customer} />
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

function mapStateToProps({acf, customer}) {
    return {acf, customer};
}

export default connect(mapStateToProps, { fetchAcf, fetchCustomer})(Profile);