import React from "react";

// Components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ResetPasswordContainer from "../../components/ResetPassword/ResetPassword";

const ResetPassword = () => {
  return (
    <section>
      <BreadCrumb title="reset password" />
      <ResetPasswordContainer />
    </section>
  );
};

export default ResetPassword;
