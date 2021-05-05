import React, { Component } from "react";

// Components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";

export class Login extends Component {
  render() {
    return (
      <section>
        <BreadCrumb title="login" />
        <h1>Login</h1>
      </section>
    );
  }
}

export default Login;
