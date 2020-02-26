import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import AnimatedNumber from "react-animated-number";

class Population extends Component {
  getPopulationData(arg) {
    // first we need to get the data
    const { popData } = this.props;
    // if we're still loading, slap a huge loading for everything
    if (popData.totalPopulation === undefined) {
      return 0;
    }

    // send total pop if it's total
    if (arg === "total") {
      return popData.totalPopulation;
    }

    // send the district's data
    return popData.populationByDistrict[arg];
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
        ]
      };
      // now return that
      return data;
    }

    // well something exists, so send that

    // conditional formating, currently disabled
    /* const colour = function(district) {
      const distColour =
        districts[district] >= 500
          ? "#ffab91" // full
          : districts[district] >= 450
          ? "#ffcc80 " // almost full
          : districts[district] >= 400
          ? "#fff59d" // quite a lot
          : districts[district] >= 300
          ? "#e6ee9c" // ideal
          : districts[district] >= 200
          ? "#c5e1a5 " // slightly less ideal
          : districts[district] >= 0
          ? "#424242" // quiet
          : "#7b1fa2 "; // error (doesn't exist)
      return distColour;
    }; */

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
          backgroundColor:
            // conditional formatting, currently idsabled
            /*             colour("Blam Canyon"),
            colour("Boingbury"),
            colour("Bounceboro"),
            colour("Fizzlefield"),
            colour("Gulp Gulch"),
            colour("Hiccup Hills"),
            colour("Kaboom Cliffs"),
            colour("Splashport"),
            colour("Splat Summit"),
            colour("Thwackville"),
            colour("Whoosh Rapids"),
            colour("Zoink Falls") */
            colours
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

  formatValue = value => value.toFixed(0);
  duration = 500;

  render() {
    return (
      <div>
        <h1 className="text-center">Current Population</h1>
        <div className="row">
          <div className="col-8">
            <hr />
            <Pie
              data={this.getPopulationChartData()}
              legend={{
                display: true,
                position: "right"
              }}
            />
            <hr />
            <h4 className="text-center">
              <AnimatedNumber
                value={this.getPopulationData("total")}
                formatValue={this.formatValue}
                duration={this.duration}
              />{" "}
              total toons
            </h4>
          </div>
          <div className="col-4">
            <table className="table table-borderless">
              <thead className="thead-light">
                <tr>
                  <th>District</th>
                  <th>Population</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Blam Canyon</td>
                  <td>
                    <AnimatedNumber
                      value={this.getPopulationData("Blam Canyon")}
                      formatValue={this.formatValue}
                      duration={this.duration}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Boingbury</td>
                  <td>
                    <AnimatedNumber
                      value={this.getPopulationData("Boingbury")}
                      formatValue={this.formatValue}
                      duration={this.duration}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Bounceboro</td>
                  <td>
                    <AnimatedNumber
                      value={this.getPopulationData("Bounceboro")}
                      formatValue={this.formatValue}
                      duration={this.duration}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Fizzlefield</td>
                  <td>
                    <AnimatedNumber
                      value={this.getPopulationData("Fizzlefield")}
                      formatValue={this.formatValue}
                      duration={this.duration}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    Gulp Gulch{" "}
                    <span className="badge badge-success">Speedchat</span>
                  </td>
                  <td>
                    <AnimatedNumber
                      value={this.getPopulationData("Gulp Gulch")}
                      formatValue={this.formatValue}
                      duration={this.duration}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Hiccup Hills</td>
                  <td>
                    <AnimatedNumber
                      value={this.getPopulationData("Hiccup Hills")}
                      formatValue={this.formatValue}
                      duration={this.duration}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Kaboom Cliffs</td>
                  <td>
                    <AnimatedNumber
                      value={this.getPopulationData("Kaboom Cliffs")}
                      formatValue={this.formatValue}
                      duration={this.duration}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Splashport</td>
                  <td>
                    <AnimatedNumber
                      value={this.getPopulationData("Splashport")}
                      formatValue={this.formatValue}
                      duration={this.duration}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Splat Summit</td>
                  <td>
                    <AnimatedNumber
                      value={this.getPopulationData("Splat Summit")}
                      formatValue={this.formatValue}
                      duration={this.duration}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Thwackville</td>
                  <td>
                    <AnimatedNumber
                      value={this.getPopulationData("Thwackville")}
                      formatValue={this.formatValue}
                      duration={this.duration}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    Whoosh Rapids{" "}
                    <span className="badge badge-success">Speedchat</span>
                  </td>
                  <td>
                    <AnimatedNumber
                      value={this.getPopulationData("Whoosh Rapids")}
                      formatValue={this.formatValue}
                      duration={this.duration}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Zoink Falls</td>
                  <td>
                    <AnimatedNumber
                      value={this.getPopulationData("Zoink Falls")}
                      formatValue={this.formatValue}
                      duration={this.duration}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Population;
