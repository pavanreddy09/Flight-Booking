import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import './LoginPageStyle.css';
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../backend/firebaseHandler";

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginInputs,setLoginInputs] = useState({
        email:"",
        password:""
    })
    useEffect(() => {
       onAuthStateChanged(firebaseAuth,(user) => {
        if(user){
            navigate("/")
        }
       })
    },[])
    const [isLoading,setIsLoading] = useState(false);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setLoginInputs({
            ...loginInputs,
            [name]:value
        })
    }
       
    const handleClick = async () => {
        try {
        setIsLoading(true)
        await signInWithEmailAndPassword(firebaseAuth,loginInputs.email,loginInputs.password)
        navigate("/")
        }catch(err){
            alert(err)
        }

    }

    return (
        <div className="login-page-container">
        <div className="login-page">
          <div className="login-page-form">
          <h1>Welcome</h1>
          <p>Please Enter The Details</p>
          <TextField sx={{marginTop:'25px'}} id="outlined-basic" label="Email ID" variant="outlined" type={'email'} name='email' value={loginInputs.email} onChange={handleChange} />
          <TextField sx={{marginTop:'25px'}} id="outlined-basic" label="Password" variant="outlined" type={'password'} name='password' value={loginInputs.password} onChange={handleChange}/>
          <Button sx={{margin:'25px 0',height:'45px'}} variant="contained" onClick={handleClick} disabled={isLoading}>Log In</Button>
          <div>
          <p>Don't Have an Account? <Link to='/register'>Register</Link></p>
          </div>
        </div>
        </div>
      </div>
    )
}

export default LoginPage;