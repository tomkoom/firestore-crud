import './App.css';
import Users from './Components/AddUsers/Users';
import { db } from "./firebase";


function App() {
  return (
    <div className="App">
      <Users db={db} />
    </div>
  );
}

export default App;
