import React from "react";

// Styles
import classes from "./ListView.module.scss";

// NumberFormat
import NumberFormat from "react-number-format";

// Components
import Button from "../../UI/Button/Button";

const ListView = ({ id, name, price, highlights, image }) => {
  const truncateTitle = (word) => {
    return word.length > 28 ? word.substring(0, 25) + "..." : word;
  };

  const truncateDesc = (word) => {
    return word.length > 58 ? word.substring(0, 55) + "..." : word;
  };

  return (
    <div className={classes.ListView}>
      <div className={classes.ImageContainer}>
        <img src={image} alt={name} />
      </div>
      <div className={classes.Details}>
        <h1 className={classes.Title}>{truncateTitle(name)}</h1>
        <ul className={classes.Highlights}>
          {highlights.map((item) => {
            return <li>{truncateDesc(item)}</li>;
          })}
        </ul>
        <div className={classes.ButtonContainer}>
          <h1 className={classes.Price}>
            <NumberFormat
              displayType={"text"}
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
              prefix={"₹"}
              value={price}
            />
          </h1>
          <Button name="View" small />
        </div>
      </div>
    </div>
  );
};

export default ListView;
