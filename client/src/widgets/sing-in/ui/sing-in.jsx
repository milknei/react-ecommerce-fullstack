import * as React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ButtonMain } from '@shared/index';
import { setLoggedIn } from '@entities/user/index';
import { useNavigate } from 'react-router-dom';
import { getWishListByEmail, setWishList } from '@entities/wishList/index';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = Yup.object().shape({
  identifier: Yup.string().required('Identifier is required').max(50, 'Identifier can be at most 50 characters'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[!?\-_\.])(?=.*\d.*\d.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,50}$/,
      'Password can be 8 - 50 characters long and include: [A-Z], [a-z], [! ? _ - .], 3+ numbers'
    ),
});

export const SingIn = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = React.useState(false);

  const [alert, setAlert] = React.useState({ text: '', type: 'error', isOpened: false });
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({ text: '', type: 'error', isOpened: false });
  };

  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const response = await fetch(`${serverUrl}/auth/local`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: values.identifier,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (!response.ok && response.status === 400) {
          setIsLoading(false);
          setAlert({ text: data.error.message, type: 'error', isOpened: true });
          throw new Error('Identifier or password is wrong, try again.');
        }

        await dispatch(setLoggedIn({ ...data, rememberMe: values.rememberMe }));

        const fetchedWishList = await getWishListByEmail(data.user.email);
        if (fetchedWishList) dispatch(setWishList(fetchedWishList.data[0]));

        navigate(user.linkBeforeLogin);
      } catch (error) {
        setIsLoading(false);
        if (error?.response?.status === 400) {
          setAlert({ text: error.message, type: 'error', isOpened: true });
        } else {
          console.error('Error creating user:', error);
        }
      }
    },
  });

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={alert.isOpened} autoHideDuration={6000} onClose={handleCloseAlert} sx={{ zIndex: 10000 }}>
        <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: '100%' }}>
          {alert.text}
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="identifier"
              label="Email Address"
              name="identifier"
              autoComplete="identifier"
              autoFocus
              value={formik.values.identifier}
              onChange={formik.handleChange}
              error={formik.touched.identifier && Boolean(formik.errors.identifier)}
              helperText={formik.touched.identifier && formik.errors.identifier}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  color="default"
                />
              }
              label="Remember me"
            />
            <ButtonMain text="SIGN IN" type="submit" />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ color: 'text.primary' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  sx={{ color: 'text.primary' }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/registration');
                  }}
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
