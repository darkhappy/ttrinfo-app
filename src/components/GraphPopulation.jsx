import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import AnimatedNumber from "react-animated-number";

class GraphPopulation extends Component {
  formatValue = value => value.toFixed(0);
  duration = 500;

  styling = this.props.single
    ? 135 // if single page
    : 130; // if dash;

  render() {
    const { totalPop, chartPop } = this.props;
    const { formatValue, duration } = this;
    const text =
      totalPop === 1
        ? "toon" // if there's only one
        : "total toons"; // if there's more than one
    return (
      <>
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
      </>
    );
  }
}

export default GraphPopulation;
