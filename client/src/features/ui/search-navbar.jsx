import { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import { searchItem } from '@entities/item/index';
import { AddRemoveCartButton } from '@features/index';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '40ch',
      },
    },
    [theme.breakpoints.up('md')]: {
      width: '15ch',
      '&:focus': {
        width: '30ch',
      },
    },
    [theme.breakpoints.up('lg')]: {
      width: '20ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

export const SearchNavbar = () => {
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsLoading(true);

    try {
      const response = await searchItem(newValue, 5, 1);
      setItems(response.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ position: 'relative', my: 'auto', flexGrow: { xs: 1, sm: 0 } }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          inputRef={inputRef}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={value}
          onChange={(e) => handleChange(e)}
          onFocus={() => setFocus(true)}
          onBlur={() => {setFocus(false); setValue('')}}
        />
      </Search>
      {focus && value.length > 0 && (
        <Box
          sx={{
            width: '100%',
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: 'background.paper',
            opacity: 1,
          }}
          onPointerDown={(e) => e.preventDefault()}
        >
          {isLoading ? (
            <LinearProgress color="inherit" />
          ) : (
            <List sx={{ width: '100%', zIndex: 10001 }}>
              {items.length > 0 ? (
                items.map((item) => (
                  <ListItem key={item.id} secondaryAction={<AddRemoveCartButton item={item} size="medium" />}>
                    <ListItemAvatar>
                      <Avatar src={item.background_image} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ '&:hover': { cursor: 'pointer' } }}
                      primary={item.name}
                      onClick={(e) => {
                        navigate(`/games/${item.slug}`);
                      }}
                      secondary={item.genres.map((genre) => genre.name).join(', ')}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body1" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
                  No game found
                </Typography>
              )}
            </List>
          )}
        </Box>
      )}
    </Box>
  );
};
