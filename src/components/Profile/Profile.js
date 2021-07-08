import React, { useState, useEffect } from "react";

import axios from "axios";

const Profile = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/v1/users/profile");
      setUserName(res.data.data.userName);
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{userName} Welcome to your profile</h2>
    </div>
  );
};

export default Profile;
