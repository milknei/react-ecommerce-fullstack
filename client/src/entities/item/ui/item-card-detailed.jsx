import { useEffect, useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FlexBox, ParallelogramTag } from '@shared/index';
import { AddRemoveCartButton, AddRemoveWishListButton } from '@features/index';
import { AddRemoveWishListButtonExtended } from '@features/index';
import { Platforms } from './platforms';
import { CardSlider } from './cad-slider';
import { ItemCardDescription } from './card-description';
import { getItemDetail } from '@entities/item/index';

export const ItemCardDetailed = ({ item }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [screenshots, setScreenshots] = useState(null);
  const { id, name, released, genres, rating, price, parent_platforms, slug } = item;
  const isTouchScreen = useMediaQuery('(pointer:coarse)');

  useEffect(() => {
    const getScreenshots = async () => {
      try {
        const fetchedScreenshots = await getItemDetail(id, 'screenshots');
        setScreenshots(fetchedScreenshots.results);
      } catch (error) {
        console.log(error);
      }
    };

    item?.short_screenshots ? setScreenshots(item.short_screenshots) : getScreenshots();
  }, []);

  if (!screenshots) return;
  else
    return (
      <Box
        sx={{ position: 'relative', height: 'auto' }}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <Box
          sx={{
            boxShadow: isHovered
              ? `0 2.5rem 2.3rem 0.1rem ${theme.palette.text.primary}`
              : `0 0 0.1rem ${theme.palette.text.secondary}`,
            scale: isHovered ? '1.01' : '1',
            borderRadius: '0.6rem',
            position: 'relative',
            color: 'text.primary',
            overflow: 'hidden',
            transition: 'scale 50ms, box-shadow 50ms',
          }}
        >
          <CardSlider images={screenshots} name={name} isHovered={isHovered} />
          <Box
            sx={{
              m: 1.5,
              display: 'flex',
              position: 'relative',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box onClick={() => navigate(`/games/${slug}`)} sx={{ cursor: 'pointer' }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                {item.name}
              </Typography>
              <FlexBox sx={{ mt: 2, mb: 1 }}>
                <Platforms platforms={parent_platforms} />
                <Box
                  sx={{
                    backgroundColor: item.metacritic > 60 ? 'success.light' : 'warning.light',
                    color: 'white',
                    borderRadius: '0.25rem',
                    lineHeight: '1.3',
                    padding: '0 0.19rem',
                    fontWeight: 600,
                  }}
                >
                  {item.metacritic}
                </Box>
              </FlexBox>
            </Box>
            <ParallelogramTag text={`$ ${price}`} style={{ maxWidth: '3rem' }} />
            <Box
              sx={{ display: 'flex', alignItems: 'center', color: 'text.disabled', justifyContent: 'space-between  ' }}
            >
              <AddRemoveWishListButton item={item} />
              {isTouchScreen && (
                <Box
                  sx={{ py: 1, width: '100%', textAlign: 'center', textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsHovered(!isHovered);
                  }}
                >
                  {isHovered ? 'Show less': 'Show more'}
                </Box>
              )}
              <AddRemoveCartButton item={item} />
            </Box>
          </Box>
        </Box>
        {isHovered && <ItemCardDescription released={released} genres={genres} rating={rating} isHovered={isHovered} />}
      </Box>
    );
};
