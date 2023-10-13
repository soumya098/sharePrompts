"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
	const { data: session } = useSession();
	const [myPrompts, setMyPrompts] = useState([]);
	const handleEdit = () => {};
	const handleDelete = async () => {};

	useEffect(() => {
		const fetchPrompts = async () => {
			const res = await fetch(`/api/users/${session?.user.id}/prompts`);
			const data = await res.json();
			setMyPrompts(data);
		};

		if (session?.user) {
			fetchPrompts();
		}
	}, [session?.user]);

	return <Profile name="My" desc="Welcome to your profile" data={myPrompts} handleEdit={handleEdit} handleDelete={handleDelete} />;
};

export default MyProfile;
