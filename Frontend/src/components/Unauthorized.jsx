import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
    <div style={{
      textAlign: "center",
      padding: "3rem",
      backgroundColor: "bg-gray-900",
      border: "2px dashed #ffc107",
      borderRadius: "15px",
      margin: "4rem auto",
      height: "400px",
    //   width: "100%",
      maxWidth: "1000px",
      fontFamily: "'Comic Sans MS', cursive, sans-serif"
    }}>
      <h1 style={{ fontSize: "3rem", color: "#dc3545" }}>🚫 Oops!</h1>
      <h2 style={{ color: "#856404" }}>You're not allowed here! 👮‍♂️</h2>
      <p style={{ fontSize: "1.2rem", color: "#6c757d" }}>
        Looks like you're trying to sneak into a VIP area... 🕵️‍♀️<br />
        But don’t worry, we’ve sent the cookies to distract the guards. 🍪😄
      </p>
      <button
        onClick={goHome}
        style={{
          marginTop: "2rem",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: "#ffc107",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          color: "#212529"
        }}
      >
        🏠 Take Me Back Home
      </button>
    </div>
    </div>
  );
};

export default Unauthorized;
