import React from "react";

// Components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import SignupContainer from "../../components/Signup/Signup";

const Signup = () => {
  return (
    <section>
      <BreadCrumb title="signup" />
      <SignupContainer />
    </section>
  );
};

export default Signup;
