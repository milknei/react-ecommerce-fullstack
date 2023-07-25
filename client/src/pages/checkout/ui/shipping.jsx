import React from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { AddressForm } from './address-form';

export const Shipping = ({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Box>
        <Typography sx={{ mb: 1 }} variant='h5'>
          Billing Information
        </Typography>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              value={values.shippingAddress.isSameAddress}
              onChange={() => setFieldValue('shippingAddress.isSameAddress', !values.shippingAddress.isSameAddress)}
            />
          }
          label="Same for Shipping Address"
        />
      </Box>
      {!values.shippingAddress.isSameAddress && (
        <Box>
          <Typography sx={{ mb: 1 }} variant='h5'>
            Shipping Information
          </Typography>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};
