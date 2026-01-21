import { useState } from "react";
import axios from "axios";
import socket from "./socket";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password, role }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // socket connect AFTER login
      socket.connect();
      socket.emit("join", res.data.user.id);

      setMessage("✅ Login successful");

      if (res.data.user.role === "doctor") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (error) {
      setMessage("❌ Invalid login details");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Login (Step 2)</h2>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        required
      />

      <button type="submit">Login</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;
