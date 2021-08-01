import React, { useState, useEffect, useRef } from 'react';
// React Router
import { withRouter } from 'react-router-dom';
// Styles
import classes from './SearchBar.module.scss';
// Redux toolkit
import { useSelector } from 'react-redux';
// Components
import SuggestionItem from './SuggestionItem/SuggestionItem';

/*
  Main Component
*/

const SearchBar = (props) => {
  const { productRef } = useSelector((state) => state.products);

  const [productList, setProductList] = useState(productRef);
  const searchContainer = useRef(null);
  const searchInput = useRef(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isVisble, setIsVisible] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [cursor, setCursor] = useState(0);

  const handleFilter = (event) => {
    const currentWord = event.target.value;
    setSearchWord(currentWord);
    const newFilter = productList.filter((item) => {
      return item.name.toLowerCase().includes(currentWord.toLowerCase());
    });

    if (currentWord === '') setFilteredProducts([]);
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
    props.closeBackdrop && props.closeBackdrop();
    searchInput.current.blur();
    props.history.push(`/products/${filteredProducts[cursor].slug}`);
    hideSuggestion();
    setFilteredProducts([]);
    setSearchWord('');
  };

  const keyboardNavigation = (e) => {
    if (e.key === 'ArrowDown') {
      // Here c < (filteredProducts.length > 4 ? 3 : filteredProducts.length) =>  if the filtered products length greater then we move out cursor only 4steps otherwise we can move cursor as result length
      isVisble
        ? setCursor((c) =>
            c < (filteredProducts.length > 4 ? 3 : filteredProducts.length - 1)
              ? c + 1
              : c
          )
        : showSuggestion();
    }
    if (e.key === 'ArrowUp') {
      setCursor((c) => (c > 0 ? c - 1 : 0));
    }
    if (e.key === 'Escape') {
      hideSuggestion();
    }
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  useEffect(() => {
    setProductList(productRef);
  }, [productRef]);

  useEffect(() => {
    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.Search} ref={searchContainer}>
      <div className={classes.SearchInputs}>
        <input
          className={props.shrink ? classes.ShrinkInput : ''}
          type="search"
          name="name"
          placeholder="Search Product here..."
          ref={searchInput}
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
            filteredProducts.slice(0, 4).map((item, key) => {
              const highlightClass = [
                classes.DataItem,
                cursor === key ? classes.Active : '',
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
              {searchWord === ''
                ? 'Search some product'
                : 'No matched products!'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default withRouter(SearchBar);
