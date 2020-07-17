import React from "react";

export default class CountdownTimer extends React.Component {
    constructor(props) {
        super(props);
         
        this.timer = null;
        var now = new Date();
        var in6seconds = new Date();
        in6seconds.setSeconds( now.getSeconds() + 6);

        this.state = {
          targetDate : in6seconds,
          theDiff : {
              hour : 0,
              min : 0,
              sec: 6,
          },
        };
      }
    
    periodicUpdate(){
       
        this.timer = setTimeout(()=>{

            var now = new Date();
            var diffTime = this.state.targetDate - now;

            if (diffTime > 0)
            {            
                var totSeconds = diffTime / 1000;
                var seconds = Math.floor(totSeconds) % 60;

                var totMinutes = totSeconds / 60;
                var minutes = Math.floor(totMinutes) % 60;

                var totHours = totMinutes / 60 ;
                var hours = Math.floor(totHours) % 24;
                this.setState({ theDiff: {
                    hour : hours,
                    min : minutes,
                    sec: seconds,
                } });
            }
        }, 2000);
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
        var aDate = this.state.theDiff;
        return `${aDate.hour}:${aDate.min}:${aDate.sec  }`;
    }
}