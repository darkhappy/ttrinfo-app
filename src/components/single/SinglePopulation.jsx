import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import AnimatedNumber from "react-animated-number";

class SinglePopulation extends Component {
  formatValue = value => value.toFixed(0);
  duration = 500;

  render() {
    const { chartPop, totalPop } = this.props;
    const { formatValue, duration } = this;
    const text =
      totalPop === 1
        ? "toon" // if there's only one
        : "total toons"; // if there's more than one

    return (
      <div>
        <h4>
          <AnimatedNumber
            value={totalPop}
            formatValue={formatValue}
            duration={duration}
          />{" "}
          {text}
        </h4>
        <Doughnut
          data={chartPop}
          legend={{
            display: false
          }}
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

export default SinglePopulation;
