import React from "react";

// Styles
import classes from "./SingleProductSpecs.module.scss";

const SingleProductSpecs = ({ highlights, specs }) => {
  const filteredSpecs =
    specs &&
    Object.keys(specs).map((item, index) => {
      let Product;
      if (specs[item]) {
        Product = (
          <div key={`SingleProductSpecs${index}`} className={classes.Spec}>
            <h1>{item + ":"}</h1> <p>{specs[item]}</p>
          </div>
        );
      } else {
        Product = "";
      }
      return Product;
    });

  return (
    <section className={classes.SingleProductSpecs}>
      <div className={classes.Highlights}>
        <h1>Highlights</h1>
        <ul>
          {highlights.map((item, index) => {
            return <li key={`SingleProducthighlight${index}`}>{item}</li>;
          })}
        </ul>
      </div>
      <div className={classes.Specifications}>
        {specs ? (
          <>
            <h1>Specifications</h1>
            <ul>{filteredSpecs}</ul>
          </>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default SingleProductSpecs;
