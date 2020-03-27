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
        return <h5>{sillyData.winner}</h5>;

      default:
        // in case we can't load it
        return <p>Loading....</p>;
    }
  }

  render() {
    return <div>{this.showTeams()}</div>;
  }
}

export default DashSillyMeter;
