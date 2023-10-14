"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({params}) => {
	const searchParams = useSearchParams();
	const userName = searchParams.get("name");
	const userId = params?.id;
	const [prompts, setPrompts] = useState([]);

	useEffect(() => {
		const fetchPrompts = async () => {
			const res = await fetch(`/api/users/${userId}/prompts`);
			const data = await res.json();
			setPrompts(data);
		};

		if (userId) fetchPrompts();
	}, [userId]);

	return <Profile name={userName} desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`} data={prompts} />;
};

export default UserProfile;
