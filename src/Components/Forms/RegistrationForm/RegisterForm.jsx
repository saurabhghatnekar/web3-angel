import styled from "styled-components";
import {useState} from "react";
import axios from "axios";
import Header from "../../LandingPage/Header";
import {useHistory} from "react-router-dom";
import {Redirect} from "react-router";
import {useMutation} from "@apollo/client";
import {USER_SIGNUP_MUTATION} from "../quries";
import { ethers } from 'ethers';
import NFT from './artifacts/contracts/NFT.sol/NFT.json';

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

const nftAddress = "0x2b4fe5Adc3382d48f472c6B9DF1DAC047495fe63";

console.log(NFT);
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
    // for transfer operation
    const[to,setTo]=useState('');
    const[ens,setEnsTo]=useState('');
    const [contract, setContract]=useState('undefined');
    const [signer,setSigner] = useState('');
    const [provider,setProvider] = useState('');
    const [accounts,setAccounts] = useState([]);
    const [images, setImages]=useState ([]);
    const [idNft, setIdNft]=useState ([]);


    async function connecter (){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(nftAddress, NFT.abi, provider)
      setContract(contract);
      setSigner(signer);
      setProvider(provider);
      console.log(contract);
      console.log(signer);
      const { ethereum } = window
      		await ethereum.enable()
      		if (!ethereum) {
      			console.log("Make sure you have Metamask installed!")
      			return
      		} else {
      			console.log("Wallet exists! We're ready to go!")
      		}
      		const accounts = await ethereum.request({ method: "eth_accounts" })
      		if (accounts.length !== 0) {
      			const account = accounts[0]
            setAccounts(accounts);
      			console.log("Found an authorized account: ", account)
      		} else {
      			console.log("No authorized account found")
      		}
    }

    async function viewNfts(){
      let owned = []
      let uris=[]
      let id = (await contract.connect(signer)._tokenIds());
      console.log(id);
      for (let i =1;i<=id.toNumber();i++){
        let owner = (await contract.connect(signer).ownerOf(i));
        let currAcc = ethers.utils.getAddress(accounts[0])
        console.log(owner);

        if (owner.toString() == currAcc){
          owned.push(i)
          uris.push(await contract.connect(signer).tokenURI(i))
        }
      }
      setImages(uris)
    }

    async function mintNft (){
      console.log('r');
      await contract.connect(signer).createToken("https://media.istockphoto.com/vectors/welcome-to-the-team-hand-drawn-lettering-logo-icon-in-trendy-golden-vector-id1302839569?k=20&m=1302839569&s=612x612&w=0&h=rialOaZ0RMu1QsHjfUbZ0Q_d4LeAbIPz5V1SWpHi-yY=")
      .then(data=>{
        let pa = document.getElementById('status')
        pa.innerHTML ='minted'
      })
      let tokenIdcurr = await contract.connect(signer)._tokenIds();
      setIdNft(tokenIdcurr.toNumber())
      let pass = false;
      provider.getBalance(accounts[0]).then((balance) => {
       const balanceInEth = ethers.utils.formatEther(balance)
       if (balanceInEth > 0.00003){
         pass = true;
       }
       else{
         console.log('balance less than 0.0003 eth');
       }
      })
      if (pass ==true) {
        await contract.connect(signer).createToken("https://media.istockphoto.com/vectors/welcome-to-the-team-hand-drawn-lettering-logo-icon-in-trendy-golden-vector-id1302839569?k=20&m=1302839569&s=612x612&w=0&h=rialOaZ0RMu1QsHjfUbZ0Q_d4LeAbIPz5V1SWpHi-yY=")
      }
    }
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
            <Button  onClick={connecter}>Connect</Button>
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
                <Button  onClick={mintNft}>MINT</Button>
                <p id ='status'></p>
                <Button onClick = {viewNfts}>ViewNFTs </Button>

                <div>
                {
                images.map((item,index) => (
                  <img src ={item} height ="300"/>
                ))}
                </div>
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
