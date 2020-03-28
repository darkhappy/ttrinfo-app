import React, { Component } from "react";

class DashSillyMeter extends Component {
  showTeams() {
    // first we need to get the data
    const { sillyData } = this.props;

    switch (sillyData.state) {
      case "Inactive": // if it's inactive
        return (
          <p className="text-muted">
            Upcoming teams: {sillyData.rewards[0]}
            <br />
            {sillyData.rewards[1]}
            <br />
            {sillyData.rewards[2]}
          </p>
        );

      case "Active": // if it's going on
        return (
          <p>
            {sillyData.rewards[0]}
            <br />
            {sillyData.rewards[1]}
            <br />
            {sillyData.rewards[2]}
          </p>
        );

      case "Reward": // if there's a winner
        return (
          <h5>
            {sillyData.winner} {this.showPercentage()}
          </h5>
        );

      default:
        // in case we can't load it
        return <p>Loading....</p>;
    }
  }

  showDescription() {
    // first we need to get the data
    const { sillyData } = this.props;

    // if there's no winner or we're loading, don't send anything
    if (sillyData.winner === undefined) {
      return null;
    }

    // find the winner's description
    let winnerKey = sillyData.rewards.findIndex(
      item => item === sillyData.winner
    );

    return (
      <p className="text-muted">{sillyData.rewardDescriptions[winnerKey]}</p>
    );
  }

  showPercentage() {
    // first we need to get the data
    const { sillyData } = this.props;

    // if there's no winner or we're loading, don't send anything
    if (sillyData.winner === undefined) {
      return null;
    }

    // find the winner's percentage
    let winnerKey = sillyData.rewards.findIndex(
      item => item === sillyData.winner
    );

    // convert it to a percentage
    const percent = Math.floor(
      (sillyData.rewardPoints[winnerKey] / 5000000) * 100
    );

    // format it and return
    return <span>with {percent}% votes</span>;
  }

  render() {
    return (
      <div>
        {this.showTeams()}
        {this.showDescription()}
      </div>
    );
  }
}

export default DashSillyMeter;
