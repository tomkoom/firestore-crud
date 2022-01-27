import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"

const AuthContext = createContext(
	{
		currentUser: null,
		register: () => Promise,
		login: () => Promise,
	}
);

export const useAuth = () => {
	return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setCurrentUser(user);
		})
		return () => {
			unsubscribe();
		}
	}, [])

	function register(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const value = {
		currentUser,
		register,
		login,
	}
	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}


