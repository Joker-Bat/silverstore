import React from "react";

// Material ui
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const CustomSlider = withStyles({
  root: {
    color: "#2874f0",
    height: 1,
    padding: "13px 0",
    width: "90%",
    maxWidth: "250px",
  },
  thumb: {
    height: 15,
    width: 15,
    marginTop: -6,
  },
  valueLabel: {
    left: "calc(-50%)",
    top: -20,
    "& *": {
      color: "#2874f0",
      padding: "1rem",
      fontSize: "1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
    },
  },
  track: {
    height: 3,
  },
  rail: {
    color: "#91bbff",
    opacity: 1,
    height: 3,
  },
})(Slider);

const RangeSlider = ({ price, setPrice, minPrice, maxPrice }) => {
  return (
    <CustomSlider
      value={price}
      onChange={setPrice}
      min={minPrice}
      max={maxPrice}
      valueLabelDisplay="auto"
    />
  );
};

export default RangeSlider;
