import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import Population from "./components/Population.jsx";
import Invasions from "./components/Invasions.jsx";
import SillyMeter from "./components/SillyMeter.jsx";
import All from "./components/All.jsx";
import Navbar from "./components/Navbar.jsx";

class App extends Component {
  state = {
    invData: [],
    popData: [],
    sillyData: [],
    lastUpdate: "Updating...",
    mode: "Light",
    version: "v0.3-dev"
  };

  loadData = async () => {
    // define variables
    let popData;
    let sillyData;
    let invData;

    // tell the boys that we are updating
    this.setState({
      lastUpdate: "Updating..."
    });

    // start with population
    await axios({
      method: "get",
      url: "https://www.toontownrewritten.com/api/population"
    }).then(resp => {
      popData = resp.data;
    });

    // head out to the sillymeter now
    await axios({
      method: "get",
      url: "https://www.toontownrewritten.com/api/sillymeter"
    }).then(resp => {
      sillyData = resp.data;
    });
    // quick stop at the invasions
    await axios({
      method: "get",
      url: "https://api.toon.plus/invasions/"
    }).then(resp => {
      invData = resp.data;
    });

    const time = new Date();

    // alright slap that shit in states
    this.setState({
      popData: popData,
      invData: invData,
      sillyData: sillyData,
      // also update the current time
      lastUpdate: "Last updated: " + time.toLocaleTimeString()
    });
  };

  async componentDidMount() {
    // load data for the first time
    this.loadData();
    // now load the rest
    try {
      setInterval(async () => {
        this.loadData();
      }, 30000);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="app">
        <div className="container py-2">
          <Switch>
            <Route
              path="/inv"
              render={() => (
                <Invasions invData={this.state.invData} single={true} />
              )}
            />
            <Route
              path="/pop"
              render={() => (
                <Population popData={this.state.popData} single={true} />
              )}
            />
            <Route
              path="/silly"
              render={() => (
                <SillyMeter sillyData={this.state.sillyData} single={true} />
              )}
            />
            <Route
              path="/"
              render={() => (
                <All
                  invData={this.state.invData}
                  popData={this.state.popData}
                  sillyData={this.state.sillyData}
                />
              )}
            />
          </Switch>
        </div>
        <Navbar
          refresh={this.loadData}
          lastUpdate={this.state.lastUpdate}
          version={this.state.version}
        />
      </div>
    );
  }
}

export default App;
