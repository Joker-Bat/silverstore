import React, { useState, useEffect } from "react";
// Axios
import axios from "axios";
// Redux toolkit
import { useDispatch } from "react-redux";
import { removeToken } from "../../store/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/v1/users/profile");
      setUser(res.data.data.user);
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await axios.get("/api/v1/users/logout");
    dispatch(removeToken());
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{user.name} Welcome to your profile</h2>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
