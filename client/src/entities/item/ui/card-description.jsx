import React from 'react';
import { Box, Link, Divider, Rating, Collapse, useTheme } from '@mui/material';
import { FlexBox } from '@shared/index';

export const ItemCardDescription = ({ released, genres, rating, isHovered }) => {
  const date = new Date(released);
  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative'}}>
      <Collapse
        in={isHovered}
        direction="right"
        sx={{
          width: '100%',
          position: 'absolute',
          top: '-0.5rem',
          backgroundColor: 'background.default',
          transition: 'all 70ms, scale 50ms !important',
          borderRadius: '0 0 0.6rem 0.6rem',
          scale: isHovered ? '1.01' : '1',
          boxShadow: `0 2.5rem 2.3rem 0.1rem ${theme.palette.text.secondary}`,
          zIndex: 20,
        }}
      >
        <Box sx={{ m: 1.5 }}>
          <FlexBox sx={{ padding: '.5rem 0' }}>
            <div>Release date:</div>
            <div>{`${date.toDateString().slice(3)}`}</div>
          </FlexBox>
          <Divider variant="middle" />
          <FlexBox sx={{ gap: 1, padding: '.5rem 0' }}>
            <div>Genres:</div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: 1 }}>
              {genres.map((genre) => {
                return (
                  <Link
                    component="button"
                    variant="body"
                    sx={{ color: 'text.primary' }}
                    key={genre.id}
                    onClick={() => {}}
                  >
                    {genre.name}
                  </Link>
                );
              })}
            </Box>
          </FlexBox>
          <Divider variant="middle" />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <Rating name="half-rating-read" defaultValue={rating} precision={0.1} readOnly />
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};
