import * as React from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { useFormik } from 'formik';
import { setLoggedIn } from '@entities/user/index';
import { postWishList } from '@entities/wishList/index';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        GAME STASH
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const SignUp = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = React.useState(false);

  const [alert, setAlert] = React.useState({ text: '', type: 'error', isOpened: false });
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({ text: '', type: 'error', isOpened: false });
  };

  const validationSchema = yup.object({
    username: yup.string().required('Username is required').max(12, 'Username must be at most 12 characters'),
    email: yup
      .string()
      .required('Email is required')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,50}$/i, 'Invalid email address'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[!?\-_\.])(?=.*\d.*\d.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
        'Password must be at least 8 characters long and include: [A-Z], [a-z], [! ? _ - .], 3+ numbers'
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      isRemembered: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const response = await fetch(`${serverUrl}/auth/local/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (!response.ok && response.status === 400) {
          setIsLoading(false);
          setAlert({ text: data.error.message, type: 'error', isOpened: true });
          throw new Error('User already exists. Check your email or username');
        }

        await dispatch(setLoggedIn({ ...data }));
        await postWishList(data.user.email);
        setAlert({ text: 'Your account was created', type: 'success', isOpened: true });

        setTimeout(() => {
          navigate(user.linkBeforeLogin);
        }, 2000);
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

  const handleSubmit = formik.handleSubmit;

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
      <Container component="main" maxWidth="xs" sx={{ minHeight: 'calc(100vh - 3.75rem)' }}>
        <CssBaseline />
        <Box sx={{ paddingTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.username && formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="default" name="notify" id="notify" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <ButtonMain text="SIGN UP" type="submit" />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  sx={{ color: 'text.primary' }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/login');
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
};
