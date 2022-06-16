import { TextField,Button, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {firebaseAuth,firebaseDatabase} from '../../../backend/firebaseHandler';
import './RegisterPageStyle.css';
import { ref, set } from "firebase/database";


const RegisterPage = () => {
    const navigate = useNavigate("/");
    const [registerInputs,setRegisterInputs] = useState({
        name:"",
        phno:"",
        gender:"",
        email:"",
        password:"",
        confirmpassword:""
    })

    // useEffect(()=>{
    //     onAuthStateChanged(firebaseAuth,(user) => {
    //         if(user){
    //             navigate("/")
    //         }
    //     })
    //    },[])

    const [isLoading,setIsLoading] = useState(false);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setRegisterInputs({
            ...registerInputs,
            [name]:value
        })
    }

    const handleClick = async () => {
        if(!registerInputs.name){
            alert("Please Enter the Name");
            return;
        }
        if(!registerInputs.phno){
            alert("Please Enter the Phone Number");
            return;
        }
        if(!registerInputs.gender){
            alert("Please Select the Gender");
            return;
        }
        if(!registerInputs.email){
            alert("Please Enter the Email ID");
            return;
        }
        if(!registerInputs.password){
            alert("Please Enter the Password");
            return;
        }
        if(!registerInputs.confirmpassword){
            alert("Please Enter Confirmation Password");
            return;
        }
        if(registerInputs.password == registerInputs.confirmpassword){
            try{
                setIsLoading(true);
                await createUserWithEmailAndPassword(firebaseAuth,registerInputs.email,registerInputs.password);
                onAuthStateChanged(firebaseAuth, async (user) => {
                    if(user){
                        const uid = user.uid;
                        const fref = ref(firebaseDatabase,`User-Details/${uid}`)
                        await set(fref,{
                            name:registerInputs.name,
                            phno:registerInputs.phno,
                            gender:registerInputs.gender,
                            email:registerInputs.email
                        })

                        navigate("/login")
                    }
                })
            }catch(err){
                alert(err);
            }
            setIsLoading(false);
        }else{
            alert("confirmation password does not matched to password");
        }
    }

    return (
        <div className="Register-page-container">
        <div className="Register-page">
         <div className="Register-page-form">
             <h1>Register</h1>
             <p>Please Enter The Details</p>
             <TextField sx={{marginTop:'25px'}} id="outlined-basic" label="Name" variant="outlined" name='name' value={registerInputs.name} onChange={handleChange}/>
             <TextField sx={{marginTop:'25px'}} id="outlined-basic" label="Phone Number" variant="outlined" type={'number'} name='phno' value={registerInputs.phno} onChange={handleChange}/>
             <FormControl fullWidth sx={{marginTop:'25px'}}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={registerInputs.gender}
                label="Gender"
                name="gender"
                onChange={handleChange}
                >
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
                <MenuItem value={'Others'}>Others</MenuItem>
                </Select>
            </FormControl>
             <TextField sx={{marginTop:'25px'}} id="outlined-basic" label="Email ID" variant="outlined" type={'email'} name='email' value={registerInputs.email} onChange={handleChange}/>
             <TextField sx={{marginTop:'25px'}} id="outlined-basic" label="Password" variant="outlined" type={'password'} name='password' value={registerInputs.password} onChange={handleChange}/>
             <TextField sx={{marginTop:'25px'}} id="outlined-basic" label="Confirm Password" variant="outlined" type={'password'} name='confirmpassword' value={registerInputs.confirmpassword} onChange={handleChange}/>
             <Button sx={{margin:'25px 0',height:'45px'}} variant="contained" onClick={handleClick} disabled={isLoading}>Register</Button>
             <div>
                 {/* <p>Don't Have an Account? <Link to='/register'>Register</Link></p> */}
             </div>
         </div>
         </div>
      </div>
    )
}


export default RegisterPage;
