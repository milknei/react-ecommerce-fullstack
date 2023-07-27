import { createSlice } from '@reduxjs/toolkit';
import { getCartLocalStorage, setCartLocalStorage } from './local-storage';

const getTotalPrice = (cart) => {
  return Math.round(cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0) * 10) / 10;
};
const initialCart = getCartLocalStorage();
initialCart || setCartLocalStorage([]);
const initialState = {
  isCartOpen: false,
  cart: initialCart || [],
  totalPrice: initialCart ? getTotalPrice(initialCart) : 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isInCart = state.cart.find(
        (item) => item.id === action.payload.id && item.platform === action.payload.platform
      );
      if (!isInCart) state.cart = [...state.cart, action.payload];
      else
        state.cart = state.cart.map((item) => {
          if (item.id === action.payload.id && item.platform === action.payload.platform)
            item.quantity += action.payload.quantity;
          return item;
        });

      state.totalPrice = getTotalPrice(state.cart);
      setCartLocalStorage(state.cart);
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      state.totalPrice = getTotalPrice(state.cart);
      setCartLocalStorage(state.cart);
    },

    increaseQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) item.quantity++;
        return item;
      });
      state.totalPrice = getTotalPrice(state.cart);
      setCartLocalStorage(state.cart);
    },

    decreaseQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if ((item.id === action.payload.id) & (item.quantity > 1)) item.quantity--;
        return item;
      });
      state.totalPrice = getTotalPrice(state.cart);
      setCartLocalStorage(state.cart);
    },

    setQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if ((item.id === action.payload.id) & (item.quantity > 1)) item.quantity = action.payload.quantity;
        return item;
      });
      state.totalPrice = getTotalPrice(state.cart);
      setCartLocalStorage(state.cart);
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    emptyCart: (state) => {
      state.cart = [];
      setCartLocalStorage([]);
    },
  },
});

export const { setItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setIsCartOpen, emptyCart } =
  cartSlice.actions;

export const cartReducer = cartSlice;
