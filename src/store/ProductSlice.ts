import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

interface ProductState {
  products: Product[];
  favourites: Product[];
  cart: Product[];
  page: number;
  totalCount: number;
  limit: number;
}

const initialState: ProductState = {
  products: [],
  favourites: [],
  cart: [],
  page: 1,
  totalCount: 0,
  limit: 2,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFavourites: (state, action: PayloadAction<Product[]>) => {
      state.favourites = action.payload;
    },

    setCart: (state, action: PayloadAction<Product[]>) => {
      state.cart = action.payload;
    },

    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    addToFavourites: (state, action: PayloadAction<Product>) => {
      const productToAdd: Product = action.payload;
      state.favourites.push(productToAdd);
    },
    removeFromFavourites: (state, action: PayloadAction<Product>) => {
      const productToRemove: Product = action.payload;
      const index = state.favourites.findIndex(
        (product: Product) => product.id === productToRemove.id,
      );
      if (index !== -1) {
        state.favourites.splice(index, 1);
      }
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const productToAdd: Product = action.payload;
      state.cart.push(productToAdd);
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const productToRemove: Product = action.payload;
      const index = state.cart.findIndex(
        (product: Product) => product.id === productToRemove.id,
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
  },
});

export const {
  setPage,
  setTotalCount,
  setLimit,
  addToFavourites,
  removeFromFavourites,
  addToCart,
  removeFromCart,
} = productSlice.actions;

export default productSlice.reducer;
