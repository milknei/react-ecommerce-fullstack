export const setCartLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCartLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(localStorage.getItem('cart')) : null;
};
