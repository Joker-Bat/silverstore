import React, { useState, useEffect } from "react";
// Axios
import axios from "axios";
// Redux toolkit
import { useDispatch } from "react-redux";
import { removeToken } from "../../store/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/v1/users/profile");
      setUserName(res.data.data.userName);
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    const res = await axios.get("/api/v1/users/logout");
    console.log(res.data);
    dispatch(removeToken());
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{userName} Welcome to your profile</h2>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
