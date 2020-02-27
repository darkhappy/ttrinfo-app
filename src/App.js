import React, { Component } from "react";
import "bootswatch/dist/united/bootstrap.min.css";
import axios from "axios";

import Population from "./components/Population.jsx";
import Header from "./components/Header.jsx";
import Invasions from "./components/Invasions.jsx";
import ServerStatus from "./components/ServerStatus.jsx";
import SillyMeter from "./components/SillyMeter.jsx";

class App extends Component {
  state = {
    invData: [],
    popData: [],
    sillyData: [],
    lastUpdate: "Never"
  };

  async loadData() {
    // define variables
    var popData;
    var sillyData;
    var invData;

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
      lastUpdate: time.toLocaleTimeString()
    });
  }

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
      <div>
        <Header lastUpdate={this.state.lastUpdate} />
        <div className="px-5 py-3">
          <div className="row">
            <div className="col-4 text-left">
              <Invasions invData={this.state.invData} />
            </div>
            <div className="col-8 text-right">
              <Population popData={this.state.popData} />
            </div>
            <div className="w-100 py-3" />
            <div className="col-4 text-left">
              <ServerStatus />
            </div>
            <div className="col-8 text-right">
              <SillyMeter sillyData={this.state.sillyData} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
