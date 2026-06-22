import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function CreateTrip(){
  const navigate=useNavigate();
  const [form,setForm]=useState({destination:"",days:"",budgetType:"Medium",interests:[]});
  const [loading,setLoading]=useState(false);
  const interests=["Food","Adventure","Culture","Nature","Shopping","Photography"];

  const toggle=(item)=>setForm(p=>({...p,interests:p.interests.includes(item)?p.interests.filter(i=>i!==item):[...p.interests,item]}));

  const submit=async(e)=>{
    e.preventDefault();
    if(!form.destination||!form.days){alert("Please enter destination and days");return}
    try{
      setLoading(true);
      const res=await api.post("/trips",{...form,days:Number(form.days)});
      navigate(`/trip/${res.data.trip._id}`);
    }catch(err){alert(err?.response?.data?.message||"Trip creation failed")}
    setLoading(false);
  }

  return <div className="center fade">
    <form className="card" style={tripCard} onSubmit={submit}>
      <p style={eyebrow}>AI TRIP BUILDER</p>
      <h1 style={heading}>Design your next journey</h1>
      <p style={muted}>Create itinerary, budget, hotels, packing list and downloadable PDF.</p>

      <div style={two}>
        <div><label>Destination</label><input className="input" placeholder="Tokyo" value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})}/></div>
        <div><label>Days</label><input className="input" type="number" placeholder="5" value={form.days} onChange={e=>setForm({...form,days:e.target.value})}/></div>
      </div>

      <label>Budget</label>
      <div style={chips}>{["Low","Medium","High"].map(b=><button type="button" key={b} onClick={()=>setForm({...form,budgetType:b})} style={form.budgetType===b?activeChip:chip}>{b}</button>)}</div>

      <label>Interests</label>
      <div style={chips}>{interests.map(i=><button type="button" key={i} onClick={()=>toggle(i)} style={form.interests.includes(i)?activeChip:chip}>{i}</button>)}</div>

      <button className="btn blue" style={{width:"100%",marginTop:10}}>{loading?"Generating premium plan...":"Generate AI Trip"}</button>
    </form>
  </div>
}

const tripCard={width:"min(880px,94%)",padding:40};
const eyebrow={fontWeight:900,color:"#2563eb",letterSpacing:2};
const heading={fontSize:"clamp(34px,5vw,54px)",margin:"0 0 10px"};
const muted={color:"#64748b",fontSize:18,marginBottom:25};
const two={display:"grid",gridTemplateColumns:"2fr 1fr",gap:18,marginBottom:18};
const chips={display:"flex",gap:12,flexWrap:"wrap",margin:"10px 0 22px"};
const chip={border:0,borderRadius:999,padding:"12px 18px",fontWeight:800,cursor:"pointer",background:"#e8eef5"};
const activeChip={...chip,background:"#111827",color:"white"};
