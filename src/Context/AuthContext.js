import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);

	const value = {
		currentUser
	}
	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}


