import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      setMessage(
        "✅ Registration successful. Please login."
      );

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("❌ Registration failed");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Register (Step 1)</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>

      <button type="submit">Register</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default Register;
