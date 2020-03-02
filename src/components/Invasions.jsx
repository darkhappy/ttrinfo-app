import React, { Component } from "react";
import { Circle } from "rc-progress";
import AnimatedNumber from "react-animated-number/build/AnimatedNumber";
import * as timeago from "timeago.js";
import ReactTooltip from "react-tooltip";

function Districts(props) {
  const formatValue = value => value.toFixed(0);
  const duration = 800;

  if (props.data === null) {
    return "Loading invasions";
  }
  return (
    <ul className="list-group list-group-flush">
      {props.data.map(item => (
        <li key={item.district} className="list-group-item">
          <div className="row">
            <div className="col-9">
              <b data-tip={"started " + item.started}>{item.cog}</b>
              <br />
              <ReactTooltip place="right" type="dark" effect="solid" />
              <span className="text-muted">
                in {item.district}, ending {item.eta}
              </span>
            </div>
            <div className="col-2">
              <Circle
                percent={item.percent}
                strokeWidth={10}
                strokeColor={item.colour}
              />
            </div>
            <div className="col-1 text-right">
              <AnimatedNumber
                value={item.progress}
                formatValue={formatValue}
                duration={duration}
              />
              /
              <AnimatedNumber
                value={item.max}
                formatValue={formatValue}
                duration={duration}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

class Invasions extends Component {
  InvasionData() {
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
          : "4caf50"; // 0-50% done

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
        colour: invColour
      });
    });

    // now push that to the state
    return data;
  }

  render() {
    const items = this.InvasionData();

    return (
      <>
        <h1>Invasions</h1>
        <Districts data={items} />
      </>
    );
  }
}

export default Invasions;
