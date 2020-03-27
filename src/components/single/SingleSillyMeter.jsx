import React, { Component } from "react";

class SingleSillyMeter extends Component {
  showTeams() {
    return "Teams";
  }

  render() {
    return <div>{this.showTeams()}</div>;
  }
}

export default SingleSillyMeter;
