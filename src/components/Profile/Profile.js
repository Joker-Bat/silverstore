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
import UpdatePassword from "./UpdatePassword/UpdatePassword";

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
  // For user detail update
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileNameRef, setProfileNameRef] = useState("");
  const [profileEmailRef, setProfileEmailRef] = useState("");
  const [profileUpdateDisabled, setProfileUploadDisabled] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  // Common State for All update
  const [profileUpdated, setProfileUpdated] = useState(false);

  const fillStateValues = (user) => {
    setProfileName(user.name);
    setProfileNameRef(user.name);
    setProfileEmail(user.email);
    setProfileEmailRef(user.email);
    setCurrentPic(user.photo);
  };

  const successfullyPictureUpdated = () => {
    setProfileUpdated(true);
    setPictureSuccess(true);
    setNewFilename("");
    setPictureLoading(false);
  };

  const handleLogout = async () => {
    await axios.get("/api/v1/users/logout");
    dispatch(removeToken());
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
        },
      });
      successfullyPictureUpdated();
    } catch (err) {
      setPictureLoading(false);
      setPictureError(err.response.data.message);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (profileUpdateDisabled) {
      return setProfileError("Change data before update");
    }
    try {
      setProfileLoading(true);
      await axios.patch("/api/v1/users/updateprofile/", {
        name: profileName,
        email: profileEmail,
      });
      setProfileSuccess(true);
      setProfileLoading(false);
      setProfileUpdated(true);
    } catch (err) {
      setProfileLoading(false);
      console.log(err.response.data);
    }
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
      setPictureError("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [pictureError, profileError]);

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setPictureSuccess(false);
      setProfileSuccess(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [pictureSuccess, profileSuccess]);

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
            <small>Choose only square image</small>
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
          <UpdatePassword />
          <SimpleButton name="logout" clicked={handleLogout} small capitalize />
        </div>
      </div>
    </div>
  );
};

export default Profile;
