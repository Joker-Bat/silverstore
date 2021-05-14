import React from "react";

// data
import data from "../../data/data";

// HelperFunctions
import { truncateWords } from "../../utilities/helperFunctions";

// Components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import SingleProductHeader from "../../components/SingleProduct/SingleProductHeader/SingleProductHeader";

const SingleProduct = (props) => {
  const id = props.match.params.id;
  const currentProduct = data.filter((item) => item.id === id)[0];

  return (
    <div>
      <BreadCrumb title={truncateWords(currentProduct.name, 18)} product />
      <main>
        <SingleProductHeader
          name={currentProduct.name}
          images={currentProduct.images}
        />
      </main>
    </div>
  );
};

export default SingleProduct;
