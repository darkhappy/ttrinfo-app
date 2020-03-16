import React, { Component } from "react";
import { Circle } from "rc-progress";
import ReactTooltip from "react-tooltip";

class DashInvasion extends Component {
  render() {
    const item = this.props.item;
    switch (item.megaInv) {
      case true: // if there's a mega invasion
        return (
          <div className="row">
            <div className="col">
              <b>
                <span className="badge badge-danger">Mega Invasion</span>{" "}
                {item.cog}
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
                in <b>{item.district}</b>, possibly changing {item.eta}
              </span>
              <ReactTooltip place="right" effect="solid" />
            </div>
          </div>
        );
      default:
        // if it's a normal invasion
        return (
          <div className="row">
            <div className="col">
              <b data-tip={"started " + item.started}>{item.cog}</b>
              <br />
              <ReactTooltip place="right" effect="solid" />
              <span className="text-muted">
                in <b>{item.district}</b>, ending {item.eta}
              </span>
            </div>
            <div className="col-2">
              <Circle
                percent={item.percent}
                strokeWidth={8}
                strokeColor={item.colour}
                data-tip={
                  item.progress + "/" + item.max + " ( " + item.percent + "% )"
                }
              />
              <ReactTooltip place="right" effect="solid" />
            </div>
          </div>
        );
    }
  }
}
export default DashInvasion;
