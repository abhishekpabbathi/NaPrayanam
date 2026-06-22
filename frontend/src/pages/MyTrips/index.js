import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

export default function MyTrips(){
  const [trips,setTrips]=useState([]);
  const [loading,setLoading]=useState(true);

  const fetchTrips=async()=>{
    try{const res=await api.get("/trips");setTrips(res.data)}
    catch(err){alert(err?.response?.data?.message||"Failed to fetch trips")}
    setLoading(false);
  }

  const deleteTrip=async(id)=>{
    if(!window.confirm("Delete this trip?"))return;
    try{await api.delete(`/trips/${id}`);setTrips(trips.filter(t=>t._id!==id))}
    catch{alert("Delete failed")}
  }

  useEffect(()=>{fetchTrips()},[]);

  if(loading)return <div className="loader">Loading trips...</div>;

  return <div className="page fade">
    <div style={top}>
      <div><p style={eyebrow}>YOUR JOURNEYS</p><h1 style={heading}>My Trips ✈️</h1></div>
      <Link to="/create-trip"><button className="btn primary">+ Create Trip</button></Link>
    </div>

    {trips.length===0?(
      <div className="center" style={{minHeight:"50vh"}}>
        <div className="card" style={empty}>
          <h2 style={{fontSize:36}}>No trips yet</h2>
          <p style={muted}>Create your first premium AI travel plan.</p>
          <Link to="/create-trip"><button className="btn blue">Create Trip</button></Link>
        </div>
      </div>
    ):(
      <div className="grid">
        {trips.map(trip=><div className="card" key={trip._id} style={tripCard}>
          <div style={city}>{trip.destination?.charAt(0).toUpperCase()}</div>
          <h2>{trip.destination}</h2>
          <p>📅 {trip.days} Days</p>
          <p>💰 {trip.budgetType} Budget</p>
          <p>🎯 {trip.interests?.join(", ")||"General Travel"}</p>
          <div style={{display:"flex",gap:12,marginTop:20}}>
            <Link to={`/trip/${trip._id}`}><button className="btn blue">View Trip</button></Link>
            <button className="btn danger" onClick={()=>deleteTrip(trip._id)}>Delete</button>
          </div>
        </div>)}
      </div>
    )}
  </div>
}

const top={display:"flex",alignItems:"center",justifyContent:"space-between",gap:20,flexWrap:"wrap"};
const eyebrow={fontWeight:900,color:"#2563eb",letterSpacing:2};
const heading={fontSize:"clamp(40px,6vw,64px)",margin:"0 0 24px"};
const muted={color:"#64748b",fontSize:18};
const empty={padding:50,textAlign:"center",width:"min(650px,94%)"};
const tripCard={padding:30,transition:".25s"};
const city={width:58,height:58,borderRadius:18,background:"#111827",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:900};
