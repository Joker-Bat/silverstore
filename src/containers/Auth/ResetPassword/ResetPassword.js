import React from "react";

// Components
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import ResetPasswordContainer from "../../../components/auth/ResetPassword/ResetPassword";

const ResetPassword = () => {
  return (
    <section>
      <BreadCrumb title="reset password" />
      <ResetPasswordContainer />
    </section>
  );
};

export default ResetPassword;
