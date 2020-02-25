import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

// population option
const legendOpts = {
  display: true,
  position: "left",
  fullWidth: true
};
class Population extends Component {
  getTotalPopulationData() {
    // first we need to get the data
    const { popData } = this.props;
    // if we're still loading, slap a huge loading for everything
    if (popData.totalPopulation === undefined) {
      return "Loading...";
    }
    // send the total toons
    return popData.totalPopulation + " total toons";
  }

  getPopulationData() {
    // first we need to get the data
    const { popData } = this.props;
    const district = popData.populationByDistrict; // this is just for naming sake

    if (district === undefined) {
      // if it's undefined we need to send something else it's gonna die on us
      // create a data with 0 in
      const data = {
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      };
      // now return that
      return data;
    }

    // well something exists, so send that
    const data = {
      datasets: [
        {
          data: [
            district["Blam Canyon"],
            district["Boingbury"],
            district["Bounceboro"],
            district["Fizzlefield"],
            district["Gulp Gulch"],
            district["Hiccup Hills"],
            district["Kaboom Cliffs"],
            district["Splashport"],
            district["Splat Summit"],
            district["Thwackville"],
            district["Whoosh Rapids"],
            district["Zoink Falls"]
          ],
          backgroundColor: [
            "#01295f",
            "#437f97",
            "#849324",
            "#ffb30f",
            "#fd151b",
            "#256eff",
            "#46237a",
            "#3ddc97",
            "#fcfcfc",
            "#ff495c",
            "#01295f",
            "#437f97"
          ]
        }
      ],
      labels: [
        ["Blam Canyon"],
        ["Boingbury"],
        ["Bounceboro"],
        ["Fizzlefield"],
        ["Gulp Gulch"],
        ["Hiccup Hills"],
        ["Kaboom Cliffs"],
        ["Splashport"],
        ["Splat Summit"],
        ["Thwackville"],
        ["Whoosh Rapids"],
        ["Zoink Falls"]
      ]
    };

    return data;
  }

  render() {
    return (
      <div>
        <h1>Current Population</h1>
        <h4>{this.getTotalPopulationData()}</h4>
        <Pie data={this.getPopulationData()} legend={legendOpts} />
      </div>
    );
  }
}

export default Population;
