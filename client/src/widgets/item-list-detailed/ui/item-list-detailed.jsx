import { React } from 'react';
import Masonry from '@mui/lab/Masonry';
import { ItemCardDetailed } from '@entities/item/index';
import { LoadingProgress } from '@shared';

export const ItemListDetailed = ({ items, error }) => {
  if (error) {
    console.log(error);
    return;
  }

  if (items)
    return (
      <Masonry columns={{ sm: 2, md: 3 }} defaultHeight={450} spacing={3} sx={{ m: 'auto' }}>
        {items.map((item) => (
          <ItemCardDetailed key={item.id} item={item} />
        ))}
      </Masonry>
    );
  else return <LoadingProgress />;
};
