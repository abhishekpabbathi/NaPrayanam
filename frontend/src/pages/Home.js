import { FaRobot, FaSuitcase, FaHotel, FaMapMarkedAlt } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg,#0f172a,#1e293b,#2563eb)",
          color: "white",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            marginBottom: "20px",
          }}
        >
          NaPrayanam
        </h1>

        <h2
          style={{
            fontSize: "1.8rem",
            marginBottom: "20px",
          }}
        >
          AI Powered Travel Planner
        </h2>

        <p
          style={{
            maxWidth: "700px",
            fontSize: "1.1rem",
            lineHeight: "1.8",
          }}
        >
          Generate intelligent itineraries, estimate budgets,
          discover hotels and organize packing lists using AI.
        </p>

        <div style={{ marginTop: "30px" }}>
          <a href="/register">
            <button
              style={{
                padding: "15px 35px",
                fontSize: "18px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Get Started
            </button>
          </a>

          <a href="/login">
            <button
              style={{
                padding: "15px 35px",
                fontSize: "18px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </a>
        </div>
      </section>

      <section
        style={{
          padding: "60px 20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        <Feature
          icon={<FaRobot size={40} />}
          title="AI Itinerary"
          text="Generate complete day-wise travel plans."
        />

        <Feature
          icon={<FaMapMarkedAlt size={40} />}
          title="Budget Planning"
          text="Get estimated costs for your journey."
        />

        <Feature
          icon={<FaHotel size={40} />}
          title="Hotel Suggestions"
          text="Discover recommended accommodations."
        />

        <Feature
          icon={<FaSuitcase size={40} />}
          title="Packing List"
          text="Never forget essential travel items."
        />
      </section>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div
      style={{
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "15px" }}>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
