import React, { Component } from "react";
import SingleSillyMeterChart from "./SingleSillyMeterChart";

class SingleSillyMeter extends Component {
  showTeams() {
    // first we need to get the data
    const { sillyData } = this.props;

    // if we're loading, don't send anything
    if (sillyData.hp === undefined) {
      return <p className="text-center">Loading teams...</p>;
    }

    return (
      <div className="row text-center">
        <div className={this.isWinner(0)}>
          <h4 className="">{sillyData.rewards[0]}</h4>
          <p>{sillyData.rewardDescriptions[0]}</p>
          {this.showBadge(0)}
        </div>
        <div className={this.isWinner(1)}>
          <h4 className="">{sillyData.rewards[1]}</h4>
          <p>{sillyData.rewardDescriptions[1]}</p>
          {this.showBadge(1)}
        </div>
        <div className={this.isWinner(2)}>
          <h4 className="">{sillyData.rewards[2]}</h4>
          <p>{sillyData.rewardDescriptions[2]}</p>
          {this.showBadge(2)}
        </div>
      </div>
    );
  }

  isWinner(team) {
    // first we need to get the data
    const { sillyData } = this.props;

    // if we're loading or there's no winner, send the default value
    if (sillyData.winner === undefined || sillyData.winner === null) {
      return "col";
    }

    // if this team is the winner, make the text normal
    if (sillyData.winner === sillyData.rewards[team]) {
      return "col";
    }

    return "col text-muted small";
  }

  showPercentage(team) {
    // first we need to get the data
    const { sillyData } = this.props;

    // if we're loading or there's no winner, don't send anything
    if (sillyData.winner === undefined || sillyData.winner === null) {
      return null;
    }

    // convert it to a percentage and return
    const total =
      sillyData.rewardPoints[0] +
      sillyData.rewardPoints[1] +
      sillyData.rewardPoints[2];
    return Math.round((sillyData.rewardPoints[team] / total) * 100);
  }

  showBadge(team) {
    // first we need to get the data
    const { sillyData } = this.props;

    // if we're loading or there's no winner, don't send anything
    if (sillyData.winner === undefined || sillyData.winner === null) {
      return null;
    }

    // find the team's reward points
    // im using percentages because apparently thats the only way for the array to be normal
    const rawPoints = this.showPercentage(team);
    console.log(team + "'s raw points is " + rawPoints);

    // return it's position
    const sortedArray = [
      this.showPercentage(0),
      this.showPercentage(1),
      this.showPercentage(2),
    ]
      .sort()
      .reverse();
    console.log(sortedArray);

    switch (sortedArray.findIndex((item) => item === rawPoints)) {
      case 0: // 1st place
        return (
          <button className="btn btn-success">
            {this.showPercentage(team)}% of votes
          </button>
        );

      case 1: // 2nd place
        return (
          <button className="btn btn-warning">
            {this.showPercentage(team)}% of votes
          </button>
        );

      default:
        // loser lol
        return (
          <button className="btn btn-danger">
            {this.showPercentage(team)}% of votes
          </button>
        );
    }
  }

  render() {
    return (
      <div>
        <br />
        {this.showTeams()}
        <br />
        <SingleSillyMeterChart sillyData={this.props.sillyData} />
      </div>
    );
  }
}

export default SingleSillyMeter;
