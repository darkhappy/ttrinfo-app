import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class SingleSillyMeterChart extends Component {
  getSillyChartData() {
    // first we need to get the data
    const { sillyData } = this.props;
    const points = sillyData.rewardPoints; // this is just for naming sake

    // cool colours!
    const colours = ["#e91e63", "#8bc34a", "#00bcd4"];

    if (points === undefined) {
      return {
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: colours
          }
        ],
        labels: []
      };
    }

    // well something exists, so send that
    return {
      datasets: [
        {
          data: [points[0], points[1], points[2]],
          backgroundColor: colours
        }
      ],
      labels: [sillyData.rewards[0], sillyData.rewards[1], sillyData.rewards[2]]
    };
  }

  render() {
    return (
      <Pie
        data={this.getSillyChartData()}
        legend={{
          position: "bottom",
          align: "center"
        }}
        height={70}
      />
    );
  }
}

export default SingleSillyMeterChart;
