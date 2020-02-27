import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="text-center py-2 bg-dark text-white">
        <h1>Toontown Rewritten Statistics</h1>
        <p>Last updated: {this.props.lastUpdate}</p>
      </div>
    );
  }
}

export default Header;
