import React from 'react';
import { addToWishList, removeFromWishList } from '@entities/wishlist/index';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { StyledIconButton } from '@shared/index';

export const AddRemoveWishListButton = ({ item }) => {
  const wishList = useSelector((state) => state.wishList.wishList);
  const dispatch = useDispatch();
  const id = item.id;

  return (
    <Box>
      {wishList.find((wishListItem) => wishListItem === id) ? (
        <StyledIconButton
          size="large"
          sx={{ border: '1px solid red !important' }}
          onClick={() => dispatch(removeFromWishList({ id }))}
        >
          <FavoriteIcon fontSize="inherit" sx={{ color: 'error.light' }} />
        </StyledIconButton>
      ) : (
        <StyledIconButton
          size="large"
          sx={{ border: '1px solid red !important' }}
          onClick={() => dispatch(addToWishList({ id }))}
        >
          <FavoriteBorderIcon fontSize="inherit" sx={{ color: 'error.light' }} />
        </StyledIconButton>
      )}
    </Box>
  );
};
