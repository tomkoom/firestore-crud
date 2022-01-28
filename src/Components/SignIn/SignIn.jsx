import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

// hooks
import useMounted from "../../Hooks/useMounted";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { login, signInWithGoogle } = useAuth();
	const navigate = useNavigate();
	// avoid memory leaks
	const mounted = useMounted;

	const signIn = () => {
		if (!email || !password) {
			alert("Enter email / password.");
		}
		setIsSubmitting(true);
		login(email, password)
			.then((userCredential) => {
				console.log(userCredential.user);
				navigate("/profile");
			})
			.catch((err) => alert(err.message))
			.finally(() => mounted.current && setIsSubmitting(false));
	};

	return (
		<div>
			<h2>Sign in</h2>
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
				{!isSubmitting ? "Sign in" : "Signing in..."}
			</div>
			<div>
				<button
					onClick={() =>
						signInWithGoogle()
							.then((userCredential) => {
								console.log(userCredential.user);
								navigate("/profile");
							})
							.catch((err) => alert(err.message))
					}
				>
					{!isSubmitting ? "Sign in with Google" : "Signing in..."}
				</button>
			</div>
		</div>
	);
};

export default SignIn;
