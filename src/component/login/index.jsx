import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import "./index.css"
import {auth} from "../../FirebaseConfig.js";
import {Alert, Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography} from "@mui/material";
import * as Yup from "yup";
import {Formik} from "formik";

const Index = () => {
  const theme = useTheme();
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const scriptedRef = useRef(true); // To prevent memory leak on unmounted component

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (values, { setErrors, setStatus, setSubmitting }) => {
    const { email, password } = values;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user) {
        throw new Error('User not found'); // Throw error if user not found
      }

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setAlert({ severity: 'success', message: 'Login successful!' });
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          handlesendRoute();
        }, 300); // 300ms delay before navigating
      }

      if (scriptedRef.current) {
        setStatus({ success: true });
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      if (scriptedRef.current) {
        setAlert({ severity: 'error', message: error.message });
        setStatus({ success: false });
        setErrors({ submit: error.message });
        setSubmitting(false);
      }
    }
  };

  const handlesendRoute = () => {
    navigate('/dashboard'); // Replace with your desired route after login
  };

  return (
    <>
      this works
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }} className='background'>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item sx={{ mb: 3 }}>
                  {/* <Link to="#">
                    <img src={Logo} width="90px" height="90px" alt="" />
                    </Link> */}
                </Grid>
                <Grid item xs={12} className='d-flex justify-content-center align-items-center'>
                  <div style={{ maxWidth: "450px", width: "100%" }} className='p-4 rounded-4 shadow bg-white'>
                    <Grid item xs={12} className='pt-3 pb-3'>
                      <Grid container alignItems="center" justifyContent="center">
                        <Grid item>
                          <Stack alignItems="center" justifyContent="center" spacing={1} className=''>
                            <p className='text-center h1'>
                              Hi, Welcome Back
                            </p>
                            <p className='text-center h5'>
                              Enter your credentials to continue
                            </p>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Formik
                      initialValues={{
                        email: 'admin@example.com',
                        password: '123456',
                        submit: null
                      }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                        password: Yup.string().max(255).required('Password is required')
                      })}
                      onSubmit={handleLogin}
                    >
                      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit} className='pt-4'>
                          <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }} >
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-email-login"
                              type="email"
                              value={values.email}
                              name="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Email Address / Username"
                              inputProps={{}}
                            />
                            {touched.email && errors.email && (
                              <FormHelperText error id="standard-weight-helper-text-email-login">
                                {errors.email}
                              </FormHelperText>
                            )}
                          </FormControl>
                          <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput, marginTop: "15px" }} >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-password-login"
                              type={showPassword ? 'text' : 'password'}
                              value={values.password}
                              name="password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    size="large"
                                  >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                              }
                              label="Password"
                              inputProps={{}}
                            />
                            {touched.password && errors.password && (
                              <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.password}
                              </FormHelperText>
                            )}
                          </FormControl>
                          <Stack direction="row" alignItems="center" className='flex-column flex-sm-row justify-content-start justify-content-sm-between ' spacing={1}>
                            <FormControlLabel
                              control={
                                <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                              }
                              label="Remember me"
                            />
                            {/* <Typography variant="subtitle1" className='forgot' sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                              Forgot Password?
                            </Typography> */}
                          </Stack>
                          {/* {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                              <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                          )} */}
                          {alert && (
                            <Box sx={{ mt: 2 }}>
                              <Alert severity={alert.severity}>{alert.message}</Alert>
                            </Box>
                          )}
                          <Box sx={{ mt: 2 }} className="pt-3">
                            <Button disableElevation disabled={isSubmitting || loading} fullWidth size="large" type="submit" className='signin-btn'>
                              {loading ? <CircularProgress size={24} /> : 'Sign in'}
                            </Button>
                          </Box>
                          <Grid item xs={12} className='mt-3'>
                            <Grid item container direction="column" alignItems="center" xs={12}>
                              <Typography component={Link} to="/sign-up" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                <span className='text-dark'>Don&apos;t have an account?</span> Create an Account
                              </Typography>
                            </Grid>
                          </Grid>
                        </form>
                      )}
                    </Formik>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}></Grid>
      </Grid>
    </>
  )
}

export default Index
