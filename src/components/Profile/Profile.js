import React, { useState, useEffect } from "react";
// Styles
import classes from "./Profile.module.scss";
// Axios
import axios from "axios";
// Redux toolkit
import { useDispatch } from "react-redux";
import { removeToken } from "../../store/auth/authSlice";
// Components
import SimpleButton from "../UI/SimpleButton/SimpleButton";
import Title from "../UI/Title/Title";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";
import SuccessMessage from "../UI/SuccessMessage/SuccessMessage";
import ButtonLoader from "../UI/ButtonLoader/ButtonLoader";

/**
 * Main Component
 */

const Profile = () => {
  const dispatch = useDispatch();
  // For profile pic upload
  const [pictureError, setPictureError] = useState("");
  const [pictureSuccess, setPictureSuccess] = useState(false);
  const [pictureLoading, setPictureLoading] = useState(false);
  const [currentPic, setCurrentPic] = useState("");
  const [newPic, setNewPic] = useState(null);
  const [newFilename, setNewFilename] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState("0%");
  const [profileUpdated, setProfileUpdated] = useState(false);
  // For user detail update
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileNameRef, setProfileNameRef] = useState("");
  const [profileEmailRef, setProfileEmailRef] = useState("");
  const [profileUpdateDisabled, setProfileUploadDisabled] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  // For password update
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [passwordsEqual, setPasswordsEqual] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fillStateValues = (user) => {
    setProfileName(user.name);
    setProfileNameRef(user.name);
    setProfileEmail(user.email);
    setProfileEmailRef(user.email);
    setCurrentPic(user.photo);
  };

  const handleLogout = async () => {
    await axios.get("/api/v1/users/logout");
    dispatch(removeToken());
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handlePictureUpdate = async (e) => {
    e.preventDefault();
    if (!newPic) return setPictureError("Select image to upload");
    const fd = new FormData();
    fd.append("photo", newPic);
    try {
      setPictureLoading(true);
      await axios.patch("/api/v1/users/updateprofilepicture", fd, {
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            `${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`
          );
          console.log(
            "Uploading: ",
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        },
      });
      setProfileUpdated(true);
      setPictureSuccess(true);
      setNewFilename("");
      setPictureLoading(false);
    } catch (err) {
      setPictureLoading(false);
      console.log(err.response.data);
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (profileUpdateDisabled) {
      return setProfileError("Change data before update");
    }
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirm)
      return setPasswordError("New Passwords not match");
  };

  const handlePasswordEqual = (e) => {
    setNewPasswordConfirm(e.target.value);
    if (e.target.value === newPassword) return setPasswordsEqual(true);
    else return setPasswordsEqual(false);
  };

  const handleFileChange = (e) => {
    const currentImage = e.target.files[0];
    if (currentImage?.type.split("/")[0] === "image") {
      setNewPic(currentImage);
      setNewFilename(currentImage.name);
    } else {
      setPictureError("Select only image files");
      setNewPic(null);
      setNewFilename("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/v1/users/profile");
      fillStateValues(res.data.data.user);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/v1/users/profile");
      fillStateValues(res.data.data.user);
    };
    if (profileUpdated) {
      fetchData();
      setProfileUpdated(false);
      setUploadPercentage("0%");
    }
  }, [profileUpdated]);

  useEffect(() => {
    if (profileName === profileNameRef && profileEmail === profileEmailRef) {
      setProfileUploadDisabled(true);
    } else {
      setProfileUploadDisabled(false);
    }
  }, [profileName, profileEmail, profileNameRef, profileEmailRef]);

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setProfileError("");
      setPasswordError("");
      setPictureError("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [pictureError, profileError, passwordError]);

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setPictureSuccess(false);
      setPasswordSuccess(false);
      setProfileSuccess(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [pictureSuccess, passwordSuccess, profileSuccess]);

  return (
    <div className={classes.Profile}>
      <Title name="profile" />
      <div className={classes.ProfileContainer}>
        <div className={classes.UpdateProfileContainer}>
          <div className={classes.ProfilePictureContainer}>
            <img src={`/images/users/${currentPic}`} alt="emoji" />
          </div>
          <form onSubmit={handlePictureUpdate}>
            {pictureError ? <ErrorMessage message={pictureError} /> : ""}
            {pictureSuccess ? (
              <SuccessMessage message="Profile picture updated" />
            ) : (
              ""
            )}
            <input
              type="file"
              id="profilePic"
              onChange={handleFileChange}
              accept="image/*"
            />
            <label htmlFor="profilePic">
              {!newFilename ? "Select new profile picture" : newFilename}
              <span
                style={{ width: uploadPercentage }}
                className={classes.Progress}
              ></span>
            </label>
            <button
              type="submit"
              className={pictureLoading ? classes.Disabled : ""}
            >
              {pictureLoading ? <ButtonLoader /> : "Upload"}
            </button>
          </form>
        </div>
        <div className={classes.UpdateDetailContainer}>
          <div className={classes.UpdateUserContainer}>
            <h2>update profile</h2>
            {profileError ? <ErrorMessage message={profileError} /> : ""}
            {profileSuccess ? (
              <SuccessMessage message="Profile updated successfully" />
            ) : (
              ""
            )}
            <form onSubmit={handleProfileUpdate}>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                required
              />
              <input
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className={
                  profileLoading || profileUpdateDisabled
                    ? classes.Disabled
                    : ""
                }
              >
                {profileLoading ? <ButtonLoader /> : "Update"}
              </button>
            </form>
          </div>
          <div className={classes.UpdatePasswordContainer}>
            <h2>update password</h2>
            {passwordError ? <ErrorMessage message={passwordError} /> : ""}
            {passwordSuccess ? (
              <SuccessMessage message="Profile updated password" />
            ) : (
              ""
            )}
            <form onSubmit={handlePasswordUpdate}>
              <div className={classes.InputGroup}>
                <label htmlFor="oldPassword">old password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  autoComplete="current-password"
                  id="oldPassword"
                  required
                />
              </div>
              <div className={classes.InputGroup}>
                <label htmlFor="newPassword">new password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="newPassword"
                  autoComplete="new-password"
                />
              </div>
              <div
                className={[
                  classes.InputGroup,
                  !passwordsEqual && classes.Error,
                ].join(" ")}
              >
                <label htmlFor="newPasswordConfirm">new password confirm</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPasswordConfirm}
                  onChange={handlePasswordEqual}
                  id="newPasswordConfirm"
                  autoComplete="new-password"
                />
              </div>
              <div className={classes.ShowPassword}>
                <input
                  type="checkbox"
                  value={showPassword}
                  onChange={handleShowPassword}
                  name="showPassword"
                  id="showPassword"
                  className={classes.Checkbox}
                />

                <label htmlFor="showPassword" className={classes.Label}>
                  <span className={classes.Checkmark}></span>
                  Show password
                </label>
              </div>
              <button
                type="submit"
                className={passwordLoading ? classes.Disabled : ""}
              >
                {passwordLoading ? <ButtonLoader /> : "Update password"}
              </button>
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
