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
      const fullName = action.payload.id + ' ' + action.payload?.platform;

      const isInCart = state.cart.find((item) => item.fullName === fullName);

      if (!isInCart) state.cart = [...state.cart, { ...action.payload, fullName }];
      else
        state.cart = state.cart.map((item) => {
          if (item.fullName === fullName) item.quantity += action.payload.quantity;
          return item;
        });

      state.totalPrice = getTotalPrice(state.cart);
      setCartLocalStorage(state.cart);
    },

    removeFromCart: (state, action) => {
      const fullName = action.payload.id + ' ' + action.payload?.platform;

      state.cart = state.cart.filter((item) => item.fullName !== fullName);

      state.totalPrice = getTotalPrice(state.cart);
      setCartLocalStorage(state.cart);
    },

    increaseQuantity: (state, action) => {
      const fullName = action.payload.id + ' ' + action.payload?.platform;

      state.cart = state.cart.map((item) => {
        if (item.fullName === fullName) item.quantity++;
        return item;
      });

      state.totalPrice = getTotalPrice(state.cart);
      setCartLocalStorage(state.cart);
    },

    decreaseQuantity: (state, action) => {
      const fullName = action.payload.id + ' ' + action.payload?.platform;

      state.cart = state.cart.map((item) => {
        if ((item.fullName === fullName) & (item.quantity > 1)) item.quantity--;
        return item;
      });

      state.totalPrice = getTotalPrice(state.cart);
      setCartLocalStorage(state.cart);
    },

    setQuantity: (state, action) => {
      const fullName = action.payload.id + ' ' + action.payload?.platform;

      state.cart = state.cart.map((item) => {
        if ((item.fullName === fullName) & (item.quantity > 1)) item.quantity = action.payload.quantity;
        return item;
      });

      state.totalPrice = getTotalPrice(state.cart);
      setCartLocalStorage(state.cart);
    },

    setPlatform: (state, action) => {
      const oldFullName = action.payload.id + ' ' + action.payload?.platform;
      const newFullName = action.payload.id + ' ' + action.payload?.newPlatform;

      const isNewInCart = state.cart.find((item) => item.fullName === newFullName);

      if (isNewInCart) {
        state.cart = state.cart.map((item) => {
          if (item.fullName === newFullName)
            return { ...item, quantity: item.quantity + action.payload.quantity, platform: action.payload.newPlatform };
          else return item;
        });

        state.cart = state.cart.filter((item) => item.fullName === newFullName);
      } else {
        state.cart = state.cart.map((item) => {
          if (item.fullName === oldFullName)
            return { ...item, fullName: newFullName, platform: action.payload.newPlatform };
          else return item;
        });

        state.totalPrice = getTotalPrice(state.cart);
        setCartLocalStorage(state.cart);
      }
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

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setIsCartOpen,
  emptyCart,
  setPlatform,
} = cartSlice.actions;

export const cartReducer = cartSlice;
