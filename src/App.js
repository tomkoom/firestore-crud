import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

// components
import Users from './Components/AddUsers/Users';
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import Profile from './Components/Profile/Profile';


function App() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/signin">Sign In</Link> |{" "}
        <Link to="/signup">Sign Up</Link> |{" "}
        <Link to="/logout" onClick={async (e) => {
          e.preventDefault();
          logout();
        }}>Logout</Link>
      </nav>

      <pre>Current user: {JSON.stringify(currentUser, null, 2)}</pre>

      <Routes>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      {/* <Users db={db} /> */}
    </div>
  );
}

export default App;
