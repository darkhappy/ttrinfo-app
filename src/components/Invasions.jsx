import React, { Component } from "react";
import * as timeago from "timeago.js";
import SingleInvasion from "./single/SingleInvasion";
import DashInvasion from "./dash/DashInvasion";

class Invasions extends Component {
  invasionData() {
    // first we need to get the data
    const { invData } = this.props;

    return Object.entries(invData).map(invasion => {
      // variables
      const invDate = timeago.format(new Date(invasion[1].FirstSeen));
      const percent = Math.floor(
        (invasion[1].CurrentProgress / invasion[1].MaxProgress) * 100
      );

      let invColour;
      if (percent >= 90) {
        // 90-100% done
        invColour = "#ff5722";
      } else if (percent >= 90) {
        // 75-90% done
        invColour = "#ff9800";
      } else if (percent >= 50) {
        // 50-75% done
        invColour = "#ffc107";
      } else {
        // 0-50% done
        invColour = "#4caf50";
      }

      const invCog = invasion[1].Type.replace(/[^-.()0-9a-z& ]/gi, "");
      const eta = timeago.format(new Date(invasion[1].EstimatedCompletion));

      return {
        district: invasion[1].District,
        cog: invCog,
        started: invDate,
        eta: eta,
        progress: invasion[1].CurrentProgress,
        max: invasion[1].MaxProgress,
        percent: percent,
        colour: invColour,
        megaInv: invasion[1].MegaInvasion
      };
    });
  }

  showInvasions() {
    const data = this.invasionData();
    console.log(data);

    // if no invasions
    if (data.length === 0) {
      return (
        <div className="alert alert-info">
          <h5>Hold on...</h5>
          <p>
            Either we're loading, or there aren't any cogs invading Toontown
            Rewritten as of {new Date().toLocaleTimeString()}.
          </p>
        </div>
      );
    }

    return this.props.single ? ( // if this is the single page
      <ul className="list-group list-group-flush small">
        {data.map(item => (
          <li key={item.district} className="list-group-item">
            <SingleInvasion item={item} />
          </li>
        ))}
      </ul>
    ) : (
      // if this is the main page
      <ul className="list-group list-group-flush small">
        {data.map(item => (
          <li key={item.district} className="list-group-item">
            <DashInvasion item={item} />
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <>
        <h1>Invasions</h1>
        {this.showInvasions()}
      </>
    );
  }
}

export default Invasions;
