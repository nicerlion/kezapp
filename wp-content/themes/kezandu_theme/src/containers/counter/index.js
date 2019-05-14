import React, {Component} from 'react';
import moment from 'moment';

class CounterDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remainingDays: 0,
            remainingHours: 0,
            remainingMinutes: 0,
            remainingSeconds: 0,
            //secondsDataPct: 100,
            //secondsStroke: 0,
            minutesDataPct: 100,
            minutesStroke: 0,
            hoursDataPct: 100,
            hoursStroke: 0,
            daysDataPct: 100,
            daysStroke: 0,
            circleWidth: 200,
            circleHeight: 200,
            sda: 565.48,
            radio: 65,
            cx: 100,
            cy: 100,
            fill: 'transparent'
        }

        //this.calculateSeconds = this.calculateSeconds.bind(this);
        this.calculateMinutes = this.calculateMinutes.bind(this);
        this.calculateHours = this.calculateHours.bind(this);
        this.calculateDays = this.calculateDays.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {

        const endingDate = (this.props.enddate).replace(/\-/g,'/');
        const currentDate = new Date();
        const deadlineDate = new Date(endingDate);
        const distance = deadlineDate - currentDate;

        //let remainingSeconds = Math.floor((distance % (1000 * 60)) / 1000);
        let remainingDays = Math.floor(distance / (1000 * 60 * 60 * 24));
        let remainingHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let remainingMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        //this.calculateSeconds(parseInt(remainingSeconds));
        this.calculateMinutes(parseInt(remainingMinutes));
        this.calculateHours(parseInt(remainingHours));
        this.calculateDays(parseInt(remainingDays));
        
    }

    // calculateSeconds(val) {
        
    //     if(isNaN(val)) {
    //         val = 100;
    //     }
    //     else{
    //         const rad = 90;
    //         let c = Math.PI*(rad*2);

    //         if(val < 0) {
    //             val = 0;
    //         }

    //         if(val > 100) {
    //             val = 100;
    //         }
            
    //         let percentage = (val / 60) * 100;
    //         let pct = ((100 - percentage)/100) * c;

    //         this.setState({
    //             secondsDataPct: val,
    //             secondsStroke: pct
    //         })
    //    }
    // }

    calculateMinutes(val) {
        
        if(isNaN(val)) {
            val = 100;
        }
        else{
            const rad = 90;
            let c = Math.PI*(rad*2);

            if(val < 0) {
                val = 0;
            }

            if(val > 100) {
                val = 100;
            }
            
            let percentage = (val / 60) * 100;
            let pct = 0;
            
            if(isNaN(((100 - percentage)/100) * c)) {
                pct = 0;
            }else {
                pct = ((100 - percentage)/100) * c;
            }
            

            this.setState({
                minutesDataPct: val,
                minutesStroke: pct
            })
       }
    }

    calculateHours(val) {
        
        if(isNaN(val)) {
            val = 100;
        }
        else{
            const rad = 90;
            let c = Math.PI*(rad*2);

            if(val < 0) {
                val = 0;
            }

            if(val > 100) {
                val = 100;
            }
            
            let percentage = (val / 24) * 100;
            let pct = 0;
            
            if(isNaN(((100 - percentage)/100) * c)) {
                pct = 0;
            }else {
                pct = ((100 - percentage)/100) * c;
            }

            this.setState({
                hoursDataPct: val,
                hoursStroke: pct
            })
       }
    }

    calculateDays(val) {

        if(isNaN(val, )) {
            val = 0;
        }
        else{
            const rad = 90;
            let c = Math.PI*(rad*2);

            if(val < 0) {
                val = 0;
            }

            if(val > 100) {
                val = 100;
            }

            const startDay = new Date(this.props.startdate).getTime();
            const endDay = new Date(this.props.enddate).getTime();
            const dayDistance = endDay - startDay;
            const dayDistanceConverted = Math.floor(dayDistance / (1000 * 60 * 60 * 24))
            
            let percentage = (val / dayDistanceConverted) * 100;
            let pct = 0;
            
            if(isNaN(((100 - percentage)/100) * c)) {
                pct = 0;
            }else {
                pct = ((100 - percentage)/100) * c;
            }

            this.setState({
                daysDataPct: val,
                daysStroke: pct
            })
       }
    }

    
    render() {

        // const secondStyles = {
        //     secondsCircleStyle: {
        //         strokeDashoffset: this.state.secondsStroke
        //     }
        // }

        const minutesStyles = {
            minutesCircleStyle: {
                strokeDashoffset: this.state.minutesStroke,
                stroke: this.props.color ? this.props.color : '#354389',
            }
        }

        const hoursStyles = {
            hoursCircleStyle: {
                strokeDashoffset: this.state.hoursStroke,
                stroke: this.props.color ? this.props.color : '#354389',
            }
        }

        const daysStyles = {
            daysCircleStyle: {
                strokeDashoffset: this.state.daysStroke,
                stroke: this.props.color ? this.props.color : '#354389',
            }
        }

        // const { secondsCircleStyle } = secondStyles;
        const { minutesCircleStyle } = minutesStyles;
        const { hoursCircleStyle } = hoursStyles;
        const { daysCircleStyle } = daysStyles;
        const styleColor = {
            color: this.props.color ? this.props.color : '#354389',
        };

        return(
            <div className="counter-container">
                
                <div className="counter days" data-pct={this.state.daysDataPct} style={styleColor}>
                    <svg className="svg" width={this.state.circleWidth} height={this.state.circleHeight} viewport="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <circle r={this.state.radio} cx={this.state.cx} cy={this.state.cy} fill={this.state.fill} strokeDasharray={this.state.sda} strokeDashoffset="0"></circle>
                        <circle className="bar" r={this.state.radio} cx={this.state.cx} cy={this.state.cy} fill={this.state.fill} strokeDasharray={this.state.sda} strokeDashoffset={ this.state.daysStroke } style={daysCircleStyle}></circle>
                    </svg>
                    <span className="counter-type">DAYS</span>
                </div>
                <div className="counter hours" data-pct={this.state.hoursDataPct} style={styleColor}>
                    <svg className="svg" width={this.state.circleWidth} height={this.state.circleHeight} viewport="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <circle r={this.state.radio} cx={this.state.cx} cy={this.state.cy} fill={this.state.fill} strokeDasharray={this.state.sda} strokeDashoffset="0"></circle>
                        <circle className="bar" r={this.state.radio} cx={this.state.cx} cy={this.state.cy} fill={this.state.fill} strokeDasharray={this.state.sda} strokeDashoffset={ this.state.hoursStroke } style={hoursCircleStyle}></circle>
                    </svg>
                    <span className="counter-type">HOURS</span>
                </div>

                <div className="counter minutes" data-pct={this.state.minutesDataPct} style={styleColor}>
                    <svg className="svg" width={this.state.circleWidth} height={this.state.circleHeight} viewport="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <circle r={this.state.radio} cx={this.state.cx} cy={this.state.cy} fill={this.state.fill} strokeDasharray={this.state.sda} strokeDashoffset="0"></circle>
                        <circle className="bar" r={this.state.radio} cx={this.state.cx} cy={this.state.cy} fill={this.state.fill} strokeDasharray={this.state.sda} strokeDashoffset={ this.state.minutesStroke } style={minutesCircleStyle}></circle>
                    </svg>
                    <span className="counter-type">MINUTES</span>
                </div>
                
                {/* <div className="counter seconds" data-pct={this.state.secondsDataPct}>
                    <svg className="svg" width={this.state.circleWidth} height={this.state.circleHeight} viewport="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <circle r={this.state.radio} cx={this.state.cx} cy={this.state.cy} fill={this.state.fill} strokeDasharray={this.state.sda} strokeDashoffset="0"></circle>
                        <circle className="bar" r={this.state.radio} cx={this.state.cx} cy={this.state.cy} fill={this.state.fill} strokeDasharray={this.state.sda} strokeDashoffset={ this.state.secondsStroke } style={secondsCircleStyle}></circle>
                    </svg>
                    <span className="counter-type">SECONDS</span>
                </div> */}
            </div>
        )
    }
}

export default CounterDown;