import { useState } from 'react';
import './App.css';

// components
import Users from './Components/AddUsers/Users';

// firebase
import { db } from "./firebase";
import { useAuth } from './Context/AuthContext';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser, register } = useAuth();

  const signUp = () => {
    register(email, password)
      .then((userCredential) => console.log(userCredential))
      .catch((err) => {
        const errCode = err.code;
        const errMessage = err.message;
        console.log(errCode);
        console.log(errMessage);
      });
  }

  return (
    <div className="App">
      <button>Sign in with Google</button>
      <p>{JSON.stringify(currentUser)}</p>

      <div>
        <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" autoComplete='email' placeholder='Email' />
        <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder='Password' />
        <button onClick={signUp}>Sign up</button>
      </div>

      <Users db={db} />
    </div>
  );
}

export default App;
