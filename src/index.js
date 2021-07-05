import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

// Redux toolkit
import { Provider } from "react-redux";
// store
import store from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
