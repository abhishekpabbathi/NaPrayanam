import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={nav}>
      <Link to="/" style={brand}>✈️ NaPrayanam</Link>
      <div style={links}>
        <Link style={link} to="/">Home</Link>
        <Link style={link} to="/dashboard">Dashboard</Link>
        <Link style={link} to="/create-trip">Create Trip</Link>
        <Link style={link} to="/my-trips">My Trips</Link>
        {!token ? <Link style={link} to="/login">Login</Link> : null}
        {!token ? <Link style={cta} to="/register">Register</Link> : <button style={logoutBtn} onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}

const nav={height:"78px",padding:"0 6%",background:"#070b14",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:99,boxShadow:"0 10px 30px rgba(0,0,0,.2)"};
const brand={color:"white",fontSize:"28px",fontWeight:900};
const links={display:"flex",gap:"28px",alignItems:"center"};
const link={color:"#e5e7eb",fontWeight:800};
const cta={background:"white",color:"#070b14",padding:"13px 22px",borderRadius:"14px",fontWeight:900};
const logoutBtn={background:"#ef4444",color:"white",border:0,padding:"12px 18px",borderRadius:"14px",fontWeight:900,cursor:"pointer"};
