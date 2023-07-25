import { React, useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';

export const CardSlider = ({ images, name, isHovered }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        background: `no-repeat center/80% url("${activeImage.image}")`,
        backgroundSize: 'cover',
        scale: isHovered ? '1' : '1.02',
        zIndex: 21,
      }}
    >
      {isHovered ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            display: 'flex',
            flex: '1 1 0px',
            flexBasis: '1',
          }}
        >
          {images.map((image) => {
            return (
              <Box
                key={image.id}
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'end',
                  selfAlign: 'center',
                  paddingBottom: '.5rem',
                  zIndex: isHovered ? 23 : 21,
                }}
                onMouseOver={() => setActiveImage(image)}
              >
                <Box
                  sx={{
                    width: '50%',
                    height: '0.15rem',
                    borderRadius: '0.1rem',
                    backgroundColor: image.id === activeImage.id ? 'grey.50' : 'grey.600',
                    boxShadow: `0 0 0.2rem 0.01rem ${theme.palette.text.secondary}`,
                    transition: 'all 500ms',
                  }}
                ></Box>
              </Box>
            );
          })}
        </Box>
      ) : null}
      <img
        src={images[0].image}
        alt={name}
        style={{
          opacity: isHovered ? 0 : 1,
          zIndex: isHovered ? 20 : 22,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          display: 'block',
          width: '100%',
        }}
      />
    </Box>
  );
};
