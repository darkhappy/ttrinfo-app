import React, { Component } from "react";
import { Line } from "rc-progress";
import AnimatedNumber from "react-animated-number/build/AnimatedNumber";
import ReactTooltip from "react-tooltip";

class SingleInvasion extends Component {
  formatValue = value => value.toFixed(0);
  duration = 500;

  render() {
    const item = this.props.item;
    return item.megaInv ? ( // if there's a mega invasion
      <div className="row">
        <div className="col">
          <b>
            <span className="badge badge-danger">Mega Invasion</span> {item.cog}
          </b>
          <br />
          <span
            className="text-muted"
            data-tip={
              "Possibly changing means that the cogs may change " +
              item.eta +
              ", this only applies for mega invasions with multiple cog types."
            }
          >
            invaded <b>{item.district}</b> {item.started}, possibly changing{" "}
            {item.eta}
          </span>
          <ReactTooltip place="right" effect="solid" />
        </div>
      </div>
    ) : (
      // if it's a normal invasion
      <div className="row">
        <div className="col">
          <b>{item.cog}</b>
          <br />
          <span className="text-muted">
            invaded <b>{item.district}</b> {item.started}, leaving {item.eta}
          </span>
          <ReactTooltip place="right" effect="solid" />
        </div>
        <div className="col text-right">
          <Line
            percent={item.percent}
            strokeWidth={1}
            strokeColor={item.colour}
          />
          <span className="badge badge-dark">
            Progress:{" "}
            <AnimatedNumber
              value={item.percent}
              formatValue={this.formatValue}
              duration={this.duration}
            />
            %
          </span>{" "}
          <AnimatedNumber
            value={item.progress}
            formatValue={this.formatValue}
            duration={this.duration}
          />
          /{item.max}
        </div>
      </div>
    );
  }
}

export default SingleInvasion;
