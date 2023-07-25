import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyledIconButton, shades } from '@shared/index';
import { Box, Typography, useTheme, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addToCart } from '@entities/cart/index';
import { useNavigate } from 'react-router-dom';

export const ItemCardCompact = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();
  const { category, price, name, image } = item;
  
};
