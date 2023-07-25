import React from 'react';
import { Box } from '@mui/material';
import { addToCart, removeFromCart } from '../../entities/cart/model/slice';
import { useDispatch, useSelector } from 'react-redux';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import RemoveShoppingCartTwoToneIcon from '@mui/icons-material/RemoveShoppingCartTwoTone';
import { StyledIconButton } from '@shared/index';

export const AddRemoveCartButton = ({ item, size = 'large' }) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const id = item.id;

  return (
    <Box>
      {cart.find((cartItem) => cartItem?.id === id) ? (
        <StyledIconButton
          size={size}
          sx={{ border: '1px solid red !important' }}
          onClick={() => dispatch(removeFromCart({ id: item.id }))}
        >
          <RemoveShoppingCartTwoToneIcon sx={{ color: 'error.light' }} />
        </StyledIconButton>
      ) : (
        <StyledIconButton
          size={size}
          sx={{ border: '1px solid red !important' }}
          onClick={() =>
            dispatch(
              addToCart({
                id: item.id,
                name: item.name,
                quantity: 1,
                platform: item.platforms[0].platform.name,
                screenshot: item.background_image,
                price: item.price,
              })
            )
          }
        >
          <AddShoppingCartTwoToneIcon sx={{ color: 'success.main' }} />
        </StyledIconButton>
      )}
    </Box>
  );
};
