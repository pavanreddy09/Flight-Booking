import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { push, ref } from "firebase/database";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseDatabase } from "../../../backend/firebaseHandler";
import './AddFlightStyle.css';


const AddFlight = () => {
     
    const navigate = useNavigate();

    const [addFlightInputs,setAddFlightInputs] = useState({
        airline:"",
        date:"",
        departureTime:"",
        arrivalTime:"",
        boarding:"",
        destination:"",
        cost:0
    })

    const [isLoading,setIsLoading] = useState(false);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setAddFlightInputs({
            ...addFlightInputs,
            [name]:value
        })
    }

    const handleClick = async () => {
        if(!addFlightInputs.airline){
            alert("Please select the airline");
            return;
        }
        if(!addFlightInputs.date){
            alert("Please enter date");
            return;
        }
        if(!addFlightInputs.departureTime){
            alert("Please enter departure time");
            return;
        }
        if(!addFlightInputs.arrivalTime){
            alert("Please enter arrival time");
            return;
        }
        if(!addFlightInputs.boarding){
            alert("Please enter boarding point");
            return;
        }
        if(!addFlightInputs.destination){
            alert("Please enter destination");
            return;
        }
        if(!addFlightInputs.cost){
            alert("Please enter the cost");
            return;
        }
        setIsLoading(true);
        const fref = ref(firebaseDatabase,'All-Flights');
        await push(fref,addFlightInputs);
        alert("Added Succesfully!");
        setIsLoading(false);
        navigate("/dashboard");

    }

    return (
        <div className="add-flight-commponent">
            <div className="flight-inputs">
           <FormControl fullWidth sx={{marginTop:'25px'}}>
                <InputLabel id="demo-simple-select-label">Airline</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Airline"
                name="airline"
                value={addFlightInputs.airline}
                onChange={handleChange}
                >
                <MenuItem value={'Indigo'}>Indigo</MenuItem>
                <MenuItem value={'Emirates'}>Emirates</MenuItem>
                <MenuItem value={'Air India'}>Air India</MenuItem>
                <MenuItem value={'Air Frane'}>Air Frane</MenuItem>
                <MenuItem value={'Delta Air Lines'}>Delta Air Lines</MenuItem>

                </Select>
            </FormControl>
            <TextField sx={{marginTop:'25px'}} id="outlined-basic" variant="outlined" type={'date'} name="date" value={addFlightInputs.date} onChange={handleChange}/>
            <TextField sx={{marginTop:'25px'}} id="outlined-basic" label="Departure Time" variant="outlined" name="departureTime" type={'time'} value={addFlightInputs.departureTime} onChange={handleChange}/>
            <TextField sx={{marginTop:'25px'}} id="outlined-basic" label="Arrival Time" variant="outlined" type={'time'} name="arrivalTime" value={addFlightInputs.arrivalTime} onChange={handleChange}/>
            <TextField sx={{marginTop:'25px'}} id="outlined-basic" label="Boarding Point" variant="outlined" name="boarding" value={addFlightInputs.boarding} onChange={handleChange}/>
            <TextField sx={{marginTop:'25px'}} id="outlined-basic" label="Destination" variant="outlined" name="destination" value={addFlightInputs.destination} onChange={handleChange}/>
            <TextField sx={{marginTop:'25px'}} id="outlined-basic" label="Cost" variant="outlined" type={'number'} name="cost" value={addFlightInputs.cost} onChange={handleChange}/>
            <Button variant="contained" sx={{marginTop:'25px'}} onClick={handleClick} disabled={isLoading}>Submit</Button>
            </div>
        </div>
    )
}

export default AddFlight;