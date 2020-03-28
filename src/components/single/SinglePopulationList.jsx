import React, { Component } from "react";
import AnimatedNumber from "react-animated-number";

class SinglePopulationList extends Component {
  formatValue = value => value.toFixed(0);
  duration = 500;

  populationList() {
    const { list } = this.props;
    const { formatValue, duration } = this;

    return (
      <ul className="list-group list-group-flush text-right text-muted small">
        {list.map(item => (
          <li key={item.name} className="list-group-item">
            <strong>{item.name}:</strong>{" "}
            <AnimatedNumber
              value={item.population}
              formatValue={formatValue}
              duration={duration}
            />{" "}
            <span className={item.badge}>{item.status}</span>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return <div>{this.populationList()}</div>;
  }
}

export default SinglePopulationList;
