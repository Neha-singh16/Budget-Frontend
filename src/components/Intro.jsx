import { Link } from "react-router-dom";

export default function IntroPage() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-6"
      style={{ backgroundColor: "#2F4156", color: "#F5EFEB" }} // Navy bg, Beige text
    >
      <div className="max-w-3xl text-center">
        <h1
          className="text-5xl font-extrabold mb-6"
          style={{
            color: "#FFFFFF",
            textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
          }} // White with subtle shadow
        >
          Welcome to{" "}
          <span style={{ color: "#567C8D" /* Teal */ }}>BudgetBuddy</span>
        </h1>

        <p
          className="text-lg md:text-xl mb-10 max-w-xl mx-auto"
          style={{ color: "#C8D9E6" }} // Sky Blue
        >
          Your personal finance companion — track expenses, set budgets, and
          save smarter. Manage your money with ease and confidence.
        </p>

        <div className="flex justify-center space-x-6">
            <Link to={"/signup"}>
          <button
            className="font-semibold px-6 py-3 rounded-lg shadow-lg transition"
            style={{
              backgroundColor: "#567C8D", // Teal
              color: "#F5EFEB", // Beige
              boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            }}
            onClick={() => alert("Redirect to Sign Up")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#2F4156")
            } // Navy on hover
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#567C8D")
            }
          >
            Sign Up
          </button>
          </Link>
          <button
            className="font-semibold px-6 py-3 rounded-lg shadow-lg transition border"
            style={{
              borderColor: "#C8D9E6", // Sky Blue border
              color: "#F5EFEB", // Beige text
              backgroundColor: "transparent",
              boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            }}
            onClick={() => alert("Redirect to Log In")}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#567C8D"; // Teal bg on hover
              e.currentTarget.style.color = "#F5EFEB"; // Beige text
              e.currentTarget.style.borderColor = "#567C8D";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#F5EFEB";
              e.currentTarget.style.borderColor = "#C8D9E6";
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
