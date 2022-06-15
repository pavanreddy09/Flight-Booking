import { Button } from "@mui/material";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseDatabase } from "../../../backend/firebaseHandler";
import './flightDashboardStyle.css';

const AdminDashBoard = () => {
    const navigate = useNavigate();
    const [flightList,setFlightList] = useState([]);
    const [ids,setIds] = useState([]);
    useEffect(() => {
       const fref = ref(firebaseDatabase,'All-Flights')
       onValue(fref,(snapshot) => {
           setFlightList(Object.values(snapshot.val()));
           setIds(Object.keys(snapshot.val()));
       },{onlyOnce:true})
    },[])
    return (
        <div>
          <header>
            <h1>Dashboard</h1>
            <Button variant="contained" onClick={() => navigate("/add-flight") }>Add Flight</Button>
          </header>
          <div className="flights-list">
            {flightList.map((flight,index) => {
                return (
                       <div key={ids[index]} className="flights">
                        <div>
                        <p>Airline</p>
                        <h2>{flight.airline}</h2>
                        </div>
                        <div>
                            <p>Date</p>
                            <h2>{flight.date}</h2>
                        </div>
                        <div>
                            <p>Departure Time</p>
                            {flight.departureTime[0] + flight.departureTime[1] >= 12 ? <h2>{flight.departureTime} PM</h2>:<h2>{flight.departureTime} AM</h2>}
                        </div>
                        <div>
                            <p>Arrival Time</p>
                            {flight.arrivalTime[0] + flight.arrivalTime[1] >= 12 ? <h2>{flight.arrivalTime} PM</h2>:<h2>{flight.arrivalTime} AM</h2>}
                        </div>
                        <div>
                            <p>Boarding Point</p>
                            <h2>{flight.boarding}</h2>
                        </div>
                        <div>
                            <p>Destination</p>
                            <h2>{flight.destination}</h2>
                        </div>
                        <div>
                            <p>Cost</p>
                            <h2>{flight.cost}</h2>
                        </div>
                        <div>
                            <Button variant="contained" onClick={() => navigate(`/view-booking/${ids[index]}`)}>View Bookings</Button>
                        </div>
                       </div>
                )
            })}
          </div>
        </div>
    )
}


export default AdminDashBoard;