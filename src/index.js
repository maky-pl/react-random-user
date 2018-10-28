import React from "react";
import ReactDom from "react-dom";
import App from "./js/App";

require("es6-promise").polyfill();
require("isomorphic-fetch");

ReactDom.render(<App />, document.getElementById("root"));
