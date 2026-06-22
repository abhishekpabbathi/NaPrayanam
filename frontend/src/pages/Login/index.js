import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login(){
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");

  const handleLogin=async(e)=>{
    e.preventDefault(); setError(""); setSuccess("");
    if(!email||!password){setError("Please fill email and password");return}
    try{
      setLoading(true);
      const res=await axios.post("https://naprayanam.onrender.com/api/auth/login",{email,password});
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));
      setSuccess("Login successful. Redirecting...");
      setTimeout(()=>navigate("/dashboard"),800);
    }catch(err){setError(err?.response?.data?.message||"Login failed")}
    setLoading(false);
  }

  return <div className="center fade">
    <div className="card" style={authCard}>
      <h1 style={authTitle}>Welcome Back</h1>
      <p style={muted}>Access your travel command center</p>
      {error&&<div style={err}>{error}</div>}
      {success&&<div style={ok}>{success}</div>}
      <form onSubmit={handleLogin} style={{display:"grid",gap:16}}>
        <input className="input" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button className="btn blue">{loading?"Logging in...":"Login"}</button>
      </form>
      <p style={{textAlign:"center",marginTop:22}}>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  </div>
}

const authCard={width:"min(480px,92%)",padding:42};
const authTitle={fontSize:42,textAlign:"center",margin:"0 0 10px"};
const muted={textAlign:"center",color:"#64748b",fontSize:18,marginBottom:26};
const err={background:"#fee2e2",color:"#b91c1c",padding:14,borderRadius:14,marginBottom:16,fontWeight:700};
const ok={background:"#dcfce7",color:"#166534",padding:14,borderRadius:14,marginBottom:16,fontWeight:700};
