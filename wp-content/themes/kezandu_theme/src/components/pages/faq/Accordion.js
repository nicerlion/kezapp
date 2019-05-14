import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import {fetchFaq} from '../../../actions';

//import 'react-accessible-accordion/dist/fancy-example.css';
//import '../../assets/styles/base.css';
//import './style.css';
//import './media.css';

class AccordionClass extends Component {

    componentDidMount() {
        this.props.fetchFaq();
    }

    componentEntryBox() {
        if (this.props.faq.length) {
            return (
                this.props.faq[0].map(item => {
                    return (
                        <AccordionItem key={item.id}>
                            <AccordionItemTitle>
                                <h5>{item.title}</h5>
                            </AccordionItemTitle>
                            <AccordionItemBody>
                                <p>{item.text_content}</p>
                            </AccordionItemBody>
                        </AccordionItem>
                    );
                })
            )
        }
    }


    render(){
        return(
            <div>
                <Accordion>
                    {this.componentEntryBox()}
                </Accordion>
                
            </div>
        )
    }
}

function mapStateToProps({faq}) {
    return {faq};
}

export default connect(mapStateToProps, {fetchFaq})(AccordionClass);