import React, { useEffect } from "react";
// Styles
import classes from "./ProductsList.module.scss";

// Component
import ProductsTop from "./ProductsTop/ProductsTop";
import Product from "../../UI/Product/Product";
import ListView from "../../UI/ListView/ListView";

// Redux toolkit
import { useSelector, useDispatch } from "react-redux";

// Helper function
import { getFilteredProductsByChoices } from "./model/getFilteredProducts";
import { updateProducts } from "../../../store/products/productsSlice";

/*
  Code 
*/

const ProductsList = () => {
  // Redux toolkit
  const { categorys, companys, price, listView } = useSelector(
    (state) => state.filter
  );
  const { products, productRef } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // UseEffect
  useEffect(() => {
    const filteredProductsByPrice = getFilteredProductsByChoices(
      categorys,
      companys,
      price,
      productRef
    );
    dispatch(updateProducts(filteredProductsByPrice));

    // eslint-disable-next-line
  }, [categorys, companys, price]);

  // Products List Class based on grid or list view
  const ProductListClass = listView
    ? classes.ProductsListView
    : classes.ProductsList;

  // Return
  return (
    <div className={classes.ProductsContainer}>
      <ProductsTop />
      <div className={ProductListClass}>
        {products?.map((item) => {
          const image = `https://freeestoreapi.herokuapp.com/images/products/${item.images[0]}`;
          return listView ? (
            <ListView
              key={"ProductsListView" + item.id}
              id={item.id}
              name={item.name}
              image={image}
              price={item.price}
              highlights={item.highlights}
            />
          ) : (
            <Product
              key={"ProductsList" + item.id}
              id={item.id}
              name={item.name}
              image={image}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductsList;
