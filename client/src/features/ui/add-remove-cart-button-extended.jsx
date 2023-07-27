import { useState } from 'react';
import { Box, useTheme, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { addToCart } from '../../entities/cart/model/slice';
import { useDispatch } from 'react-redux';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { blueGrey } from '@mui/material/colors';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blueGrey[50]),
  border: 'none',
  height: '100%',
  minWidth: '2rem',
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    border: 'none',
    borderColor: blueGrey[300],
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '&>div': {
    padding: '7px 7px',
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '&>label': {
    top: '2px',
  },
}));

const StyledInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: 'text.primary',
    border: 'none',
    outline: 'none',
    '& > div': {
      border: 'none',
    },
    '& fieldset': {
      border: 'none',
      borderRadius: '.2rem',
    },
    '&:hover fieldset': {},
    '&.Mui-focused fieldset': {},
    '& input': {
      textAlign: 'center',
      width: 30,
      padding: '7px',
    },
  },
});

export const AddRemoveCartButtonExtended = ({ item, screenshot }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [quantity, setQuantity] = useState(1);
  const [platform, setPlatform] = useState(item.platforms[0].platform.name);

  const handlePlatformChange = (event) => {
    setPlatform(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  const handleQuantityBlur = (event) => {
    if (event.target.value < 1) setQuantity(1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        alignContent: 'center',
        gap: 2,
        width: '100%',
        maxWidth: '28rem',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ height: '2rem', border: `0.01rem solid ${theme.palette.text.disabled}`, borderRadius: '0.3rem' }}>
        <StyledButton onClick={() => setQuantity((prev) => prev - 1)} disabled={quantity < 2}>
          <RemoveIcon fontSize="small" sx={{ color: 'text.primary' }} />
        </StyledButton>
        <StyledInput size="small" onChange={handleQuantityChange} onBlur={handleQuantityBlur} value={quantity} />
        <StyledButton onClick={() => setQuantity((prev) => prev + 1)} sx={{ color: 'text.primary' }}>
          <AddIcon fontSize="small" sx={{ color: 'text.primary' }} />
        </StyledButton>
      </Box>

      <StyledFormControl sx={{ width: '100%', maxWidth: '10rem' }}>
        <InputLabel id="demo-simple-select-label">Platforms</InputLabel>
        <StyledSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={platform}
          label="Platforms"
          onChange={handlePlatformChange}
        >
          {item.platforms.map((platform) => (
            <MenuItem key={platform.platform.id} value={platform.platform.name}>
              {platform.platform.name}
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>

      <Button
        variant="contained"
        endIcon={<AddShoppingCartTwoToneIcon />}
        onClick={() =>
          dispatch(
            addToCart({
              id: item.id,
              name: item.name,
              quantity: quantity,
              platforms: item.platforms,
              platform: platform,
              screenshot: screenshot,
              price: item.price,
            })
          )
        }
        color="success"
      >
        ADD TO CART
      </Button>
    </Box>
  );
};
