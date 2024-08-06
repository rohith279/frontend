import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from '../../../src/hook/useScriptRef';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { strengthColor, strengthIndicator } from './password-strength';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {auth, db} from "../../FirebaseConfig.js";

const Index = ({ ...others }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);
    const scriptedRef = useScriptRef();
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    const handleSignUp = async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            const { fname, lname, email, password } = values;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await set(ref(db, 'users/' + user.uid), {
                uid: user.uid,
                firstName: fname,
                lastName: lname,
                email: user.email
            });

            if (!scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
                setLoading(true);
                setAlert({ severity: 'success', message: 'Sign up successful!' });
                setTimeout(() => {
                    setLoading(false);
                    navigate('/dashboard');
                }, 3000); // 3 seconds delay before navigating
            }
        } catch (err) {
            console.error("Error signing up:", err);
            if (!scriptedRef.current) {
                setStatus({ success: false });
                if (err.code === 'auth/email-already-in-use') {
                    setErrors({ submit: 'Email is already in use' }); // Set specific error message for email already in use
                    setAlert({ severity: 'error', message: 'Email is already in use' });
                } else {
                    setErrors({ submit: err.message });
                    setAlert({ severity: 'error', message: err.message });
                }
                setSubmitting(false);
            }
        }
    };


    return (
        <>
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
                                                    <p className='text-center h1'>
                                                        Sign up
                                                    </p>
                                                    <p className='text-center h5'>
                                                        Enter your credentials to continue
                                                    </p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Formik
                                            initialValues={{
                                                fname: '',
                                                lname: '',
                                                email: '',
                                                password: '',
                                                submit: null
                                            }}
                                            validationSchema={Yup.object().shape({
                                                fname: Yup.string().required('First Name is required'),
                                                lname: Yup.string().required('Last Name is required'),
                                                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                                password: Yup.string().max(255).required('Password is required')
                                            })}
                                            onSubmit={handleSignUp}
                                        >
                                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                                <form noValidate onSubmit={handleSubmit} {...others}>
                                                    <Grid container spacing={matchDownSM ? 0 : 2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="First Name"
                                                                margin="normal"
                                                                name="fname"
                                                                type="text"
                                                                value={values.fname}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                error={Boolean(touched.fname && errors.fname)}
                                                                helperText={touched.fname && errors.fname}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="Last Name"
                                                                margin="normal"
                                                                name="lname"
                                                                type="text"
                                                                value={values.lname}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                error={Boolean(touched.lname && errors.lname)}
                                                                helperText={touched.lname && errors.lname}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }} >
                                                        <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-email-login"
                                                            type="email"
                                                            value={values.email}
                                                            name="email"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Email Address"
                                                            inputProps={{}}
                                                        />
                                                        {touched.email && errors.email && (
                                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                                {errors.email}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>

                                                    <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput, marginTop: "10PX" }} >
                                                        <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-password-register"
                                                            type={showPassword ? 'text' : 'password'}
                                                            value={values.password}
                                                            name="password"
                                                            label="Password"
                                                            onBlur={handleBlur}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                changePassword(e.target.value);
                                                            }}
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
                                                            inputProps={{}}
                                                        />
                                                        {touched.password && errors.password && (
                                                            <FormHelperText error id="standard-weight-helper-text-password-register">
                                                                {errors.password}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>

                                                    {strength !== 0 && (
                                                        <FormControl fullWidth>
                                                            <Box sx={{ mb: 2 }}>
                                                                <Grid container spacing={2} alignItems="center">
                                                                    <Grid item>
                                                                        <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Typography variant="subtitle1" fontSize="0.75rem">
                                                                            {level?.label}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </FormControl>
                                                    )}

                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                                                                }
                                                                label={
                                                                    <Typography variant="subtitle1">
                                                                        Agree with &nbsp;
                                                                        <Typography variant="subtitle1" component={Link} to="#">
                                                                            Terms & Condition.
                                                                        </Typography>
                                                                    </Typography>
                                                                }
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    {alert && (
                                                        <Alert severity={alert.severity} sx={{ mt: 2 }}>
                                                            {alert.message}
                                                        </Alert>
                                                    )}

                                                    <Box sx={{ mt: 2 }}>
                                                        <Button
                                                            disableElevation
                                                            disabled={!checked || isSubmitting || loading}
                                                            fullWidth
                                                            size="large"
                                                            type="submit"
                                                            className='signin-btn'
                                                            startIcon={loading && <CircularProgress style={{ width: "22px", height: "22px", color: "white" }} />}
                                                        >
                                                            {loading ? '' : 'Sign up'}
                                                        </Button>
                                                    </Box>
                                                    <Grid item xs={12} className='mt-3'>
                                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                                            <Typography component={Link} to="/login" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                                            Already have an account?
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
