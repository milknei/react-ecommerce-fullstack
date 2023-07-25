import styled from '@emotion/styled';
import { Box } from '@mui/material';

const FlexBoxContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const FlexBox = ({ children, sx }) => {
  return <FlexBoxContainer sx={sx}>{children}</FlexBoxContainer>;
};
  