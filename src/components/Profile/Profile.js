import React, { useState, useEffect, useCallback } from 'react';
// Styles
import classes from './Profile.module.scss';
// Axios
import axios from 'axios';
// Redux toolkit
import { useDispatch } from 'react-redux';
import { removeToken } from '../../store/auth/authSlice';
import {
  setErrorMessage,
  setSuccessMessage,
  removeSuccessMessage,
  removeErrorMessage,
} from '../../store/notification/notificationSlice';
// Components
import Title from '../UI/Title/Title';
import UpdatePassword from './UpdatePassword/UpdatePassword';
import Loading from '../UI/Loading/Loading';
import Button from '../Button/Button';
import ImageLoader from '../UI/ImageLoader/ImageLoader';

/**
 * Main Component
 */

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // For profile pic upload
  const [pictureLoading, setPictureLoading] = useState(false);
  const [currentPic, setCurrentPic] = useState('');
  const [newPic, setNewPic] = useState(null);
  const [newFilename, setNewFilename] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState('0%');
  // For user detail update
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profileNameRef, setProfileNameRef] = useState('');
  const [profileEmailRef, setProfileEmailRef] = useState('');
  const [profileUpdateDisabled, setProfileUploadDisabled] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  // Logout
  const [logoutLoading, setLogoutLoading] = useState(false);
  // Common State for All update to refetch data
  const [profileUpdated, setProfileUpdated] = useState(false);
  // Image loading state
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoading = () => {
    setImageLoading(false);
  };

  // Success Message
  const successMessageInProfile = useCallback(
    (message) => {
      let timer;
      clearTimeout(timer);
      dispatch(setSuccessMessage(message));
      timer = setTimeout(() => {
        dispatch(removeSuccessMessage());
      }, 2000);
    },
    [dispatch]
  );
  // Error Message
  const errorMessageInProfile = useCallback(
    (message) => {
      let timer;
      clearTimeout(timer);
      dispatch(setErrorMessage(message));
      timer = setTimeout(() => {
        dispatch(removeErrorMessage());
      }, 2000);
    },
    [dispatch]
  );

  // Fill all state values from data
  const fillStateValues = (user) => {
    setProfileName(user.name);
    setProfileNameRef(user.name);
    setProfileEmail(user.email);
    setProfileEmailRef(user.email);
    setCurrentPic(user.photo);
  };
  // Profile Picture updated clear state
  const successfullyPictureUpdated = () => {
    setProfileUpdated(true);
    setNewFilename('');
    setPictureLoading(false);
  };
  // Logout
  const handleLogout = async () => {
    let timer;
    try {
      setLogoutLoading(true);
      await axios.get('/api/v1/users/logout');
      setLogoutLoading(false);
      dispatch(removeToken());
    } catch (err) {
      setLogoutLoading(false);
      clearTimeout(timer);
      dispatch(setErrorMessage('Something went wrong with connection'));
      timer = setTimeout(() => {
        dispatch(removeErrorMessage());
      }, 2000);
    }
  };
  // Update profile picture
  const handlePictureUpdate = async (e) => {
    e.preventDefault();
    if (!newPic) return errorMessageInProfile('Select image to upload');
    const fd = new FormData();
    fd.append('photo', newPic);
    try {
      setPictureLoading(true);
      await axios.patch('/api/v1/users/updateprofilepicture', fd, {
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            `${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`
          );
        },
      });
      successfullyPictureUpdated();
      successMessageInProfile('Profile picture updated successfully');
    } catch (err) {
      setPictureLoading(false);
      errorMessageInProfile(err.response.data.error.message);
    }
  };
  // Update profile info name and email
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (profileUpdateDisabled) {
      return errorMessageInProfile('Change data before update');
    }
    try {
      setProfileLoading(true);
      await axios.patch('/api/v1/users/updateprofile/', {
        name: profileName,
        email: profileEmail,
      });
      successMessageInProfile('Profile info updated successfully');
      setProfileLoading(false);
      setProfileUpdated(true);
    } catch (err) {
      setProfileLoading(false);
      errorMessageInProfile(err.response.data.error.message);
    }
  };
  // Choose only images
  const handleFileChange = (e) => {
    const currentImage = e.target.files[0];
    if (currentImage?.type.split('/')[0] === 'image') {
      setNewPic(currentImage);
      setNewFilename(currentImage.name);
    } else {
      errorMessageInProfile('Select only image files');
      setNewPic(null);
      setNewFilename('');
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/v1/users/profile');
        fillStateValues(res.data.data.user);
      } catch (err) {
        errorMessageInProfile('Something went wrong with connection');
      }
    };
    fetchData();
    setLoading(false);
  }, [errorMessageInProfile]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/v1/users/profile');
        fillStateValues(res.data.data.user);
      } catch (err) {
        errorMessageInProfile('Something went wrong with connection');
      }
    };
    if (profileUpdated) {
      fetchData();
      setProfileUpdated(false);
      setUploadPercentage('0%');
    }
  }, [profileUpdated, errorMessageInProfile]);

  useEffect(() => {
    if (profileName === profileNameRef && profileEmail === profileEmailRef) {
      setProfileUploadDisabled(true);
    } else {
      setProfileUploadDisabled(false);
    }
  }, [profileName, profileEmail, profileNameRef, profileEmailRef]);

  return (
    <>
      {loading ? <Loading /> : null}
      <div className={classes.Profile}>
        <Title name="profile" />
        <div className={classes.ProfileContainer}>
          <div className={classes.UpdateProfileContainer}>
            <div className={classes.ProfilePictureContainer}>
              {imageLoading && <ImageLoader />}
              <img
                src={`/images/users/${currentPic}`}
                alt="emoji"
                onLoad={handleImageLoading}
              />
            </div>
            <form onSubmit={handlePictureUpdate}>
              <input
                type="file"
                id="profilePic"
                onChange={handleFileChange}
                accept="image/*"
              />
              <label htmlFor="profilePic">
                {!newFilename ? 'Select new profile picture' : newFilename}
                <span
                  style={{ width: uploadPercentage }}
                  className={classes.Progress}
                ></span>
              </label>
              <Button
                name="upload"
                capitalize
                loading={pictureLoading}
                submit
              />
              <small>Choose only square image</small>
            </form>
          </div>
          <div className={classes.UpdateDetailContainer}>
            <div className={classes.UpdateUserContainer}>
              <h2>update profile</h2>
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
                <Button
                  name="update"
                  capitalize
                  loading={profileLoading}
                  disabled={profileUpdateDisabled}
                  submit
                />
              </form>
            </div>
            <UpdatePassword />
            <Button
              name="logout"
              capitalize
              clicked={handleLogout}
              loading={logoutLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
