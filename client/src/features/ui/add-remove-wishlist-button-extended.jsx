import React from 'react';
import { addToWishList, removeFromWishList } from '@entities/wishlist/index';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';

export const AddRemoveWishListButtonExtended = ({ item, style = 'contained', color }) => {
  const wishList = useSelector((state) => state.wishList.wishList);
  const dispatch = useDispatch();
  const id = item.id;

  return (
    <Box>
      {wishList.find((wishListItem) => wishListItem === id) ? (
        <Button
          variant="outlined"
          endIcon={<FavoriteIcon sx={{ color: 'error.light' }} />}
          onClick={() => dispatch(removeFromWishList({ id }))}
          sx={color ? { color: 'text.primary' } : {}}
          color={color || 'error'}
        >
          REMOVE FROM WISHLIST
        </Button>
      ) : (
        <Button
          variant={style}
          endIcon={<FavoriteBorderIcon sx={{ color: 'error' }} />}
          onClick={() => dispatch(addToWishList({ id }))}
          sx={color ? { color: 'text.primary' } : {}}
          color={color || 'error'}
        >
          ADD TO WISHLIST
        </Button>
      )}
    </Box>
  );
};
