import styled from "styled-components";
import {useEffect, useState} from "react";
import axios from "axios";
import Header from "../../LandingPage/Header";
import {Redirect} from 'react-router'
import {gql} from "@apollo/client";
import {useLazyQuery, useMutation} from "@apollo/client";


import {USER_SIGNIN_MUTATION} from "../quries";
import {defineArguments} from "graphql/type/definition";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel, IconButton, InputAdornment,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Stack,
    TextField
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

//styled-components-------

const Wrapper = styled.div`
  *{padding: 0;
  margin: 0;
  box-sizing: border-box;}
  &>div{
    max-width: 617.5px;
    height: 100%;
    margin: auto;
    min-height: 250px;
  }
  &>div>div{
    width: 100%;
  }
  &>div>div>h1{
    text-align: center;
    font-size: 48px;
    line-height: 56px;
    font-weight: lighter;
    color: #666666;
    margin-top: 56px;
    margin-bottom: 42px;
  }
  input{
    outline: none;
  }
  input:focus{
    border-color: #3f81c7;
  }
    input{
      &::placeholder{
        color: #333;
      }
    }
    button{
      color: #ffffff;
      background-color: #3f81c7;
      cursor: pointer;
      &:hover{
        background-color: #478bd3;
      }
      }

    input, button{
      padding-left: 10px;
      height: 45px;
      border: 1px solid #e7e9eb;
      box-sizing: border-box;
      width: 100%;
      border-radius: 3px;
      padding-right: 6px;
    }
  `

const FormCont = styled.div`
  height: 100%;
  min-height: 275px;
  border: 1px solid #eee;
  `
const Left = styled.div`
  width: 50%;
  box-sizing: border-box;
  float: left;
  position: relative;
  padding: 28px;
  min-height: 237px;
  border-right: 1px solid #eee;
`
const LeftEl = styled.div`
  margin-top: 21px;
  &>p{
    color: #666;
    font-size: 16px;
    cursor: pointer;
  }
  &:last-child{
    text-align: center;
    line-height: 21px;
  }
`

const Right = styled.div`
cursor: pointer;
width: 50%;
box-sizing: border-box;
float: left;
position: relative;
padding: 28px;

  &>div{
    height: 45px;
    border: 1px solid #e7e9eb;
    box-sizing: border-box;
    width: 100%;
    border-radius: 3px;
    padding-right: 6px;
    color: #333;
    display: flex;
  }
  &>div>div:last-child{
    font-size: 16px;
    line-height: 40px;
  }
  &>div>div:first-child{
    line-height: 40px;
    padding: 0 13px;
    font-weight: bold;
    font-size: 22px;
  }
`

const Space = styled.div`
clear: both;
width: 100%;
background-color: black;
`
const FormEnd = styled.div`  
    font-size: 14px;
    line-height: 21px;
    margin: 21px auto 140px 28px;
    &>p{
      padding: 0;
      margin: 0;
      color: #666666;
      font-size: 14px;
      line-height: 21px;
    }
    &>p>a{
      color: #3078ca;
      text-decoration: none;
    }
`

const Footer = styled.div`
margin-top: 220px;
height: 140px;
  &>div{
    max-width: 988px;
    padding-top: 42px;
    text-shadow: 0 1px 0 #fff;
    font-size: 12px;
    line-height: 21px;
    text-align: center;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
  }
  .FooterLinks{
    margin-right: 14px;
    margin-left: 14px;
    text-decoration: none;
    color: #999;
  }
`


//graphql query


function LoginForm() {
    const [jobs, setJobs] = useState(false);
    const [values, setValues] = useState({
        password: '',
        email: '',
        showPassword: false,
    });
    const [userSignIn, {loading, error, data}] = useMutation(USER_SIGNIN_MUTATION, {
        onCompleted: data1 => {
            console.log(data1);
            localStorage.setItem('token', data1.signIn.token);
            localStorage.setItem('user', JSON.stringify(data1.signIn.user));
            setJobs(true);
        }
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const isLoggedIn = () => {
        const user = JSON.parse(localStorage.getItem("user"))
        console.log("user",user)
        if (user) {
            setJobs(true);
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        isLoggedIn()
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    if (jobs === true) {
        return <Redirect to='/jobs'/>;
    }
    const handleLogin = async () => {

        // await userSignIn({
        //     variables: {
        //         email: values.email,
        //         password: values.password
        //     }
        // });
        // console.log("error", error)
        // console.log("data", data)

        try {
            console.log(values)
            await userSignIn({
                variables: {
                    email: values.email,
                    password: values.password
                }
            });

        } catch (err) {
            console.log("err", err);
            console.log("error", error)
        }
    };


    return (
        <>
            <Header/>
            <Stack border={"red"} padding={"1rem"} alignItems={"center"} spacing={2}>
                <h1>Login</h1>
                <Stack width={"30vw"} alignContent={"center"} spacing={1.5}>
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
                    <Button size={"small"} variant={"contained"} onClick={handleLogin}>Login</Button>
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

export default LoginForm;


