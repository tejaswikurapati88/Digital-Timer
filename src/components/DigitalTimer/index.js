// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {limit: 25, seconds: 0, istimeRunning: false, timerLimits: 25}

  onStart = () => {
    this.setState({istimeRunning: true})
    this.timerID = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {timerLimits, seconds} = this.state
    if (timerLimits === 0 && seconds === 0) {
      clearInterval(this.timerId)
    } else {
      const second = timerLimits * 60 - 1 + seconds
      const m = Math.floor(second / 60)
      const s = second % 60
      this.setState({seconds: s, timerLimits: m})
    }
  }

  onPause = () => {
    this.setState({istimeRunning: false})
    clearInterval(this.timerID)
  }

  onReset = () => {
    this.setState({
      limit: 25,
      seconds: 0,
      istimeRunning: false,
      timerLimits: 25,
    })
    clearInterval(this.timerID)
  }

  onMinus = () => {
    const {istimeRunning, timerLimits} = this.state
    if (istimeRunning === false) {
      if (timerLimits > 1) {
        this.setState(prevState => ({
          timerLimits: prevState.timerLimits - 1,
          limit: prevState.limit - 1,
        }))
      }
    }
  }

  onPlus = () => {
    const {istimeRunning} = this.state
    if (istimeRunning === false) {
      this.setState(prevState => ({
        timerLimits: prevState.timerLimits + 1,
        limit: prevState.limit + 1,
      }))
    }
  }

  render() {
    const {limit, istimeRunning, seconds} = this.state
    let {timerLimits} = this.state
    if (!istimeRunning && seconds === 0) {
      timerLimits = limit
    }
    const result =
      seconds > 9 ? `${timerLimits}:${seconds}` : `${timerLimits}:0${seconds}`
    return (
      <div className="bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="cont">
          <div className="bg-timer">
            <div className="tim-cont">
              <h1 className="timer">{result}</h1>
              {istimeRunning ? (
                <p className="text">Running</p>
              ) : (
                <p className="text">Paused</p>
              )}
            </div>
          </div>
          <div className="sec-cont">
            <div className="cont-play-reset">
              {istimeRunning ? (
                <div className="start-cont">
                  <button
                    className="button"
                    type="button"
                    onClick={this.onPause}
                  >
                    <img
                      className="icon"
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      alt="pause icon"
                    />
                  </button>
                  <p className="button">Pause</p>
                </div>
              ) : (
                <div className="start-cont">
                  <button
                    type="button"
                    className="button"
                    onClick={this.onStart}
                  >
                    <img
                      className="icon"
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                    />
                  </button>
                  <p className="button">Start</p>
                </div>
              )}

              <div className="start-cont">
                <button className="button" type="button" onClick={this.onReset}>
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                </button>
                <p className="button">Reset</p>
              </div>
            </div>
            <div className="limit-para-cont">
              <p className="para">Set Timer limit</p>
              <div className="cont-limit-reset">
                <button type="button" className="button" onClick={this.onMinus}>
                  -
                </button>{' '}
                <p className="timer-limit">{timerLimits}</p>{' '}
                <button type="button" className="button" onClick={this.onPlus}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
