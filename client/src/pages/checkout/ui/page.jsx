import { useSelector } from 'react-redux';
import { Box, Stepper, Step, StepLabel, Container } from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import { Shipping } from './shipping';
import { Payment } from './payment';
import { ButtonMain, LoadingProgress } from '@shared/index';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import * as yup from 'yup';
import Cookies from 'js-cookie';

const initialValues = {
  billingAddress: {
    firstName: '',
    lastName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: '',
    lastName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  email: Cookies.get('email') || '',
  phoneNumber: '',
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup
        .string()
        .required('required')
        .matches(/^[A-Za-z]+$/, 'First Name must contain only alphabetic characters')
        .max(50, 'First Name must be at most 50 characters'),
      lastName: yup
        .string()
        .required('required')
        .matches(/^[A-Za-z]+$/, 'Last Name must contain only alphabetic characters')
        .max(50, 'Last Name must be at most 50 characters'),
      country: yup
        .string()
        .required('required')
        .matches(/^[A-Za-z]+$/, 'Country must contain only alphabetic characters'),
      street1: yup.string(),
      street2: yup.string(),
      city: yup.string().matches(/^[A-Za-z]+$/, 'City must contain only alphabetic characters'),
      state: yup.string().matches(/^[A-Za-z]+$/, 'State must contain only alphabetic characters'),
      zipCode: yup.string().matches(/^\d{1,7}(?:[-\s]\d{1,4})?$/, 'Invalid zip code'),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when('isSameAddress', {
        is: false,
        then: () =>
          yup
            .string()
            .required('required')
            .matches(/^[A-Za-z]+$/, 'First Name must contain only alphabetic characters')
            .max(50, 'First Name must be at most 50 characters'),
      }),
      lastName: yup.string().when('isSameAddress', {
        is: false,
        then: () =>
          yup
            .string()
            .required('required')
            .matches(/^[A-Za-z]+$/, 'Last Name must contain only alphabetic characters')
            .max(50, 'Last Name must be at most 50 characters'),
      }),
      country: yup.string().when('isSameAddress', {
        is: false,
        then: () =>
          yup
            .string()
            .required('required')
            .matches(/^[A-Za-z]+$/, 'Country must contain only alphabetic characters'),
      }),
      street1: yup.string(),
      street2: yup.string(),
      city: yup.string().matches(/^[A-Za-z]+$/, 'City must contain only alphabetic characters'),
      state: yup.string().matches(/^[A-Za-z]+$/, 'State must contain only alphabetic characters'),
      zipCode: yup.string().matches(/^\d{1,7}(?:[-\s]\d{1,4})?$/, 'Invalid zip code'),
    }),
  }),
  yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address'),
    phoneNumber: yup.string().matches(/^\+[1-9]\d{1,14}$/, 'Phone number is not valid'),
  }),
];

export const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const stripePromise = loadStripe(stripePublishableKey);

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue('shippingAddress', {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  const makePayment = async (values) => {
    const stripe = await stripePromise;

    const requestBody = {
      fullName: [values.billingAddress.firstName, values.billingAddress.lastName].join(' '),
      email: values.email,
      userEmail: Cookies.get('email') || values.email,
      items: cart.map(({ id, platform, quantity, price, name }) => ({ id, platform, quantity, price, name })),
    };
    try {
      const response = await fetch(`${serverUrl}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const session = await response.json();
      const stripeResult = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (stripeResult.error) {
        alert(stripeResult.error.message);
      }
    } catch (error) {
      alert('Payment service is unavailable right now');
      navigate('/');
    }
  };

  return (
    <Container maxWidth="xl">
      <Stepper activeStep={activeStep} sx={{ my: 1, mx: 0 }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      {isFirstStep || isSecondStep ? (
        <Box>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema[activeStep]}
          >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                {isFirstStep && (
                  <Shipping
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  ></Shipping>
                )}
                {isSecondStep && (
                  <Payment
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  ></Payment>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                  {!isFirstStep && (
                    <ButtonMain
                      text="BACK"
                      sx={{
                        '&:hover': { color: 'text.primary' },
                        backgroundColor: 'text.primary',
                        borderRadius: '0.2rem',
                        color: 'background.paper',
                        fontWeight: 'bold',
                        letterSpacing: '0.0625rem',
                        fontSize: '.95em',
                        padding: '1.0625rem 2.5rem',
                        margin: '1.25rem 0',
                      }}
                      onClick={() => setActiveStep(activeStep - 1)}
                    />
                  )}
                  <ButtonMain type="submit" text={!isSecondStep ? 'NEXT' : 'PLACE ORDER'} />
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      ) : (
        <LoadingProgress />
      )}
    </Container>
  );
};
