import React from 'react';
import './timeStrip.css';

class TimeStrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curTime: +Date.now()
        }
    }

    componentDidMount() {
      this.interval = setInterval(() => this.setState({ curTime: +Date.now() }), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
        const time = this.props.time,
            curTime = this.state.curTime,
            timeDiff = Math.abs(time - curTime),
            diffDays = (Math.floor(timeDiff / (1000 * 3600 * 24)) > 1) ? '' + Math.floor(timeDiff / (1000 * 3600 * 24)) + ' days ago': undefined,
            diffHours = Math.floor(timeDiff / (1000 * 3600 )) ? '' + Math.floor(timeDiff / (1000 * 3600 )) + ' hours ago': undefined,
            diffMins = Math.floor(timeDiff / (1000 * 60)) ? '' + Math.floor(timeDiff / (1000 * 60)) + ' mins ago': undefined,
            diffSecs = Math.floor(timeDiff / (1000)) ? '' + Math.floor(timeDiff / (1000)) + ' secs ago': undefined;

        return <span className='time-strip'>{(diffDays || diffHours || diffMins || diffSecs)}</span>
    }
}

export default TimeStrip;