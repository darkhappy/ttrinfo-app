import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="text-center py-3">
        <h1>Toontown Rewritten Statistics</h1>
        <h4 className="text-muted">Last updated: sometime ago lol</h4>
      </div>
    );
  }
}

export default Header;
