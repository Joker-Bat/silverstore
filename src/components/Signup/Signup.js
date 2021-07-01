import React, { useState, useEffect } from "react";
// Style
import classes from "./Signup.module.scss";
// React Router
import { Link, withRouter } from "react-router-dom";
// Components
import ButtonLoader from "../UI/ButtonLoader/ButtonLoader";
// Redux toolkit
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/userSlice";
// Firebase
import { auth } from "../../firebase";

/**
 * Main Component
 */

const Signup = (props) => {
  const dispatch = useDispatch();

  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [passwordEqual, setPasswordEqual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const clearInputFields = () => {
    setEmailInput("");
    setUsernameInput("");
    setPasswordInput("");
    setPasswordConfirmInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordInput !== passwordConfirmInput) return false;

    if (!loading) {
      setError("");
      setLoading(true);
      auth
        .createUserWithEmailAndPassword(emailInput, passwordInput)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: usernameInput,
            })
            .then(() => {
              clearInputFields();
              dispatch(setUser({ email: emailInput, name: usernameInput }));
              setLoading(false);
              setLoggedIn(true);
            });
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    }
  };

  // Show a success message for 1500ms
  useEffect(() => {
    let timer;
    if (loggedIn) {
      timer = setTimeout(() => {
        setLoggedIn(false);
        props.history.push("/");
      }, 1500);
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [loggedIn]);

  const checkIsPasswordEqual = (e) => {
    setPasswordConfirmInput(e.target.value);
    if (e.target.value === passwordInput) {
      setPasswordEqual(true);
    } else setPasswordEqual(false);
  };

  return (
    <div className={classes.SignupContainer}>
      <form className={classes.FormContainer} onSubmit={handleSubmit}>
        {error ? (
          <div className={classes.ErrorMessage}>
            <p>{error}</p>
          </div>
        ) : (
          ""
        )}

        {loggedIn ? (
          <div className={classes.SuccessMessage}>
            <p>Successfully Created Account</p>
          </div>
        ) : (
          ""
        )}

        <div className={classes.InputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            name="email"
            autoComplete="off"
            placeholder="Email"
            required
          />
        </div>

        <div className={classes.InputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            name="username"
            autoComplete="off"
            placeholder="Username"
            required
          />
        </div>

        <div className={classes.InputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            name="password"
            autoComplete="off"
            placeholder="Password"
            required
          />
        </div>

        <div
          className={[classes.InputGroup, !passwordEqual && classes.Error].join(
            " "
          )}
        >
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="passwordConfirm"
            value={passwordConfirmInput}
            onChange={checkIsPasswordEqual}
            name="password"
            autoComplete="off"
            placeholder="Confirm Password"
            required
          />
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

        <button type="submit" className={loading ? classes.Disabled : ""}>
          {loading ? <ButtonLoader /> : "Sign Up"}
        </button>
      </form>

      <div className={classes.BottomText}>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default withRouter(Signup);
