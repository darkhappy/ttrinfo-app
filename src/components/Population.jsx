import React, { Component } from "react";
import SinglePopulation from "./single/SinglePopulation";
import DashPopulation from "./dash/DashPopulation";
import SinglePopulationList from "./single/SinglePopulationList";

class Population extends Component {
  getTotalPopulationData() {
    // first we need to get the data
    const { popData } = this.props;
    // if we're still loading, slap a huge loading for everything
    if (popData.totalPopulation === undefined) {
      return 0;
    }

    return popData.totalPopulation;
  }

  getPopulationChartData() {
    // first we need to get the data
    const { popData } = this.props;
    const districts = popData.populationByDistrict; // this is just for naming sake

    // cool colours!
    const colours = [
      "#e91e63",
      "#ff5722",
      "#ff9800",
      "#ffc107",
      "#ffeb3b",
      "#8bc34a",
      "#4caf50",
      "#009688",
      "#00bcd4",
      "#03a9f4",
      "#3f51b5",
      "#673ab7"
    ];

    if (districts === undefined) {
      // if it's undefined we need to send something else it's gonna die on us
      // create a data with equal stuff in
      const data = {
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: colours
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
      // now return that
      return data;
    }

    // well something exists, so send that
    const data = {
      datasets: [
        {
          data: [
            districts["Blam Canyon"],
            districts["Boingbury"],
            districts["Bounceboro"],
            districts["Fizzlefield"],
            districts["Gulp Gulch"],
            districts["Hiccup Hills"],
            districts["Kaboom Cliffs"],
            districts["Splashport"],
            districts["Splat Summit"],
            districts["Thwackville"],
            districts["Whoosh Rapids"],
            districts["Zoink Falls"]
          ],
          backgroundColor: colours
        }
      ],
      labels: [
        ["Blam Canyon: " + districts["Blam Canyon"]],
        ["Boingbury: " + districts["Boingbury"]],
        ["Bounceboro: " + districts["Bounceboro"]],
        ["Fizzlefield: " + districts["Fizzlefield"]],
        ["Gulp Gulch: " + districts["Gulp Gulch"]],
        ["Hiccup Hills: " + districts["Hiccup Hills"]],
        ["Kaboom Cliffs: " + districts["Kaboom Cliffs"]],
        ["Splashport: " + districts["Splashport"]],
        ["Splat Summit: " + districts["Splat Summit"]],
        ["Thwackville: " + districts["Thwackville"]],
        ["Whoosh Rapids: " + districts["Whoosh Rapids"]],
        ["Zoink Falls: " + districts["Zoink Falls"]]
      ]
    };

    return data;
  }

  populationList() {
    // first we need to get the data
    const { popData } = this.props;
    const distPop = popData.populationByDistrict; // this is just for naming sake

    // if we're still loading, slap a huge loading for everything
    if (popData.totalPopulation === undefined) {
      return [];
    }

    // list of all districts
    const districts = [
      "Blam Canyon",
      "Boingbury",
      "Bounceboro",
      "Fizzlefield",
      "Gulp Gulch",
      "Hiccup Hills",
      "Kaboom Cliffs",
      "Splashport",
      "Splat Summit",
      "Thwackville",
      "Whoosh Rapids",
      "Zoink Falls"
    ];

    // build the array
    var data = [];
    districts.forEach(function(district) {
      const badge =
        distPop[district] >= 500
          ? "badge badge-danger"
          : distPop[district] >= 300
          ? "badge badge-success"
          : "badge badge-info";
      const status =
        distPop[district] >= 500
          ? "Full"
          : distPop[district] >= 300
          ? "Ideal"
          : "Quiet";
      data.push({
        name: district,
        population: distPop[district],
        badge: badge,
        status: status
      });
    });
    // sort by descending
    data.sort(function(a, b) {
      return b.population - a.population;
    });
    // return the array
    return data;
  }

  showPopulation() {
    return this.props.single ? ( // if this is the single page
      <div className="row">
        <div className="col">
          <SinglePopulation
            chartPop={this.getPopulationChartData()}
            totalPop={this.getTotalPopulationData()}
          />
        </div>
        <div className="col-3">
          <SinglePopulationList list={this.populationList()} />
        </div>
      </div>
    ) : (
      // if this is the main page
      <div>
        <DashPopulation
          totalPop={this.getTotalPopulationData()}
          chartPop={this.getPopulationChartData()}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Current Population</h1>
        {this.showPopulation()}
      </div>
    );
  }
}

export default Population;
