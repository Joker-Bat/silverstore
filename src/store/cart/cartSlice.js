import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    productRef: [],
    products: [],
    totalProducts: 0,
    totalPrice: 0,
  },
  reducers: {
    addCartItem: (state, { payload }) => {
      const { id, count } = payload;
      // Check if that product already exist
      const filteredProducts = state.products?.findIndex(
        (item) => item.id === id
      );
      if (filteredProducts !== -1) {
        const existingProduct = state.products[filteredProducts];
        existingProduct.count += count;
        existingProduct.subTotal =
          existingProduct.count * existingProduct.price;
      } else {
        const currentProduct = state.productRef.filter(
          (item) => item.id === id
        )[0];
        state.products.push({
          id,
          count,
          slug: currentProduct.slug,
          name: currentProduct.name,
          image: currentProduct.images[0],
          price: currentProduct.price,
          subTotal: count * currentProduct.price,
        });
      }
    },
    removeCartItem: (state, { payload }) => {
      state.products = state.products.filter((item) => item.id !== payload);
    },
    increaseProductCount: (state, { payload }) => {
      const index = state.products.findIndex((item) => item.id === payload);
      const currentProduct = state.products[index];
      currentProduct.count += 1;
      currentProduct.subTotal = currentProduct.count * currentProduct.price;
    },
    decreaseProductCount: (state, { payload }) => {
      const index = state.products.findIndex((item) => item.id === payload);
      const currentProduct = state.products[index];
      if (currentProduct.count > 1) {
        currentProduct.count -= 1;
        currentProduct.subTotal = currentProduct.count * currentProduct.price;
      }
    },
    setAllProducts: (state, { payload }) => {
      state.productRef = [...payload];
    },
    // This function is for initial fetching carts from server
    setCartProducts: (state, { payload }) => {
      const cartsData = payload;
      // Filter cart product from all products
      const filteredProducts = state.productRef.filter((item1) => {
        return cartsData.some((item2) => {
          return item2.productId === item1.id;
        });
      });
      // Filter the fields as out need to display
      const cartProducts = filteredProducts.map((item1) => {
        let product;
        cartsData.forEach((item2) => {
          if (item1.id === item2.productId) {
            product = {
              id: item2.productId,
              count: item2.count,
              slug: item1.slug,
              name: item1.name,
              image: item1.images[0],
              price: item1.price,
              subTotal: item2.count * item1.price,
            };
          }
        });
        return product;
      });
      state.products = cartProducts;
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  increaseProductCount,
  decreaseProductCount,
  setAllProducts,
  setCartProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
