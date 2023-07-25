import { React, useState, useEffect } from 'react';
import { Box, Typography, useTheme, Container, Chip, Divider, Button } from '@mui/material';
import { StyledIconButton, FlexBox, ParallelogramTag } from '@shared/index';
import { useNavigate, useParams } from 'react-router-dom';
import { AddRemoveWishListButtonExtended, AddRemoveCartButtonExtended } from '@features/index';
import ImageGallery from 'react-image-gallery';
import { getItem, getItemDetail, Platforms } from '@entities/item/index';
import { LoadingProgress } from '@shared';
import './styles.scss';

export const ItemPage = () => {
  const [item, setItem] = useState(null);
  const [screenshots, setScreenshots] = useState(null);
  const [error, setError] = useState(null);
  const { itemSlug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedItem = await getItem(itemSlug);
        const fetchedScreenshots = await getItemDetail(fetchedItem.id, 'screenshots');

        let screenshots = fetchedScreenshots.results.map((screenshot) => ({
          original: screenshot.image,
          thumbnail: screenshot.image,
        }));

        setItem(fetchedItem);
        setScreenshots(screenshots);
        setError(null);
        document.title = `GAME STASH: ${fetchedItem.name}`;
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, [itemSlug]);
  if (error) {
    console.log(error);
    return <div>AAAA</div>;
  }

  if (item?.detail === "Not found.") return <Typography>Item not found</Typography>;

  if (item && screenshots)
    return (
      <>
        {/* <Box
          sx={{
            position: 'absolute',
            left: 0,
            width: '100vw',
            height: '100%',
            zIndex: 0,
            backgroundColor: 'background.default',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <img
              style={{
                width: '100%',
                zIndex: 0,
                opacity: 1,
              }}
              src={item.background_image}
              alt=""
            />
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'asolute',
                top: 0,
                left: 0,
                background: `linear-gradient(0deg, ${theme.palette.background.default} 9%, rgba(0,0,0,1) 82%)`,
                zIndex: 2,
              }}
            ></Box>
          </Box>
        </Box> */}
        <Box sx={{ width: '100%', color: 'text.primary', zIndex: 2 }}>
          <Typography variant="h2" component="h1" sx={{ pb: 2, fontWeight: 600 }}>
            {item.name}
          </Typography>
          <Divider variant="middle" sx={{ mb: 2 }} />
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1 1 auto',
                alignSelf: 'stretch',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <FlexBox sx={{ gap: 2, mb: 2 }}>
                  {item?.released && (
                    <Typography sx={{ textTransform: 'uppercase' }} variant="body1">
                      <Typography variant="body1" component="span" sx={{ mr: 1, fontWeight: 600 }}>
                        RELEASE DATE:
                      </Typography>
                      {item.released}
                    </Typography>
                  )}
                  <Platforms platforms={item.parent_platforms} sx={{ gap: 1 }} />
                </FlexBox>
                {item?.genres && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" component="span" sx={{ mr: 2, fontWeight: 600 }}>
                      GENRES:
                    </Typography>
                    {item.genres.map((genre) => (
                      <Chip
                        key={genre.id}
                        label={genre.name}
                        sx={{ fontSize: '0.8rem', mr: 2 }}
                        onClick={() => console.log()}
                      />
                    ))}
                  </Box>
                )}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" component="span" sx={{ mr: 2, fontWeight: 600 }}>
                    METACRITIC SCORE:
                  </Typography>
                  <Chip
                    label={item.metacritic}
                    sx={{
                      fontSize: '0.8rem',
                      mr: 2,
                      fontWeight: 600,
                      color: item.metacritic > 70 ? 'success.dark' : 'warning.dark',
                    }}
                    onClick={() => window.open(item.metacritic_url, '_blank')}
                  />
                </Box>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" component="span" sx={{ mr: 2, fontWeight: 600 }}>
                    AVERAGE PLAYTIME:
                  </Typography>
                  <Chip
                    label={item.playtime + ' hours'}
                    variant="outlined"
                    sx={{
                      fontSize: '0.8rem',
                      mr: 2,
                      fontWeight: 500,
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 3,
                  flexWrap: 'wrap',
                }}
              >
                <AddRemoveWishListButtonExtended item={item} />
                <Typography variant="h3" component="span" sx={{ mr: 2, fontWeight: 600 }}>
                  Price: ${item.price}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', md: '25rem', lg: '35rem', xl: '60rem', xxl: '80rem' },
              }}
            >
              <ImageGallery
                items={screenshots}
                thumbnailPosition={'bottom'}
                useTranslate3D={true}
                showPlayButton={false}
                autoPlay={true}
                slideInterval={5000}
                originalHeight={300}
              />
            </Box>
            <AddRemoveCartButtonExtended item={item} screenshot={screenshots[0]?.original} />
          </Box>
        </Box>
      </>
    );
  else return <LoadingProgress />;
};
