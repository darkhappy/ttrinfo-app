import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

import Population from "./components/Population.jsx";
import Invasions from "./components/Invasions.jsx";
import ServerStatus from "./components/ServerStatus.jsx";
import SillyMeter from "./components/SillyMeter.jsx";

class App extends Component {
  state = {
    invData: [],
    popData: [],
    sillyData: [],
    lastUpdate: "Updating...",
    mode: "Light"
  };

  loadData = async () => {
    // define variables
    var popData;
    var sillyData;
    var invData;

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
      url: "https://www.toontownrewritten.com/api/invasions"
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
      <div className="container py-2">
        <div className="row">
          <div className="col-5 text-left">
            <Invasions invData={this.state.invData} />
          </div>
          <div className="col-7 text-right">
            <Population popData={this.state.popData} />
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-8 text-left">
            <SillyMeter sillyData={this.state.sillyData} />
          </div>
          <div className="col-4 text-right">
            <ServerStatus />
          </div>
        </div>

        <div className="fixed-bottom text-center text-muted py-3">
          <Button variant="outline-info" size="sm" onClick={this.loadData}>
            {this.state.lastUpdate} | Version 1.00
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
