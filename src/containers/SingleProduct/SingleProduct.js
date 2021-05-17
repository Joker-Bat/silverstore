import React from "react";

// data
import data from "../../data/data";

// HelperFunctions
import { truncateWords } from "../../utilities/helperFunctions";

// Components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import SingleProductHeader from "../../components/SingleProduct/SingleProductHeader/SingleProductHeader";
import SingleProductSpecs from "../../components/SingleProduct/SingleProductSpecs/SingleProductSpecs";
import Reviews from "../../components/SingleProduct/Reviews/Reviews";

const SingleProduct = (props) => {
  const id = props.match.params.id;
  const currentProduct = data.filter((item) => item.id === id)[0];

  // console.log(currentProduct);

  return (
    <div>
      <BreadCrumb title={truncateWords(currentProduct.name, 18)} product />
      <main>
        <SingleProductHeader
          name={currentProduct.name}
          images={currentProduct.images}
          ratings={currentProduct.ratings}
          price={currentProduct.price}
          realPrice={currentProduct.realPrice}
          brand={currentProduct.brand}
          type={currentProduct.type}
        />
        <SingleProductSpecs
          highlights={currentProduct.highlights}
          specs={currentProduct.specs}
        />
        <Reviews id={currentProduct.id} ratings={currentProduct.ratings} />
      </main>
    </div>
  );
};

export default SingleProduct;
