import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || ""}/api/auth/login`,
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);

      alert("Login Successful");

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen px-4"
      style={{ background: "#FAF6EE", fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

        .catalog-serif { font-family: 'Fraunces', Georgia, serif; }
        .catalog-mono { font-family: 'JetBrains Mono', 'Courier New', monospace; }

        .ticket-card {
          position: relative;
          background: #FFFFFF;
          border: 1.5px solid #1C2541;
        }
        .ticket-card::before,
        .ticket-card::after {
          content: "";
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #FAF6EE;
          border: 1.5px solid #1C2541;
        }
        .ticket-card::before { left: -12px; }
        .ticket-card::after { right: -12px; }

        .field-input {
          width: 100%;
          border: 1.5px solid #E7E0CF;
          border-radius: 8px;
          padding: 12px 14px;
          background: #FAF6EE;
          color: #1C2541;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .field-input:focus {
          outline: none;
          border-color: #C79A46;
          background: #FFFFFF;
        }
        .field-input::placeholder { color: #A39C8A; }

        .cta-btn {
          background: #1C2541;
          color: #FAF6EE;
          transition: background 0.15s ease;
        }
        .cta-btn:hover {
          background: #B5533C;
        }
      `}</style>

      <div className="w-full max-w-md ticket-card rounded-2xl px-8 pt-8 pb-8">
        {/* Perforation divider */}
        <div
          className="absolute left-0 right-0 top-16 border-t border-dashed"
          style={{ borderColor: "#C9C2AE" }}
        ></div>

        {/* Eyebrow */}
        <p
          className="catalog-mono text-xs tracking-[0.25em] uppercase text-center mb-3"
          style={{ color: "#B5533C" }}
        >
           &mdash; Member Access
        </p>

        {/* Heading */}
        <h1
          className="catalog-serif text-3xl font-semibold text-center mb-1"
          style={{ color: "#1C2541" }}
        >
          Welcome back
        </h1>

        <p className="text-center text-sm mb-8" style={{ color: "#6B6455" }}>
          Enter your details to sign in
        </p>

        {/* Email */}
        <div className="mb-4">
          <label
            className="block mb-2 text-xs font-semibold tracking-wide uppercase"
            style={{ color: "#1C2541" }}
          >
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field-input"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            className="block mb-2 text-xs font-semibold tracking-wide uppercase"
            style={{ color: "#1C2541" }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="field-input"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="cta-btn w-full py-3 rounded-lg font-semibold text-base"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-center mt-6 text-sm" style={{ color: "#6B6455" }}>
          Don't have an account?{" "}
          <Link
            to="/"
            className="font-semibold"
            style={{ color: "#B5533C" }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;