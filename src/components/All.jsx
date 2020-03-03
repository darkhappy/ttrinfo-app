import React, { Component } from "react";

import Population from "./Population.jsx";
import Invasions from "./Invasions.jsx";
import SillyMeter from "./SillyMeter.jsx";

class All extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-5 text-left">
          <Invasions invData={this.props.invData} />
        </div>
        <div className="col-7 text-right">
          <Population popData={this.props.popData} />
          <hr />
          <SillyMeter sillyData={this.props.sillyData} />
        </div>
      </div>
    );
  }
}

export default All;
