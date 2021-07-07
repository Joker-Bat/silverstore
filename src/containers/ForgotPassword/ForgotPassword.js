import React from "react";

// Components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ForgotPasswordContainer from "../../components/ForgotPassword/ForgotPassword";

const ForgotPassword = () => {
  return (
    <section>
      <BreadCrumb title="forgot password" />
      <ForgotPasswordContainer />
    </section>
  );
};

export default ForgotPassword;
