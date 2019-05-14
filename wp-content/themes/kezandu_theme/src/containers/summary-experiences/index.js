import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchExperiences } from '../../actions';
import ExperiencesItems from './experiencesItems';

class SummaryExperiences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experiences: null,
        };
    }

    componentDidMount() {

        let obj = {
            status: this.props.status ? this.props.status: 'active',
            quantity: this.props.quantity ? this.props.quantity: 3,
            order: this.props.order ? this.props.order: 'DESC',
            paged: 1,
        };

        fetchExperiences(obj).then(experiences => {
            this.setState({ experiences });
        });

    }

    render () {

        if (this.props.page && this.state.experiences) {

            return (
                <div>
                    <div className="row resume-margin-box">
                        <ExperiencesItems experiences={this.state.experiences} />
                    </div>
                    <div className="big-dark-blue-button margin-bottom-70pxlg-50pxsm">
                        <Link to={'/#'}>
                                MORE EXPERIENCES
                        </Link>
                    </div>
                </div>
            )
        }
        return '';
    }
}

export default SummaryExperiences;