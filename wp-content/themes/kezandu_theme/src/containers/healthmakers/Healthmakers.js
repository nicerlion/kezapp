import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {fetchHealthmakers} from '../../actions';


class Healthmakers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            healthmakers: null,
        };
    }

    componentDidMount() {
        fetchHealthmakers().then(healthmakers => {
            this.setState({ healthmakers });
        });
    }s

    healthmakersData() {
        if (this.state.healthmakers) {
            return this.state.healthmakers.items.map((healthmaker) => {
                return (
                    <div className="column-14 relative" key={healthmaker.id}>
                        <a href={healthmaker.url} >
                            <img src={healthmaker.image} className="img-responsive full-width" alt="" />
                        </a>
                        <div className="absolute icon-insta text-center">
                            <div className="mini-health">
                                <h4>{healthmaker.title}</h4>
                                <p><a href={healthmaker.url} >Read more</a></p>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    }

    render () {
        if (this.state.healthmakers) {
            return (
                <div>
                    <div className="insta_home3 clearfix healthmakers-container-winner">
                        <div>
                            {this.healthmakersData()}
                        </div>
                    </div>{/* ends insta_home3 */}
                    <div className="big-dark-blue-button">
                        <Link to={this.state.healthmakers.buttonUrl}>
                            VIEW MORE WINNERS
                        </Link>
                    </div>
                </div>
            )
        }

        return '';
    } 

}


export default Healthmakers;