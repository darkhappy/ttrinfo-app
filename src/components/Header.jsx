import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Header extends Component {
  render() {
    return (
      <div className="text-center py-2 bg-dark text-white">
        <h1>Toontown Rewritten Statistics</h1>
        Last updated: {this.props.lastUpdate}
        {"   "}
        <Button variant="outline-info" size="sm" onClick={this.props.refresh}>
          Update Now
        </Button>
      </div>
    );
  }
}

export default Header;
