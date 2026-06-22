import { Link } from "react-router-dom";

export default function Home(){
  return(
    <div className="fade">
      <section style={hero}>
        <div style={badge}>🚀 Production-ready MERN travel platform</div>
        <h1 style={title}>Plan smarter.<br/>Travel better.</h1>
        <p style={sub}>Create complete travel plans with itinerary, budget, hotel suggestions, packing list and PDF export in one premium dashboard.</p>
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <Link to="/create-trip"><button className="btn primary">Start Planning</button></Link>
          <Link to="/login"><button className="btn">Login</button></Link>
        </div>
      </section>

      <section style={{padding:"60px 6%"}}>
        <div className="grid">
          <Feature icon="🤖" title="Smart Itinerary" text="Day-wise travel plan generated instantly."/>
          <Feature icon="💰" title="Budget Intelligence" text="Clear estimates for transport, food and stay."/>
          <Feature icon="🏨" title="Hotel Suggestions" text="Stay options based on trip budget."/>
          <Feature icon="📄" title="PDF Export" text="Download and share complete trip plans."/>
        </div>
      </section>
    </div>
  )
}

function Feature({icon,title,text}){
  return <div className="card" style={feature}><div style={iconStyle}>{icon}</div><h2>{title}</h2><p style={{color:"#64748b",lineHeight:1.6}}>{text}</p></div>
}

const hero={minHeight:"78vh",background:"radial-gradient(circle at top right,#2563eb,#111827 45%,#030712)",color:"white",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"50px 20px"};
const badge={background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",padding:"10px 18px",borderRadius:999,fontWeight:800,marginBottom:24};
const title={fontSize:"clamp(48px,8vw,92px)",lineHeight:1,margin:"0 0 24px",letterSpacing:"-3px"};
const sub={fontSize:22,maxWidth:820,lineHeight:1.6,color:"#dbeafe",marginBottom:36};
const feature={padding:34,textAlign:"center",transition:".25s"};
const iconStyle={fontSize:44,marginBottom:12};
