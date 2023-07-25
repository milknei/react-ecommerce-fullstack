import { setWishListLocalStorage } from '../model/local-storage';
import { getUserFromLocalCookie } from '@entities/user/index';
import { putWishListById } from '../api/wish-list-api';

export const syncWishList = async (wishList, id) => {
  setWishListLocalStorage(wishList);

  if (id) {
    putWishListById(id, wishList)
  }
};
