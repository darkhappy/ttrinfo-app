import React, { Component } from "react";
import "bootswatch/dist/darkly/bootstrap.min.css";
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
    sillyData: []
  };

  async componentDidMount() {
    try {
      setInterval(async () => {
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

        // alright slap that shit in states
        this.setState({
          popData: popData,
          invData: invData,
          sillyData: sillyData
        });
      }, 20000);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="row">
          <div className="col-5">
            <Invasions invData={this.state.invData} />
          </div>
          <div className="col-7">
            <Population popData={this.state.popData} />
          </div>
          <div className="w-100" />
          <div className="col-8">
            <SillyMeter sillyData={this.state.sillyData} />
          </div>
          <div className="col-4">
            <ServerStatus />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
