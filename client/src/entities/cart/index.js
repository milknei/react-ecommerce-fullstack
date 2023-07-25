export {
  cartReducer,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setIsCartOpen,
  emptyCart,
} from './model/slice';

export { setCartLocalStorage, getCartLocalStorage } from './model/local-storage';
