import React, { Fragment } from "react";
import "./App.css";

//components

// import InputData from "./components/GetData";
import Data from "./components/getData";

function App() {
  return (
    <Fragment>
      <div className="container">
        <Data />
      </div>
    </Fragment>
  );
}

export default App;