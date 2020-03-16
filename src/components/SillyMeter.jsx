import React, { Component } from "react";
import { Line } from "rc-progress";
import AnimatedNumber from "react-animated-number/build/AnimatedNumber";
import * as timeago from "timeago.js";
import ReactTooltip from "react-tooltip";

class SillyMeter extends Component {
  formatValue = value => value.toFixed(0);
  duration = 500;

  showTeams() {
    // first we need to get the data
    const { sillyData } = this.props;
    // if we're still loading, slap a huge loading for everything
    if (sillyData.hp === undefined) {
      return "Loading...";
    }

    // if there's a winner, return the winner instead
    if (sillyData.winner !== null) {
      return <h5>{sillyData.winner}</h5>;
    }

    // if it's inactive, show "upcoming teams"
    if (sillyData.state === "Inactive") {
      return (
        <p className="text-muted">
          Upcoming teams: {sillyData.rewards[0]}
          <br />
          {sillyData.rewards[1]}
          <br />
          {sillyData.rewards[2]}
        </p>
      );
    }

    return (
      <p>
        {sillyData.rewards[0]}
        <br />
        {sillyData.rewards[1]}
        <br />
        {sillyData.rewards[2]}
      </p>
    );
  }

  showDate() {
    // first we need to get the data
    const { sillyData } = this.props;
    // if we're still loading, slap a huge loading for everything
    if (sillyData.hp === undefined) {
      return "Loading...";
    }

    // get the date
    const date = new Date(
      sillyData.nextUpdateTimestamp * 1000
    ).toLocaleString();

    // get our custom status
    if (sillyData.state === "Active") {
      return (
        <span data-for="sillymeterETA" data-tip={"updating at " + date}>
          Updating {timeago.format(date)}
          <ReactTooltip id="sillymeterETA" place="bottom" effect="solid" />
        </span>
      );
    } else if (sillyData.state === "Reward") {
      return (
        <span data-for="sillymeterETA" data-tip={"ending at " + date}>
          Boost ending {timeago.format(date)}
          <ReactTooltip id="sillymeterETA" place="bottom" effect="solid" />
        </span>
      );
    } else {
      return (
        <span data-for="sillymeterETA" data-tip={"starting at " + date}>
          Starting {timeago.format(date)}
          <ReactTooltip id="sillymeterETA" place="bottom" effect="solid" />
        </span>
      );
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
    // if we're still loading or it's inactive, slap a 0 for niceness
    if (sillyData.hp === undefined || sillyData.state === "Inactive") {
      return 0; // the reason we're returning 0 is because the API lists the health as 5 000 000 when it's inactive, don't ask why
    }

    // do the math and return the health
    return Math.floor((sillyData.hp / 5000000) * 1000);
  }

  showBadge() {
    const { sillyData } = this.props;
    // if we're still loading, return null
    if (sillyData.hp === undefined) {
      return null;
    }

    // colouring
    const colour =
      sillyData.state === "Active"
        ? "badge badge-success" // it's rising
        : sillyData.state === "Reward"
        ? "badge badge-info" // it's giving some reward
        : "badge badge-secondary"; // it's cooling down

    return (
      <span
        className={colour}
        data-for="sillymeterETA"
        data-tip={sillyData.hp + " / 5000000"}
      >
        {sillyData.state}{" "}
        <AnimatedNumber
          value={this.getPercentage()}
          formatValue={this.formatValue}
          duration={this.duration}
        />
        %
      </span>
    );
  }

  render() {
    return (
      <div>
        <h1>Silly Meter</h1>
        <h5>
          {this.showBadge()} {this.showDate()}
        </h5>
        <Line percent={this.getPercentage()} strokeColor={this.getColour()} />
        {this.showTeams()}
      </div>
    );
  }
}

export default SillyMeter;
