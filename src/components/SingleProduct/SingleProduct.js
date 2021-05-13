import React, { useEffect } from "react";

// Data
import data from "../../data/data";

// HelperFunction
import { truncateWords } from "../../utilities/helperFunctions";

// Components
import BreadCrumb from "../BreadCrumb/BreadCrumb";

const SingleProduct = (props) => {
  const id = props.match.params.id;
  const currentProduct = data.filter((item) => item.id === id)[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <BreadCrumb title={truncateWords(currentProduct.name, 18)} product />
      <div>
        <h1>This is Single Product</h1>
        <img src={currentProduct.images[0]} alt={currentProduct.name} />
      </div>
    </div>
  );
};

export default SingleProduct;
