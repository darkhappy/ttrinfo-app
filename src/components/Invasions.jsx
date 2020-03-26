import React, { Component } from "react";
import * as timeago from "timeago.js";
import SingleInvasion from "./single/SingleInvasion";
import DashInvasion from "./dash/DashInvasion";

class Invasions extends Component {
  invasionData() {
    // first we need to get the data
    const { invData } = this.props;
    console.log(invData);
    // if we're still loading, return nothing
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

  showInvasions() {
    const data = this.invasionData();
    console.log(data);

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
