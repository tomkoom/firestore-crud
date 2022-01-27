import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { register } = useAuth();

	const signUp = () => {
		register(email, password)
			.then((userCredential) => console.log(userCredential.user))
			.catch((err) => {
				// const errCode = err.code;
				const errMessage = err.message;
				alert(errMessage);
			});
	};
	return (
		<div>
			<h2>Sign Up</h2>
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
				<button onClick={signUp}>Sign up</button>
			</div>
		</div>
	);
};

export default SignUp;
