import { createSlice } from '@reduxjs/toolkit';
import { getWishListLocalStorage, setWishListLocalStorage } from './local-storage';
import { syncWishList } from '../lib/sync-wish-list';

const initialState = {
  wishListId: null,
  isWishListOpened: false,
  wishList: getWishListLocalStorage() || [],
};

export const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    setWishList: (state, action) => {
      state.wishList = state.wishList.concat(
        action.payload?.attributes.items.filter((item) => state.wishList.indexOf(item) < 0)
      );
      state.wishListId = action.payload?.id;
      setWishListLocalStorage([...state.wishList]);
    },
    addToWishList: (state, action) => {
      if (!state.wishList.find((wishListItem) => wishListItem.id === action.payload.id))
        state.wishList.push(action.payload.id);
      syncWishList([...state.wishList], state.wishListId);
    },
    removeFromWishList: (state, action) => {
      state.wishList = state.wishList.filter((id) => id !== action.payload.id);
      syncWishList([...state.wishList], state.wishListId);
    },
    setIsWishListOpened: (state) => {
      state.isWishListOpened = !state.isWishListOpened;
    },
    clearLocalWishList: (state) => {
      state.wishList = [];
      setWishListLocalStorage([]);
    },
  },
});

export const { addToWishList, removeFromWishList, setIsWishListOpened, setWishList, clearLocalWishList } = wishListSlice.actions;

export const wishListReducer = wishListSlice;
