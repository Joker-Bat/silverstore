import React from "react";

// Style
import classes from "./PopularBrands.module.scss";

// SVG Iconst
import { ReactComponent as Apple } from "../../../images/brandIcons/apple.svg";
import { ReactComponent as Dell } from "../../../images/brandIcons/dell.svg";
import { ReactComponent as Hp } from "../../../images/brandIcons/hp.svg";
import { ReactComponent as Samsung } from "../../../images/brandIcons/samsung.svg";

// Components
import Title from "../../UI/Title/Title";

const PopularBrands = () => {
  return (
    <section className={classes.PopularBrands}>
      <Title name="Popular Brands" />
      <div className={classes.BrandsContainer}>
        <div className={classes.Apple}>
          <Apple />
        </div>
        <div className={classes.Dell}>
          <Dell />
        </div>
        <div className={classes.Samsung}>
          <Samsung />
        </div>
        <div className={classes.Hp}>
          <Hp />
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;
