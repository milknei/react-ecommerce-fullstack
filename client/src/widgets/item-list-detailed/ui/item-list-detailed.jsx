import { React, useEffect } from 'react';
// import Masonry from '@mui/lab/Masonry';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { ItemCardDetailed } from '@entities/item/index';
import { LoadingProgress } from '@shared';
import { Box, Typography } from '@mui/material';

export const ItemListDetailed = ({ items, error, areItemsLoading }) => {
  if (error) {
    console.log(error);
    return (
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        No game was found
      </Typography>
    );
  }

  if (items.length && !areItemsLoading)
    return (
      <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 450: 2, 700: 2, 800: 3, 1200: 4 }} style={{ width: '100%' }}>
        <Masonry gutter="1rem">
          {items.map((item, id) => (
            <ItemCardDetailed key={item.id + '-' + item.slug + id} item={item} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    );

  if (!items.length && !areItemsLoading)
    return (
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        No game was found
      </Typography>
    );

  return <LoadingProgress />;
};
