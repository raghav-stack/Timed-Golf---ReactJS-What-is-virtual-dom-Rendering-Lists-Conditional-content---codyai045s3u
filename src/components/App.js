import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0, ticking: false, renderBall: false, x: 0, y: 0 };
    this.timerID = undefined;

    this.tick = this.tick.bind(this);
    this.startGame = this.startGame.bind(this);
    this.setTicking = this.setTicking.bind(this);
  }

  setTicking() {
    if (this.state.x === 250 && this.state.y === 250) {
      this.setState({
        ticking: false
      });
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        if (this.state.ticking)
          this.setState(
            (state, props) => ({
              ballPosition: { left: state.x + 5 + "px", top: state.y + "px" },
              x: state.x + 5
            }),
            () => {
              this.setTicking();
            }
          );
      } else if (e.key === "ArrowUp") {
        if (this.state.ticking)
          this.setState(
            (state, props) => ({
              ballPosition: { left: state.x + "px", top: state.y - 5 + "px" },
              y: state.y - 5
            }),
            () => {
              this.setTicking();
            }
          );
      } else if (e.key === "ArrowLeft") {
        if (this.state.ticking)
          this.setState(
            (state, props) => ({
              ballPosition: { left: state.x - 5 + "px", top: state.y + "px" },
              x: state.x - 5
            }),
            () => {
              this.setTicking();
            }
          );
      } else if (e.key === "ArrowDown") {
        if (this.state.ticking)
          this.setState(
            (state, props) => ({
              ballPosition: { left: state.x + "px", top: state.y + 5 + "px" },
              y: state.y + 5
            }),
            () => {
              this.setTicking();
            }
          );
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if (this.state.ticking)
      this.setState((state) => ({
        time: state.time + 1
      }));
    else if (this.timerID !== undefined) {
      clearInterval(this.timerID);
    }
  }

  startGame() {
    document.getElementsByClassName("ballProvider")[0].style.display = "none";
    this.setState({ ticking: true });
    this.timerID = setInterval(() => this.tick(), 1000);
    this.setState({ renderBall: true });
  }

  render() {
    return (
      <div>
        <button className="start ballProvider" onClick={this.startGame}>
          <h2>Start</h2>
        </button>
        <div className="playground">
          <div
            className="ball"
            key="ball"
            style={this.state.ballPosition}
          ></div>
          <div key="hole" className="hole">
            <h2>Destiny</h2>
          </div>
          <h1 className="heading-timer">{this.state.time}</h1>
        </div>
      </div>
    );
  }
}

export default Timer;
