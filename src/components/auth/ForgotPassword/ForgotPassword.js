import React, { useState } from "react";
// Styles
import classes from "../Authentication.module.scss";
// React Router
import { Link, withRouter } from "react-router-dom";
// Components
import ButtonLoader from "../../UI/ButtonLoader/ButtonLoader";
// Axios
import axios from "axios";

/**
 * Main Component
 */

const ForgotPassword = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokenSended, setTokenSended] = useState(false);

  const clearInputFields = () => {
    setEmailInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setTokenSended(false);
      setLoading(true);
      const user = { email: emailInput };
      await axios.post("/api/v1/users/forgotpassword", user);
      setLoading(false);
      setTokenSended(true);
    } catch (err) {
      setError(err.response.data.error.message);
      setLoading(false);
    }
    clearInputFields();
  };

  return (
    <div className={classes.AuthContainer}>
      <form className={classes.FormContainer} onSubmit={handleSubmit}>
        {error ? (
          <div className={classes.ErrorMessage}>
            <p>{error}</p>
          </div>
        ) : (
          ""
        )}

        {tokenSended ? (
          <div className={classes.SuccessMessage}>
            <p>Password reset link send to your mail</p>
          </div>
        ) : (
          ""
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
          />
        </div>

        <button type="submit" className={loading ? classes.Disabled : ""}>
          {loading ? <ButtonLoader /> : "Reset Password"}
        </button>
      </form>

      <div className={classes.BottomText}>
        <p>
          Didn't forgot password? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default withRouter(ForgotPassword);
