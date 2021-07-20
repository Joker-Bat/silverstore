import React from "react";
// Components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ProfileContainer from "../../components/Profile/Profile";

const Profile = () => {
  return (
    <section>
      <BreadCrumb title="profile" />
      <ProfileContainer />
    </section>
  );
};

export default Profile;
