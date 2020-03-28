import React, { Component } from "react";
import { Line } from "rc-progress";
import AnimatedNumber from "react-animated-number/build/AnimatedNumber";
import * as timeago from "timeago.js";
import ReactTooltip from "react-tooltip";
import SingleSillyMeter from "./single/SingleSillyMeter";
import DashSillyMeter from "./dash/DashSillyMeter";

class SillyMeter extends Component {
  formatValue = value => value.toFixed(0);
  duration = 500;

  showDate() {
    // first we need to get the data
    const { sillyData } = this.props;

    // get the date
    const date = new Date(
      sillyData.nextUpdateTimestamp * 1000
    ).toLocaleString();

    switch (sillyData.state) {
      case "Inactive": // if it's inactive
        return (
          <span data-for="sillymeterETA" data-tip={"starting at " + date}>
            Starting {timeago.format(date)}
            <ReactTooltip id="sillymeterETA" place="bottom" effect="solid" />
          </span>
        );

      case "Active": // if it's going on
        return (
          <span data-for="sillymeterETA" data-tip={"updating at " + date}>
            Updating {timeago.format(date)}
            <ReactTooltip id="sillymeterETA" place="bottom" effect="solid" />
          </span>
        );

      case "Reward": // if there's a winner
        return (
          <span data-for="sillymeterETA" data-tip={"ending at " + date}>
            Boost ending {timeago.format(date)}
            <ReactTooltip id="sillymeterETA" place="bottom" effect="solid" />
          </span>
        );

      default:
        // in case we can't load it
        return <p>Loading....</p>;
    }
  }

  getColour() {
    // first we need to get the data
    const { sillyData } = this.props;

    switch (sillyData.state) {
      case "Active": // if we're going up
        return "#38b44a";

      case "Reward": // if there's a winner
        return "#17a2b8";

      default:
        // loading or inactive
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
    return Math.floor((sillyData.hp / 5000000) * 100);
  }

  showBadge() {
    // get data
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
        : "badge badge-secondary"; // it's cooling down, or unknown

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

  showSillyMeter() {
    return this.props.single ? ( // if this is the single page
      <SingleSillyMeter sillyData={this.props.sillyData} />
    ) : (
      <DashSillyMeter sillyData={this.props.sillyData} />
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
        {this.showSillyMeter()}
      </div>
    );
  }
}

export default SillyMeter;
