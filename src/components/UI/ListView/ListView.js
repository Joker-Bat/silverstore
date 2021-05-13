import React from "react";

// Styles
import classes from "./ListView.module.scss";
// NumberFormat
import NumberFormat from "react-number-format";
// HelperFunction
import { truncateWords } from "../../../utilities/helperFunctions";
// Components
import Button from "../../UI/Button/Button";

const ListView = ({ id, name, price, highlights, image }) => {
  return (
    <div className={classes.ListView}>
      <div className={classes.ImageContainer}>
        <img src={image} alt={name} />
      </div>
      <div className={classes.Details}>
        <h1 className={classes.Title}>{truncateWords(name, 28)}</h1>
        <ul className={classes.Highlights}>
          {highlights.map((item, index) => {
            return (
              <li key={"ListViewHighLights" + index}>
                {truncateWords(item, 58)}
              </li>
            );
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
          <Button name="View" route={`/products/${id}`} small />
        </div>
      </div>
    </div>
  );
};

export default ListView;
