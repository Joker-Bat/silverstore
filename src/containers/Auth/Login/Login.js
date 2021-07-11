import React from "react";

// Components
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import LoginContainer from "../../../components/auth/Login/Login";

const Login = () => {
  return (
    <section>
      <BreadCrumb title="login" />
      <LoginContainer />
    </section>
  );
};

export default Login;