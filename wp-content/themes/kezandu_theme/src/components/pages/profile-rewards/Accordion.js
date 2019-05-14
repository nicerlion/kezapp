import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import {fetchRewards} from '../../../actions';

//import 'react-accessible-accordion/dist/fancy-example.css';
//import '../../assets/styles/base.css';
//import './style.css';
//import './media.css';

class AccordionClass extends Component {
    componentDidMount() {
        this.props.fetchRewards();
    }

    componentAccordionRewards() {
        if (this.props.rewards.length) {
            return (
                this.props.rewards[0].map(item => {
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
                    {this.componentAccordionRewards()}
                </Accordion>
                
            </div>
        )
    }
}

function mapStateToProps({rewards}) {
    return {rewards};
}

export default connect(mapStateToProps, {fetchRewards})(AccordionClass);