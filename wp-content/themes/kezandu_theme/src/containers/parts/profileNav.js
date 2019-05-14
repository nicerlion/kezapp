import React, {Component} from 'react';
import { Link, NavLink } from 'react-router-dom';

class ProfileNav extends  Component {
    render() {
        
        // only consider an event active if its event id is an odd number
        const oddEvent = (match, location) => {
            if (!match) {
            return false
            }
            const eventID = parseInt(match.params.eventID)
            return !isNaN(eventID) && eventID % 2 === 1
        }
        return (
            <div>
                <ul>
                    <NavLink to="/profile" activeClassName="selected" isActive={oddEvent}>YOUR INFO</NavLink>
                </ul>
            </div>
        )
    }
}

export default ProfileNav;