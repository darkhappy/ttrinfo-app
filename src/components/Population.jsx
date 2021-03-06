import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import AnimatedNumber from "react-animated-number";

class Population extends Component {
  getTotalPopulationData(arg) {
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

  formatValue = value => value.toFixed(0);
  duration = 500;

  styling() {
    switch (this.props.single) {
      case true:
        return 135;
      default:
        return 130;
    }
  }

  render() {
    return (
      <div>
        <h1>Current Population</h1>
        <h4>
          <AnimatedNumber
            value={this.getTotalPopulationData()}
            formatValue={this.formatValue}
            duration={this.duration}
          />{" "}
          total toons
        </h4>
        <Doughnut
          data={this.getPopulationChartData()}
          legend={{
            position: "right",
            align: "center",
            rtl: true,
            labels: {
              boxWidth: 20
            }
          }}
          height={this.styling()}
          options={{
            tooltips: {
              mode: "nearest",
              callbacks: {
                label: function(tooltipItem, data) {
                  return " " + data.labels[tooltipItem.index];
                }
              }
            }
          }}
        />
      </div>
    );
  }
}

export default Population;
