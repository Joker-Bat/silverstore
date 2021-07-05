import React from "react";
// Router
import { Link } from "react-router-dom";
// Styles
import classes from "./BreadCrumb.module.scss";
// Icons
import { FaLongArrowAltRight } from "react-icons/fa";

const BreadCrumb = ({ title, product }) => {
  return (
    <div className={classes.BreadCrumb}>
      <Link to="/">home</Link>
      {product && (
        <Link to="/products">
          <FaLongArrowAltRight /> products
        </Link>
      )}
      <span>
        <FaLongArrowAltRight />
        {title}
      </span>
    </div>
  );
};

export default BreadCrumb;
