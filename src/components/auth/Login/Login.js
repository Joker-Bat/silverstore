import React, { useState, useEffect } from 'react';
// Styles
import classes from '../Authentication.module.scss';
// React Router
import { Link } from 'react-router-dom';
// Components
import Button from '../../Button/Button';
// Axios
import axios from 'axios';
// Redux toolkit
import { useDispatch } from 'react-redux';
import { setToken } from '../../../store/auth/authSlice';

/**
 * Main Component
 */

const Login = (props) => {
  const dispatch = useDispatch();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  let timer;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const setTokenToLocalAndState = (token) => {
    timer = setTimeout(() => {
      dispatch(setToken({ token }));
    }, 2000);
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const clearInputFields = () => {
    setEmailInput('');
    setPasswordInput('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoggedIn(false);
      setLoading(true);
      const user = { email: emailInput, password: passwordInput };
      const res = await axios.post('/api/v1/users/login', user);
      setTokenToLocalAndState(res.data.token);
      setLoading(false);
      setLoggedIn(true);
      clearInputFields();
    } catch (err) {
      setError(err.response.data.error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    clearInputFields();
    return () => clearTimeout(timer);
  }, [timer]);

  return (
    <div className={classes.AuthContainer}>
      <form className={classes.FormContainer} onSubmit={handleSubmit}>
        {error ? (
          <div className={classes.ErrorMessage}>
            <p>{error}</p>
          </div>
        ) : (
          ''
        )}

        {loggedIn ? (
          <div className={classes.SuccessMessage}>
            <p>Successfully Logged In</p>
          </div>
        ) : (
          ''
        )}
        <div className={classes.InputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            required
            tabIndex="1"
          />
        </div>

        <div className={classes.InputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
            required
            tabIndex="2"
          />
          <Link to="/forgotpassword">Forgot password?</Link>
        </div>

        <div className={classes.ShowPassword}>
          <input
            checked={showPassword}
            onChange={handleShowPassword}
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

        <Button
          name="log in"
          capitalize
          loading={loading}
          submit
          tabIndex="3"
          fixedWidth
        />
      </form>

      <div className={classes.BottomText}>
        <p>
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
