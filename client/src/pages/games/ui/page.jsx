import { React, useEffect, useState } from 'react';
import { ItemListDetailed } from '@widgets/item-list-detailed';
import Container from '@mui/material/Container';
import { getItemsBase, getFilteredItems, getItemsByUrl } from '@entities/item/index';
import { Sidebar } from '@widgets/sidebar/index';
import { LoadingProgress } from '@shared';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography, Box, useTheme } from '@mui/material';
import ScrollToTop from 'react-scroll-to-top';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const GamesPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNextLoading, setIsNextLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);
  const [page, setPage] = useState(1);
  const [nextPageError, setNextPageError] = useState(null);
  const [areItemsLoading, setAreItemsLoading] = useState(false);
  const [filters, setFilters] = useState([]);

  const theme = useTheme();

  const getNextItems = async () => {
    setIsNextLoading(true);
    setError(null);

    try {
      const newItems = await getItemsByUrl(nextUrl);
      console.log(nextUrl);
      console.log(newItems);
      setItems((prevItems) => [...prevItems, ...newItems.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(error);
      setNextPageError(error);
    } finally {
      setIsNextLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedItems = await getItemsBase();
        setItems(fetchedItems.results);
        setNextUrl(fetchedItems.next);

        const parentPlatforms = await getItemsBase('platforms/lists/parents', 20);
        const genres = await getItemsBase('genres', 20);
        const platforms = await getItemsBase('platforms', 20);
        const creators = await getItemsBase('creators', 100);
        const developers = await getItemsBase('developers', 20);
        const publishers = await getItemsBase('publishers', 20);

        const filters = [
          { name: 'platforms', items: platforms.results },
          { name: 'genres', items: genres.results },
          { name: 'parent_platforms', items: parentPlatforms.results },
          { name: 'creators', items: creators.results },
          { name: 'developers', items: developers.results },
          { name: 'publishers', items: publishers.results },
        ];
        setFilters(filters);

        setAreItemsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setError(null);
        setIsLoading(false);
      }
    };
    setAreItemsLoading(true);
    getData();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 10 < document.documentElement.offsetHeight ||
      isNextLoading
    ) {
      return;
    }
    getNextItems();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isNextLoading]);

  const submitHelper = async (appliedFilters, searchFilter, ordering) => {
    setAreItemsLoading(true);

    try {
      const response = await getFilteredItems(appliedFilters, searchFilter, ordering);
      setNextUrl(response.next);
      setItems(response.results);
      setAreItemsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  if (error)
    return (
      <Typography variant="h3" align="center">
        Something went wrong on the server :/
      </Typography>
    );

  if (isLoading) return <LoadingProgress />;
  else
    return (
      <Container
        maxWidth="xxl"
        sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 0, sm: 2, md: 3 } }}
      >
        <Sidebar filters={filters} submitHelper={submitHelper} />
        <ScrollToTop
          smooth
          style={{
            borderRadius: '50%',
            left: '40px',
            width: '50px',
            height: '50px',
            backgroundColor: theme.palette.action.active,
  
          }}
          className='no-highlight'
          top='400'
          component={
            <KeyboardArrowUpIcon
              sx={{ position: 'relative', top: '2px', fontSize: '2rem', color: 'background.paper' }}
            />
          }
        />
        <Box sx={{ pt: 2, width: '100%', pr: '0 !important' }}>
          <ItemListDetailed items={items} areItemsLoading={areItemsLoading} />
          {isNextLoading && (
            <Box align="center" sx={{ py: 1.5 }}>
              <CircularProgress sx={{ mx: 'auto', color: 'grey' }} />
            </Box>
          )}
          {error && <p>Error: {error.message}</p>}
        </Box>
      </Container>
    );
};
