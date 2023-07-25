import { React, useEffect, useState } from 'react';
import { ItemListDetailed } from '@widgets/item-list-detailed';
import Container from '@mui/material/Container';
import { getItemsBase } from '@entities/item/index';

export const GamesPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await getItemsBase();
        setItems(fetchedData.results);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, []);

  return (
    <Container maxWidth="xl">
      <ItemListDetailed items={items} />
    </Container>
  );
};
