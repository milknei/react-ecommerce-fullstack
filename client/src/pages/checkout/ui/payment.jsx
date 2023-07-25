import { Box, Typography, Container } from '@mui/material';
import TextField from '@mui/material/TextField';

export const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {
  return (
    <Container>
      {/* CONTACT INFO */}
      <Box>
        <Typography sx={{ mb: 1 }} fontSize="18px">
          Contact Info
        </Typography>
        <TextField
          fullWidth
          type="text"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ gridColumn: 'span 4', mb: 1 }}
        />
        <TextField
          fullWidth
          type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          helperText={touched.phoneNumber && errors.phoneNumber}
          sx={{ gridColumn: 'span 4' }}
        />
      </Box>
    </Container>
  );
};
