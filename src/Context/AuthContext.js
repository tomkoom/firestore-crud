import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
} from "firebase/auth"

const AuthContext = createContext();

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
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		return signOut(auth);
	}

	function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({
			prompt: "select_account"
		});
		return signInWithRedirect(auth, provider);
	}

	const value = {
		currentUser,
		register,
		login,
		logout,
		signInWithGoogle,
	}
	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}


