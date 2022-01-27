import './App.css';
import Users from './Components/AddUsers/Users';
import { db } from "./firebase";
import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from './Context/AuthContext';

function App() {
  const { currentUser } = useAuth();

  console.log(currentUser)
  return (
    <div className="App">
      <button>Sign in with Google</button>
      <p>{JSON.stringify(currentUser)}</p>
      <Users db={db} />
    </div>
  );
}

export default App;
