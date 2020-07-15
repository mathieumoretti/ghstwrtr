import React from "react";

export default class CountdownTimer extends React.Component {
    constructor(props) {
        super(props);
         

        var now = new Date();
        var in5hours = new Date();
        in5hours.setHours( now.getHours() + 5);

        this.state = {
          targetDate : in5hours,
          theDiff : {
              hour : 5,
              min : 0,
              sec: 0,
          },
        };
      }
    
    periodicUpdate(){
       
        setTimeout(()=>{

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
       
    componentDidUpdate(){
        this.periodicUpdate();
    }
    
    render () {
        var aDate = this.state.theDiff;
        return `${aDate.hour}:${aDate.min}:${aDate.sec  }`;
    }
}