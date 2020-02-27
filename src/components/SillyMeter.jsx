import React, { Component } from "react";
import { Line } from "rc-progress";

class SillyMeter extends Component {
  getTeams() {
    // first we need to get the data
    const { sillyData } = this.props;
    // if we're still loading, slap a huge loading for everything
    if (sillyData.hp === undefined) {
      return "Loading...";
    }

    // if there's a winner, return the winner instead
    if (sillyData.winner !== null) {
      return "Reward: " + sillyData.winner;
    }

    return (
      sillyData.rewards[0] +
      "\n" +
      sillyData.rewards[1] +
      "\n" +
      sillyData.rewards[2]
    );
  }

  getDate() {
    // first we need to get the data
    const { sillyData } = this.props;
    // if we're still loading, slap a huge loading for everything
    if (sillyData.hp === undefined) {
      return "Loading...";
    }

    // get the date
    const date = new Date(sillyData.nextUpdateTimestamp * 1000);

    // get our custom status
    if (sillyData.state === "Active") {
      return "Updating at " + date.toLocaleTimeString();
    } else if (sillyData.state === "Reward") {
      return "Boosting until " + date.toLocaleTimeString();
    } else {
      return "Cooling down until " + date.toLocaleTimeString();
    }
  }

  getStatus(arg) {
    // first we need to get the data
    const { sillyData } = this.props;

    // check what we're working with
    if (arg === "text") {
      // if we're still loading, slap a huge loading for everything
      if (sillyData.hp === undefined) {
        return "Loading...";
      }
      return sillyData.state;
    }

    if (sillyData.state === "Active") {
      return "badge badge-success";
    } else if (sillyData.state === "Reward") {
      return "badge badge-info";
    } else {
      // this is either if it's inactive or if we're loading
      return "badge badge-secondary";
    }
  }

  getColour() {
    // first we need to get the data
    const { sillyData } = this.props;

    if (sillyData.state === "Active") {
      return "#38b44a";
    } else if (sillyData.state === "Reward") {
      return "#17a2b8";
    } else {
      // this is either if it's inactive or if we're loading
      return "#aea79f";
    }
  }

  getPercentage() {
    // first we need to get the data
    const { sillyData } = this.props;
    // if we're still loading, slap a 0 for niceness
    if (sillyData.hp === undefined) {
      return 0;
    }

    // get the health
    const hp = sillyData.hp;

    // do the math and return the health
    return Math.floor(hp / 50000);
  }

  render() {
    return (
      <div>
        <h1>Silly Meter</h1>
        <h5>
          <span className={this.getStatus("status")}>
            {this.getStatus("text")} {this.getPercentage()}%
          </span>{" "}
          {this.getDate()}
        </h5>
        <Line percent={this.getPercentage()} strokeColor={this.getColour()} />
        <br />
        {this.getTeams()}
      </div>
    );
  }
}

export default SillyMeter;
