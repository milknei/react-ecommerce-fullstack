export const setWishListLocalStorage = (wishList = []) => {
  localStorage.setItem('wishList', JSON.stringify(wishList));
};

export const getWishListLocalStorage = () => {
  const wishList = localStorage.getItem('wishList');
  if (wishList) {
    return JSON.parse(localStorage.getItem('wishList'));
  } else {
    setWishListLocalStorage();
    return null;
  }
};
