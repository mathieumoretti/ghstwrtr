import React from "react";

function diffTime(diff) {
    if (diff > 0) {            
        var totSeconds = diff / 1000;
        var seconds = Math.floor(totSeconds) % 60;

        var totMinutes = totSeconds / 60;
        var minutes = Math.floor(totMinutes) % 60;

        var totHours = totMinutes / 60 ;
        var hours = Math.floor(totHours) % 24;
        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        }
    }

    return {
        hours: 0,
        minutes: 0,
        seconds: 0,
    }
}

function countDown(date) {
    return(date - new Date());
}

function msToFutureDate(durationMs) {
    const diff = diffTime(durationMs);
    var future = new Date();
    future.setHours(future.getHours() + diff.hours);
    future.setMinutes(future.getMinutes() + diff.minutes);
    future.setSeconds(future.getSeconds() + diff.seconds);
    return future;
}

export class CountdownTimer extends React.Component {
    constructor(props) {
        super(props);
        let duration = props.duration || 0;
        let future = msToFutureDate(duration);
        var diff = diffTime(future - new Date());
        this.state = {
          targetDate : future,
          theDiff : {
            hours: diff.hours,
            minutes: diff.seconds,
            seconds: diff.minutes,
          },
        };
      }
    
    periodicUpdate(){       
        this.timer = setTimeout(()=>{
                this.setState({ theDiff: countDown(this.state.targetDate) });
        }, 1000);
    }

    componentDidMount() {
        this.periodicUpdate();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }
       
    componentDidUpdate(){
        this.periodicUpdate();
    }
    
    render () {
        var countDown = diffTime(this.state.theDiff);
        var formattedTime = '';
        formattedTime = (countDown.hours < 10) ? `0${countDown.hours}` : `${countDown.hours}`;
        formattedTime = (countDown.minutes < 10) ? `${formattedTime}:0${countDown.minutes}` : `${formattedTime}:${countDown.minutes}`;
        formattedTime = (countDown.seconds < 10) ? `${formattedTime}:0${countDown.seconds}` : `${formattedTime}:${countDown.seconds}`;
        return formattedTime;
    }
}