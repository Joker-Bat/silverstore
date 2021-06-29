import React, { useState, useEffect, useRef } from "react";
// Axios
import axios from "../../../axios-base";
// Helper function
import { arrayToObjectState } from "../../../utilities/helperFunctions";

// React Router
import { withRouter } from "react-router-dom";
// Styles
import classes from "./SearchBar.module.scss";
// Redux toolkit
import { setProducts } from "../../../store/products/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setPrice } from "../../../store/filter/filterSlice";
import { setAllProducts } from "../../../store/cart/cartSlice";
// Components
import SuggestionItem from "./SuggestionItem/SuggestionItem";

/* 
  Main Component
*/

const SearchBar = (props) => {
  // React Redux
  const dispatch = useDispatch();
  const { productRef } = useSelector((state) => state.products);

  const [productList, setProductList] = useState(productRef);
  const searchContainer = useRef(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isVisble, setIsVisible] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [cursor, setCursor] = useState(0);

  const handleFilter = (event) => {
    const currentWord = event.target.value;
    setSearchWord(currentWord);
    const newFilter = productList.filter((item) => {
      return item.name.toLowerCase().includes(currentWord.toLowerCase());
    });

    if (currentWord === "") setFilteredProducts([]);
    else setFilteredProducts(newFilter);
  };

  const showSuggestion = () => setIsVisible(true);
  const hideSuggestion = () => setIsVisible(false);

  const handleOutsideClick = (e) => {
    if (
      searchContainer.current &&
      !searchContainer.current.contains(e.target)
    ) {
      hideSuggestion();
    }
  };

  const handleClick = () => {
    props.history.push(`/products/${filteredProducts[cursor].slug}`);
    hideSuggestion();
    setFilteredProducts([]);
    setSearchWord("");
  };

  const keyboardNavigation = (e) => {
    if (e.key === "ArrowDown") {
      isVisble
        ? setCursor((c) => (c < filteredProducts.length - 1 ? c + 1 : c))
        : showSuggestion();
    }
    if (e.key === "ArrowUp") {
      setCursor((c) => (c > 0 ? c - 1 : 0));
    }
    if (e.key === "Escape") {
      hideSuggestion();
    }
    if (e.key === "Enter") {
      handleClick();
    }
  };

  // Get Category State
  const getProductsPageDetails = (products) => {
    // Categorys
    const categroryList = [...new Set(products.map((item) => item.type))];
    const categoryState = arrayToObjectState(categroryList, false);
    //Max price
    const maxPrice = Math.max(...products.map((item) => +item.price));
    const minPrice = Math.min(...products.map((item) => +item.price));
    dispatch(setPrice({ maxPrice, minPrice }));
    dispatch(setCategory(categoryState));
  };

  useEffect(() => {
    if (productRef.length === 0) {
      const fetchData = async () => {
        const res = await axios.get("/api/v1/products");
        const products = res.data.data.products;
        dispatch(setProducts(products));
        setProductList(products);
        // For Single Product page
        getProductsPageDetails(products);
        // For Cart
        dispatch(setAllProducts(products));
      };
      fetchData();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.Search} ref={searchContainer}>
      <div className={classes.SearchInputs}>
        <input
          className={props.shrink ? classes.ShrinkInput : ""}
          type="search"
          name="name"
          placeholder="Search Product here..."
          value={searchWord}
          autoComplete="off"
          onClick={showSuggestion}
          onChange={handleFilter}
          onKeyDown={(e) => keyboardNavigation(e)}
        />
      </div>
      {isVisble && (
        <div className={classes.DataResult}>
          {filteredProducts.length !== 0 ? (
            filteredProducts.slice(0, 8).map((item, key) => {
              const highlightClass = [
                classes.DataItem,
                cursor === key ? classes.Active : "",
              ];
              return (
                <SuggestionItem
                  key={`SuggestionItem-${key}`}
                  style={highlightClass}
                  name={item.name}
                  slug={item.slug}
                  clicked={handleClick}
                  hover={setCursor}
                  cursorId={key}
                  closeBackdrop={props.closeBackdrop}
                />
              );
            })
          ) : (
            <p href="#" className={classes.DataItem}>
              {searchWord === ""
                ? "Search some product"
                : "No matched products!"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default withRouter(SearchBar);
