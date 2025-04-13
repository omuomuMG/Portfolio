import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Glob from "./features/Top/Top";
import TopPage from "./features/Top/TopPage";
import Content from "./features/Content/Content";

function App() {
  return (
    <div className="App">
      <div>
        <TopPage />
        <Content />
      </div>
    </div>
  );
}

export default App;
