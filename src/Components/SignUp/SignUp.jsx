import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

// hooks
import useMounted from "../../Hooks/useMounted";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { register, signInWithGoogle } = useAuth();
	const navigate = useNavigate();
	// avoid memory leaks
	const mounted = useMounted;

	const signUp = () => {
		if (!email || !password) {
			alert("Enter email / password.");
		}
		setIsSubmitting(true);
		register(email, password)
			.then((userCredential) => {
				console.log(userCredential.user);
				navigate("/profile");
			})
			.catch((err) => alert(err.message))
			.finally(() => mounted.current && setIsSubmitting(false));
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
				{!isSubmitting ? "Sign up" : "Signing up..."}
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
					{!isSubmitting ? "Sign up with Google" : "Signing up..."}
				</button>
			</div>
		</div>
	);
};

export default SignUp;
