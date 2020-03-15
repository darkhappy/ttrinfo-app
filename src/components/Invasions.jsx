import React, { Component } from "react";
import { Circle, Line } from "rc-progress";
import AnimatedNumber from "react-animated-number/build/AnimatedNumber";
import * as timeago from "timeago.js";
import ReactTooltip from "react-tooltip";

class Invasions extends Component {
  styling(item) {
    switch (this.props.single) {
      case true: // if we're on the single page
        switch (item.megaInv) {
          case true: // if there's a mega invasion
            return (
              <div className="row">
                <div className="col">
                  <b>
                    <span className="badge badge-danger">Mega Invasion</span>{" "}
                    {item.cog}
                  </b>
                  <br />
                  <span className="text-muted">
                    invaded <b>{item.district}</b> {item.started}, possibly
                    changing {item.eta}
                  </span>
                </div>
                <div className="col text-right">
                  <Line percent={100} strokeWidth={1} strokeColor={"#ff5722"} />
                </div>
              </div>
            );
          default:
            // if it's a normal invasion
            return (
              <div className="row">
                <div className="col">
                  <b>{item.cog}</b>
                  <br />
                  <span className="text-muted">
                    invaded <b>{item.district}</b> {item.started}, leaving{" "}
                    {item.eta}
                  </span>
                </div>
                <div className="col text-right">
                  <Line
                    percent={item.percent}
                    strokeWidth={1}
                    strokeColor={item.colour}
                  />
                  <span className="badge badge-dark">
                    Progress:{" "}
                    <AnimatedNumber
                      value={item.percent}
                      formatValue={this.formatValue}
                      duration={this.duration}
                    />
                    %
                  </span>{" "}
                  <AnimatedNumber
                    value={item.progress}
                    formatValue={this.formatValue}
                    duration={this.duration}
                  />
                  /{item.max}
                </div>
              </div>
            );
        }
      default:
        // if we're on the main dash
        switch (item.megaInv) {
          case true: // if there's a mega invasion
            return (
              <div className="row">
                <div className="col">
                  <b>
                    <span className="badge badge-danger">Mega Invasion</span>{" "}
                    {item.cog}
                  </b>
                  <br />
                  <span
                    className="text-muted"
                    data-tip={
                      "Possibly changing means that the cogs may change " +
                      item.eta +
                      ", this only applies for mega invasions with multiple cog types."
                    }
                  >
                    in <b>{item.district}</b>, possibly changing {item.eta}
                  </span>
                </div>
              </div>
            );
          default:
            // if it's a normal invasion
            return (
              <div className="row">
                <div className="col">
                  <b data-tip={"started " + item.started}>{item.cog}</b>
                  <br />
                  <ReactTooltip place="right" effect="solid" />
                  <span className="text-muted">
                    in <b>{item.district}</b>, ending {item.eta}
                  </span>
                </div>
                <div className="col-2">
                  <Circle
                    percent={item.percent}
                    strokeWidth={8}
                    strokeColor={item.colour}
                    data-tip={
                      item.progress +
                      "/" +
                      item.max +
                      " ( " +
                      item.percent +
                      "% )"
                    }
                  />
                </div>
              </div>
            );
        }
    }
  }

  invasionData() {
    // first we need to get the data
    const { invData } = this.props;
    // if we're still loading, slap a loading
    if (invData === []) {
      return [];
    }

    console.log(invData);

    // build the array
    var data = [];
    Object.entries(invData).forEach(function(invasion) {
      console.log(invasion);
      // variables
      const invDate = timeago.format(new Date(invasion[1].FirstSeen));
      const percent = Math.floor(
        (invasion[1].CurrentProgress / invasion[1].MaxProgress) * 100
      );
      const invColour =
        percent >= 90
          ? "#ff5722" // 90-100% done
          : percent >= 75
          ? "#ff9800" // 75-90% done
          : percent >= 50
          ? "#ffc107" // 50-75% done
          : "#4caf50"; // 0-50% done

      const invCog = invasion[1].Type.replace(/[^-.()0-9a-z& ]/gi, "");
      const eta = timeago.format(new Date(invasion[1].EstimatedCompletion));

      data.push({
        district: invasion[1].District,
        cog: invCog,
        started: invDate,
        eta: eta,
        progress: invasion[1].CurrentProgress,
        max: invasion[1].MaxProgress,
        percent: percent,
        colour: invColour,
        megaInv: invasion[1].MegaInvasion
      });
    });

    // now push that to the state
    return data;
  }

  formatValue = value => value.toFixed(0);
  duration = 500;

  render() {
    const data = this.invasionData();

    return (
      <>
        <h1>Invasions</h1>
        <ul className="list-group list-group-flush">
          {data.map(item => (
            <li key={item.district} className="list-group-item">
              {this.styling(item)}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Invasions;
