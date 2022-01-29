import styled from "styled-components";
import {useState} from "react";
import axios from "axios";
import Header from "../../LandingPage/Header";
import {useHistory} from "react-router-dom";
import {Redirect} from "react-router";
import {useMutation} from "@apollo/client";
import {USER_SIGNUP_MUTATION} from "../quries";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel, IconButton,
    InputAdornment, InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Stack,
    TextField
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Footer from "../../LandingPage/Footer";


function RegisterForm() {
    const [values, setValues] = useState({
        role: '',
        password: '',
        confirmPassword:'',
        firstName: '',
        lastName: '',
        email: '',
        showPassword: false,
    });
    const history = useHistory()

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [signup, {loading, error, data}] = useMutation(USER_SIGNUP_MUTATION, {
        onCompleted(data) {
            console.log(data)
            // setJobs(true);
            // localStorage.setItem("token", data.signup)
            history.push("/login")
        }
    })

    const postUser = async () => {
        console.log(values)
        await signup({
            variables: {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                role: values.role
            }
        })
    }

    const handleSignUp = () => {
        if (values.password.length < 8) {
            alert("Password is too short");
            return;
        }
        if (values.password !== values.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (!values.role) {
            alert("Select a role");
            return;
        }
        postUser();

    };

    return (
        <>
            <Header/>
            <Stack border={"red"} padding={"1rem"} alignItems={"center"} spacing={2}>
                <h1>Sign UP</h1>
                <Stack width={"30vw"} alignContent={"center"} spacing={1.5}>
                    <TextField id="firstName" label="First Name" variant="outlined"
                               type="text"
                               name="firstName"
                               key="firstName"
                               placeholder="First Name"
                               required
                               onChange={handleChange("firstName")}
                    />

                    <TextField id="lastName" label="Last Name" variant="outlined"
                               type="text"
                               name="lastName"
                               key="lastName"
                               placeholder="Last Name"
                               required
                               onChange={handleChange("lastName")}
                    />

                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">I am
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={handleChange("role")}
                            >
                                <FormControlLabel defaultChecked value="candidate" control={<Radio/>} label="Looking for a job"/>
                                <FormControlLabel value="recruiter" control={<Radio/>} label="Recruiter"/>

                            </RadioGroup>
                        </FormLabel>
                    </FormControl>

                    <TextField id="email" label="Email" variant="outlined"
                               type="text"
                               name="email"
                               key="email"
                               placeholder="Email"
                               required
                               onChange={handleChange("email")}
                    />

                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirm-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            label="Confirm Password"
                        />
                    </FormControl>
                    <Button size={"small"} variant={"contained"} onClick={handleSignUp}>Sign Up</Button>
                </Stack>
            </Stack>

            <Footer>
                <div>
                    <div>
                        <a href="/" className="FooterLinks">Help</a>
                        <a href="/" className="FooterLinks">Blog</a>
                        <a href="/" className="FooterLinks">Twiter</a>
                        <a href="/" className="FooterLinks">Terms & Risks</a>
                        <a href="/" className="FooterLinks">Privacy Policy & Cookies</a>
                        <a href="/" className="FooterLinks">Unsubscribe</a>
                        <a href="/" className="FooterLinks">Press</a>
                    </div>
                </div>
            </Footer>
        </>
    );
}

export default RegisterForm;
