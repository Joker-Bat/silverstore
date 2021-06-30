import React, { useState } from "react";

// Style
import classes from "./Signup.module.scss";

// React Router
import { Link } from "react-router-dom";

const Signup = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [passwordEqual, setPasswordEqual] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign UP");

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
            type="password"
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
            type="password"
            id="passwordConfirm"
            value={passwordConfirmInput}
            onChange={checkIsPasswordEqual}
            name="password"
            autoComplete="off"
            placeholder="Confirm Password"
            required
          />
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

export default Signup;
