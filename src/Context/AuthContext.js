import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);

	function register(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	const value = {
		currentUser,
		register,
	}
	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}


