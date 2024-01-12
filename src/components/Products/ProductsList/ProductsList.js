import React, { useState, useEffect, useCallback } from 'react';
// Styles
import classes from './ProductsList.module.scss';
// Component
import ProductsTop from './ProductsTop/ProductsTop';
import Product from '../../UI/Product/Product';
import ListView from '../../UI/ListView/ListView';
// Redux toolkit
import { useSelector, useDispatch } from 'react-redux';
// Helper function
import { getFilteredProductsByChoices } from './model/getFilteredProducts';
import { updateProducts } from '../../../store/products/productsSlice';
import { getImageUrl } from '../../../utilities/helperFunctions';

/*
  Code
*/

const ProductsList = () => {
  const [productChanged, setProductChanged] = useState(false);
  const skeletonFilllup = Array(20).fill(0);
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
  }, [categorys, companys, price, dispatch, productRef]);

  const getListView = useCallback(
    (products) => {
      const listViews = products.map((item) => {
        const image = getImageUrl(`/images/products/${item.images[0]}`);
        return (
          <ListView
            key={'ProductsListView' + item.id}
            id={item.slug}
            name={item.name}
            image={image}
            price={item.price}
            highlights={item.highlights}
          />
        );
      });
      // Here i am usring productChanged to check if the products is changed from initial empty array to render skeleton
      if (!productChanged) {
        setProductChanged(true);
      }
      return listViews;
    },
    [productChanged]
  );

  const getGridView = useCallback(
    (products) => {
      const gridViews = products.map((item) => {
        const image = getImageUrl(`/images/products/${item.images[0]}`);
        return (
          <Product
            key={'ProductsList' + item.id}
            id={item.slug}
            name={item.name}
            image={image}
            price={item.price}
          />
        );
      });
      // Here i am usring productChanged to check if the products is changed from initial empty array to render skeleton
      if (!productChanged) {
        setProductChanged(true);
      }
      return gridViews;
    },
    [productChanged]
  );

  const getGridViewSkeleton = useCallback((products) => {
    const gridViewSkeletons = products.map((_, index) => {
      return <Product key={'gridSkeleton' + index} skeleton />;
    });
    return gridViewSkeletons;
  }, []);

  const getListViewSkeleton = useCallback((products) => {
    const listViewSkeleton = products.map((_, index) => {
      return <ListView key={'listSkeleton' + index} skeleton />;
    });
    return listViewSkeleton;
  }, []);

  // Products List Class based on grid or list view
  const ProductListClass = listView
    ? classes.ProductsListView
    : classes.ProductsList;

  // Return
  return (
    <div className={classes.ProductsContainer}>
      <ProductsTop />
      <div className={ProductListClass}>
        {products.length !== 0 ? ( // If product length is not empty
          listView ? (
            getListView(products)
          ) : (
            getGridView(products)
          )
        ) : products.length === 0 && !productChanged ? ( // if product is empty and before its not changed from empty to some products
          listView ? (
            getListViewSkeleton(skeletonFilllup)
          ) : (
            getGridViewSkeleton(skeletonFilllup)
          )
        ) : (
          <h1>No result for this filter</h1>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
