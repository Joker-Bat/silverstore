import React, { useEffect } from "react";
// Styles
import classes from "./ProductsList.module.scss";
// Data
import data from "../../../data/data";
// Component
import ProductsTop from "./ProductsTop/ProductsTop";
import Product from "../../UI/Product/Product";
import ListView from "../../UI/ListView/ListView";
// Redux toolkit
import { useSelector, useDispatch } from "react-redux";

// Helper function
import { getFilteredProductsByChoices } from "./model/getFilteredProducts";
import { updateProducts } from "../../../store/products/productsSlice";

const ProductsList = () => {
  // Redux toolkit
  const { categorys, companys, price, listView } = useSelector(
    (state) => state.filter
  );
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // UseEffect
  useEffect(() => {
    const filteredProductsByPrice = getFilteredProductsByChoices(
      categorys,
      companys,
      price,
      data
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
        {products.map((item) => {
          return listView ? (
            <ListView
              key={"ProductsListView" + item.id}
              id={item.id}
              name={item.name}
              image={item.images[0]}
              price={item.price}
              highlights={item.highlights}
            />
          ) : (
            <Product
              key={"ProductsList" + item.id}
              id={item.id}
              name={item.name}
              image={item.images[0]}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductsList;
