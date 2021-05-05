import React from "react";

// Router
import { Link } from "react-router-dom";

// Styles
import classes from "./BreadCrumb.module.scss";

const BreadCrumb = ({ title, product }) => {
  return (
    <div className={classes.BreadCrumb}>
      <Link to="/">
        home
      </Link>
      {product && (
        <Link to="/products">
          <i className="fas fa-long-arrow-alt-right"></i> products
        </Link>
      )}
      <span>
        <i className="fas fa-long-arrow-alt-right"></i>
        {title}
      </span>
    </div>
  );
};

export default BreadCrumb;
