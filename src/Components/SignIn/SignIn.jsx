import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const signIn = () => {
		login(email, password)
			.then((userCredential) => {
				console.log(userCredential.user);
				navigate("/profile");
			})
			.catch((err) => {
				// const errCode = err.code;
				const errMessage = err.message;
				alert(errMessage);
			});
	};

	return (
		<div>
			<h2>Sign In</h2>
			<div>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					name="email"
					type="email"
					autoComplete="email"
					placeholder="Email"
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					name="password"
					type="password"
					placeholder="Password"
				/>
				<button onClick={signIn}>Login</button>
			</div>
		</div>
	);
};

export default SignIn;
