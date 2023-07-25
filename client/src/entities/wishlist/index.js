export { wishListReducer, addToWishList, removeFromWishList, setIsWishListOpened, setWishList, clearLocalWishList } from './model/slice';
export { setWishListLocalStorage, getWishListLocalStorage } from './model/local-storage';
export { getWishListByEmail, postWishList, putWishListById } from './api/wish-list-api';
