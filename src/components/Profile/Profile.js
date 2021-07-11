import React, { useState, useEffect } from "react";
// Styles
import classes from "./Profile.module.scss";
// Axios
import axios from "axios";
// Redux toolkit
import { useDispatch } from "react-redux";
import { removeToken } from "../../store/auth/authSlice";
// Temp
import image from "../../images/emoji/eyeClick.webp";
// Components
import SimpleButton from "../UI/SimpleButton/SimpleButton";
import Title from "../UI/Title/Title";

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
    <div className={classes.Profile}>
      <Title name="profile" />
      <div className={classes.ProfileContainer}>
        <div className={classes.UpdateProfileContainer}>
          <div className={classes.ProfilePictureContainer}>
            <img src={image} alt="emoji" />
          </div>
          <form>
            <input disabled type="file" id="profilePic" accept="image/*" />
            <label htmlFor="profilePic">
              Select new picture hehr hehrhehe
              <span
                style={{ width: "40%" }}
                className={classes.Progress}
              ></span>
            </label>
            <SimpleButton name="upload" small capitalize />
          </form>
        </div>
        <div className={classes.UpdateDetailContainer}>
          <div className={classes.UpdateUserContainer}>
            <h2>update profile</h2>
            <form>
              <input type="text" value="username" />
              <input type="email" value="test@test.com" />
              <SimpleButton name="update" small capitalize />
            </form>
          </div>
          <div className={classes.UpdatePasswordContainer}>
            <h2>update password</h2>
            <form>
              <div className={classes.InputGroup}>
                <label htmlFor="oldPassword">old password</label>
                <input type="password" value="password" id="oldPassword" />
              </div>
              <div className={classes.InputGroup}>
                <label htmlFor="newPassword">new password</label>
                <input type="password" value="password" id="newPassword" />
              </div>
              <div className={classes.InputGroup}>
                <label htmlFor="newPasswordConfirm">new password confirm</label>
                <input
                  type="password"
                  value="password"
                  id="newPasswordConfirm"
                />
              </div>
              <div className={classes.ShowPassword}>
                <input
                  type="checkbox"
                  name="showPassword"
                  id="showPassword"
                  className={classes.Checkbox}
                />

                <label htmlFor="showPassword" className={classes.Label}>
                  <span className={classes.Checkmark}></span>
                  Show password
                </label>
              </div>
              <SimpleButton name="update password" small capitalize />
            </form>
          </div>
          <SimpleButton name="logout" small capitalize />
        </div>
      </div>
      {/* <h2>{user.name} Welcome to your profile</h2>

      <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Profile;
