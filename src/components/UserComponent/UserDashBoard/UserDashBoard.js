import { Button, TextField } from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, firebaseDatabase } from "../../../backend/firebaseHandler";
import './UserDashBoardStyle.css';

const UserDashBoard = () => {
  const navigate = useNavigate();
  const [flightList,setFlightList] = useState([]);
  const [ids,setIds] = useState([]);
  const [date, setDate] = useState(null);
  const [uid, setUid] = useState();
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUid(user.uid);
      }else{
        navigate("/login")
      }
    });
    const fref = ref(firebaseDatabase,'All-Flights')
    onValue(fref,(snapshot) => {
        setFlightList(Object.values(snapshot.val()));
        setIds(Object.keys(snapshot.val()));
    },{onlyOnce:true})
  },[])

  const handleClick = (e) => {
      const fbref = ref(firebaseDatabase,`User-Details/${uid}`)
      const id = e.target.id;
      onValue(fbref, async (snapshot) => {
      const userref = ref(firebaseDatabase,`Bookings/${id}/${uid}`)
      await set(userref,snapshot.val())
      alert("Booked!")
      })
  }

  const handleLogout = () => {
    signOut(firebaseAuth);
  }

    return (
        <div>
          <header>
            <h1>Welcome</h1>
            <Button variant="contained" onClick={handleLogout}>Log Out</Button>
          </header>
          <div>
            <div className="date-select">
            <h3>Select Date</h3>
            <TextField sx={{width:"600px",marginLeft:"20px"}} id="outlined-basic" variant="outlined" type={'date'} value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
          <div className="flights-list">
            {flightList.map((flight,index) => {
               if(date == flight.date){
                return(
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
                            <Button variant="contained" onClick={handleClick} id={ids[index]}>Book</Button>
                        </div>
                       </div>
                )
               }
            })}
            </div>
          </div>
        </div>
    )
}

export default UserDashBoard;