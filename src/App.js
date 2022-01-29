import './App.css';
import { Routes, Route, NavLink, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import ProtectedRoutes from './Routes/ProtectedRoutes';

// components
import Home from './Pages/Home/Home';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import Profile from './Pages/Profile/Profile';

function App() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const prevRoute = useLocation();

  return (
    <div className="App">
      <nav className="nav">
        <NavLink to="/">Home</NavLink>
        {currentUser && <NavLink to="/profile">Profile</NavLink>}
        {!currentUser && <NavLink to="/signin">Sign In</NavLink>}
        {!currentUser && <NavLink to="/signup">Sign Up</NavLink>}
        {currentUser && <NavLink to="/logout" onClick={async (e) => {
          e.preventDefault();
          logout();
        }}>Logout</NavLink>}
        <button onClick={() => navigate(-1)}>Go back</button>
        <button onClick={() => navigate(+1)}>Go forward</button>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signin" element={currentUser ? <Navigate to="/profile" /> : <SignIn />} />
        <Route path="/signup" element={currentUser ? <Navigate to="/profile" /> : <SignUp />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes >
    </div >
  );
}

export default App;
