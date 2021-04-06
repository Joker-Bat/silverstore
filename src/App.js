import React, {Component} from "react";
import './App.module.scss';

// Components
import Layout from "./hoc/Layout";

class App extends Component {
  

  render() {
    return (
      <Layout>
        <h1>Hello World</h1>
      </Layout>
    )
  }
}

export default App;
