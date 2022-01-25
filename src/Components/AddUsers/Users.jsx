import React, { useState, useEffect } from "react";
import css from "./Users.module.css";
import { collection, getDocs } from "firebase/firestore";

const AddUsers = ({ db }) => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const usersColRef = collection(db, "users");

	const getUsers = async () => {
		setLoading(true);
		const data = await getDocs(usersColRef);
		setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div>
					<h1>Users</h1>
					<ul>
						{users.map((user, i) => (
							<li key={i}>
								<p>{user.id}</p>
								<p>{user.name}</p>
								<p>{user.age}</p>
							</li>
						))}
					</ul>
					<pre>{JSON.stringify(users, null, 2)}</pre>
				</div>
			)}
		</div>
	);
};

export default AddUsers;
