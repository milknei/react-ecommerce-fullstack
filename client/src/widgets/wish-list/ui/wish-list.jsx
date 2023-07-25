import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWishListLocalStorage } from '@entities/wishlist/index';
import { getItem } from '@entities/item/index';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ButtonMain } from '@shared/index';
import { ItemListDetailed } from '@widgets/item-list-detailed/index';
import { LoadingProgress } from '@shared';
import { useSelector } from 'react-redux';

export const WishList = () => {
  const navigate = useNavigate();
  const [wishList, setWishList] = useState([]);
  const wishListLS = useSelector((state) => state.wishList.wishList);

  document.title = `GAME STASH: Wish List`;

  useEffect(() => {
    const getDetailedWishList = async () => {
      const detailedWishListRequests = await wishListLS.map((itemId) => getItem(itemId));
      const detailedWishList = await Promise.all(detailedWishListRequests);

      setWishList(detailedWishList);
    };

    wishListLS.length > 0 && getDetailedWishList();
  }, [wishListLS]);

  if (wishListLS.length < 1)
    return (
      <Box
        sx={{
          height: 'calc(100svh - 8.3rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: 10,
        }}
      >
        <Typography variant="h3">Your Wish List is empty :(</Typography>
        <ButtonMain
          sx={{
            maxWidth: {
              sm: '100%',
              md: '70%',
            },
            boxSizing: 'border-box !important',
          }}
          text="BROWSE GAMES"
          onClick={() => navigate('/games')}
        />
      </Box>
    );

  if (wishList.length < 1) return <LoadingProgress />;

  return <ItemListDetailed items={wishList} />;
};
