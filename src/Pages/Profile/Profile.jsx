import { useAuth } from "../../Context/AuthContext";

const Profile = () => {
	const { currentUser } = useAuth();
	return (
		<div>
			<h2>Profile</h2>
			<pre>Current user: {JSON.stringify(currentUser, null, 2)}</pre>
		</div>
	);
};

export default Profile;
