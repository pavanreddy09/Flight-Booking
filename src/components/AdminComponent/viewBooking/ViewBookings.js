import { Button } from "@mui/material";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firebaseDatabase } from "../../../backend/firebaseHandler";
import './ViewBookingsStyle.css';


const ViewBookings = () => {
    const navigate = useNavigate();
    const [passengers,setPassengers] = useState([]);
    const params = useParams();
    useEffect(() => {
       const fref = ref(firebaseDatabase,`Bookings/${params.id}`)
       onValue(fref,(snapshot) => {
        setPassengers(Object.values(snapshot.val()));
       })
    },[])
    
    return(
        <div>
            <header>
                <Button variant="contained" onClick={() => navigate("/dashboard")}>Back</Button>
            </header>
            <div className="user-list">
                {!passengers ? <div>No Bookings</div> : 
                passengers.map((user,index) => {
                    return (
                        <div className="user">
                            <div key={index}>
                        <p>Name</p>
                        <h2>{user.name}</h2>
                        </div>
                        <div>
                            <p>Gender</p>
                            <h2>{user.gender}</h2>
                        </div>
                        <div>
                            <p>Phone Number</p>
                            <h2>{user.phno}</h2>
                        </div>
                        <div>
                            <p>Email Id</p>
                            <h2>{user.email}</h2>
                        </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ViewBookings;