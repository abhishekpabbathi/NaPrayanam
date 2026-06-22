import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register(){
  const navigate=useNavigate();
  const [form,setForm]=useState({name:"",email:"",password:"",confirmPassword:""});
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");

  const submit=async(e)=>{
    e.preventDefault(); setError(""); setSuccess("");
    if(!form.name||!form.email||!form.password||!form.confirmPassword){setError("Please fill all fields");return}
    if(!form.email.includes("@")){setError("Enter valid email address");return}
    if(form.password.length<6){setError("Password must be at least 6 characters");return}
    if(form.password!==form.confirmPassword){setError("Passwords do not match");return}
    try{
      setLoading(true);
      await axios.post("https://naprayanam.onrender.com/api/auth/register",{name:form.name,email:form.email,password:form.password});
      setSuccess("Account created successfully. Redirecting...");
      setTimeout(()=>navigate("/login"),1000);
    }catch(err){setError(err?.response?.data?.message||"Registration failed")}
    setLoading(false);
  }

  return <div className="center fade">
    <div className="card" style={authCard}>
      <h1 style={authTitle}>Create Account 🚀</h1>
      <p style={muted}>Join NaPrayanam and plan premium trips</p>
      {error&&<div style={err}>{error}</div>}
      {success&&<div style={ok}>{success}</div>}
      <form onSubmit={submit} style={{display:"grid",gap:15}}>
        <input className="input" placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="input" placeholder="Email Address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
        <input className="input" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={e=>setForm({...form,confirmPassword:e.target.value})}/>
        <button className="btn blue">{loading?"Creating...":"Create Account"}</button>
      </form>
      <p style={{textAlign:"center",marginTop:22}}>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  </div>
}

const authCard={width:"min(520px,92%)",padding:42};
const authTitle={fontSize:40,textAlign:"center",margin:"0 0 10px"};
const muted={textAlign:"center",color:"#64748b",fontSize:18,marginBottom:26};
const err={background:"#fee2e2",color:"#b91c1c",padding:14,borderRadius:14,marginBottom:16,fontWeight:700};
const ok={background:"#dcfce7",color:"#166534",padding:14,borderRadius:14,marginBottom:16,fontWeight:700};
