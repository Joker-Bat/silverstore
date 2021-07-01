import React, { useState } from "react";

// Style
import classes from "./Signup.module.scss";

// React Router
import { Link, withRouter } from "react-router-dom";

// Firebase
import { auth } from "../../firebase";

const Signup = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [passwordEqual, setPasswordEqual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordInput !== passwordConfirmInput) return false;

    try {
      setLoading(true);
      const user = await auth.createUserWithEmailAndPassword(
        emailInput,
        passwordInput
      );
      console.log(user);
      setLoading(false);
      props.history.push("/");
    } catch (err) {
      setLoading(false);
      console.log("Error", err.message);
    }

    // Clear Input Fields
    setEmailInput("");
    setPasswordInput("");
    setPasswordConfirmInput("");
  };

  const checkIsPasswordEqual = (e) => {
    setPasswordConfirmInput(e.target.value);
    if (e.target.value === passwordInput) {
      setPasswordEqual(true);
    } else setPasswordEqual(false);
  };

  return (
    <div className={classes.SignupContainer}>
      {loading && <h1>Processing...</h1>}
      <form className={classes.FormContainer} onSubmit={handleSubmit}>
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

        <button type="submit">Sign Up</button>
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
