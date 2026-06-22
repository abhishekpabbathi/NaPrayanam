import { Link } from "react-router-dom";

export default function Dashboard(){
  const user=JSON.parse(localStorage.getItem("user")||"{}");
  return <div className="page fade">
    <div style={dashHero}>
      <div>
        <p style={eyebrow}>TRAVEL COMMAND CENTER</p>
        <h1 style={heading}>Welcome back, {user.name || "Traveler"} 👋</h1>
        <p style={muted}>Manage journeys, budgets, destinations and trip plans from one clean dashboard.</p>
      </div>
      <Link to="/create-trip"><button className="btn primary">+ Create New Trip</button></Link>
    </div>

    <div className="grid">
      <Stat icon="✈️" title="Trips Planned" value="12"/>
      <Stat icon="🌍" title="Countries" value="8"/>
      <Stat icon="📅" title="Upcoming" value="4"/>
      <Stat icon="💰" title="Budget Saved" value="₹25K"/>
    </div>

    <div className="card" style={panel}>
      <h2>Quick Actions</h2>
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        <Link to="/create-trip"><button className="btn blue">Create Trip</button></Link>
        <Link to="/my-trips"><button className="btn">View My Trips</button></Link>
      </div>
    </div>
  </div>
}

function Stat({icon,title,value}){return <div className="card" style={stat}><div style={{fontSize:42}}>{icon}</div><p style={muted}>{title}</p><h2 style={{fontSize:42,margin:0}}>{value}</h2></div>}
const dashHero={display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,marginBottom:28,flexWrap:"wrap"};
const eyebrow={fontWeight:900,color:"#2563eb",letterSpacing:2};
const heading={fontSize:"clamp(36px,5vw,60px)",margin:"0 0 12px",letterSpacing:"-2px"};
const muted={color:"#64748b",fontSize:18};
const stat={padding:30,minHeight:190};
const panel={padding:30,marginTop:26};
