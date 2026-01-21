import Login from "./Login";
import Register from "./Register";
import Doctors from "./Doctors";
import DoctorDashboard from "./DoctorDashboard";

const App = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 Not logged in
  if (!token || !user) {
    return (
      <>
        <Register />
        <hr />
        <Login />
      </>
    );
  }

  // 🔓 Logged in
  if (user.role === "doctor") {
    return <DoctorDashboard />;
  }

  return <Doctors />;
};
  
export default App;
