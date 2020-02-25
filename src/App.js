import React from "react";
import "bootswatch/dist/darkly/bootstrap.min.css";

import Population from "./components/Population.jsx";
import Header from "./components/Header.jsx";
import Invasions from "./components/Invasions.jsx";
import ServerStatus from "./components/ServerStatus.jsx";
import SillyMeter from "./components/SillyMeter.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <div class="row">
        <div class="col-5">
          <Invasions />
        </div>
        <div class="col-7">
          <Population />
        </div>
        <div className="w-100" />
        <div class="col-8">
          <SillyMeter />
        </div>
        <div class="col-4">
          <ServerStatus />
        </div>
      </div>
    </div>
  );
}

export default App;
