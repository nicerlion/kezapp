import React, { Component } from 'react';

class ExperiencesItems extends Component {

    render () {
        
        if (this.props.experiences) {
            return this.props.experiences.items.map((experience) => {
                let style = {
                    backgroundColor: experience.color,
                    color: '#fff',
                    textAlign: 'center'
                };

                let backgroundImage = experience.image ? experience.image : '';
                let bannerStyles = {
                    backgroundImage: 'url(' + backgroundImage + ')',
                };

                let end_hour = experience.end_date.hour > 9 ? experience.end_date.hour : '0' + experience.end_date.hour;
                let hour = this.props.experiences.date.hour > 9 ? this.props.experiences.date.hour : '0' + this.props.experiences.date.hour;
                let end_minute = experience.end_date.minute > 9 ? experience.end_date.minute : '0' + experience.end_date.minute;
                let minute = this.props.experiences.date.minute > 9 ? this.props.experiences.date.minute : '0' + this.props.experiences.date.minute;
                
                let expiration_date = new Date(experience.end_date.year + '/' + experience.end_date.month + '/' + experience.end_date.day + ' ' + end_hour + ':' + end_minute + ':00');
                let today = new Date(this.props.experiences.date.year + '/' + this.props.experiences.date.month + '/' + this.props.experiences.date.day + ' ' + hour + ':' + minute + ':00');

                let milliseconds = Math.abs(expiration_date - today);
                let days = milliseconds / 86400000;
                
                let fotmate = '';
                if (days < 1) {

                    let time = milliseconds / 60000;
                    
                    if ((time / 60) >= 1) {
                        fotmate = Math.ceil(time / 60) + ' HOURS LEFT';
                    } else {
                        fotmate = time + ' REMAINING MINUTES';
                    }
                    
                } else {
                    fotmate = Math.round(days) + ' DAYS LEFT';
                }

                
                
                return (
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 one-col-enter relative min-height-235px square-experience-winner" key={experience.id} >
                        <div className="row resume-experiences-winner" style={bannerStyles}>
                            <div className="col-12 align-self-end">
                                <div className="mini-box-experiences-container">
                                    <div className="small-experiences-container">
                                        <span>{experience.name}</span>
                                        <h3>{experience.description}</h3>
                                    </div>
                                </div>
                                <div className="winner-left" style={style} >
                                    <span>{fotmate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }
        return '';
    }
}

export default ExperiencesItems;