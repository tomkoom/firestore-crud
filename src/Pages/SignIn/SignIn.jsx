import React, { useState } from "react";
import css from "./SignIn.module.css";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";

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
		<div className={css.signIn}>
			<h2>Sign in</h2>
			<div className={css.signIn__form}>
				<div className={css.signIn__form__google}>
					<button
						onClick={() =>
							signInWithGoogle()
								.then((result) => {
									const credential = GoogleAuthProvider.credentialFromResult(result);
									console.log(credential);
									const token = credential.accessToken;
									console.log(token);
									const user = result.user;
									console.log(user);
									navigate("/profile");
								})
								.catch((error) => {
									// const errorCode = error.code;
									// const errorMessage = error.message;
									// const email = error.email;
									// const credential = GoogleAuthProvider.credentialFromError(error);
									console.log(error.message);
								})
						}
					>
						{!isSubmitting ? "Sign in with Google" : "Signing in..."}
					</button>
				</div>
				<hr className={css.hr} />
				<div className={css.signIn__form__password}>
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
					<button onClick={signIn}>{!isSubmitting ? "Sign in with password" : "Signing in..."}</button>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
