import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

interface ProductState {
  products: Product[];
  favourites: Product[];
  cart: Product[];
  productsPerPage: number;
}

const initialState: ProductState = {
  products: [],
  favourites: [],
  cart: [],
  productsPerPage: 24,
};

const loadState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (key: string, state: Product[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch {
    // errors
  }
};

const productSlice = createSlice({
  name: 'product',
  initialState: {
    ...initialState,
    favourites: loadState('favourites') || initialState.favourites,
    cart: loadState('cart') || initialState.cart,
  },
  reducers: {
    setFavourites: (state, action: PayloadAction<Product[]>) => {
      state.favourites = action.payload;
      saveState('favourites', action.payload);
    },
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.cart = action.payload;
      saveState('cart', action.payload);
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setProductsPerPage: (state, action: PayloadAction<number>) => {
      state.productsPerPage = action.payload;
    },

    addToFavourites: (state, action: PayloadAction<Product>) => {
      const productToAdd: Product = action.payload;
      state.favourites.push(productToAdd);
      saveState('favourites', state.favourites);
    },
    removeFromFavourites: (state, action: PayloadAction<Product>) => {
      const productToRemove: Product = action.payload;
      const index = state.favourites.findIndex(
        (product: Product) => product.id === productToRemove.id,
      );
      if (index !== -1) {
        state.favourites.splice(index, 1);
        saveState('favourites', state.favourites);
      }
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const productToAdd: Product = action.payload;
      state.cart.push(productToAdd);
      saveState('cart', state.cart);
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const productToRemove: Product = action.payload;
      const index = state.cart.findIndex(
        (product: Product) => product.id === productToRemove.id,
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
        saveState('cart', state.cart);
      }
    },
  },
});

export const {
  setFavourites,
  setCart,
  setProducts,
  setProductsPerPage,
  addToFavourites,
  removeFromFavourites,
  addToCart,
  removeFromCart,
} = productSlice.actions;

export default productSlice.reducer;
