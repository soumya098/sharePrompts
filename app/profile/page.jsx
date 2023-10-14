"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const [myPrompts, setMyPrompts] = useState([]);

	const handleEdit = (prompt) => {
		console.log(prompt);
		router.push(`/update-prompt?id=${prompt._id}`);
	};

	const handleDelete = async (prompt) => {
		const hasConfirmed = confirm("Are you sure you want to delete?");

		if (hasConfirmed) {
			try {
				const response = await fetch(`/api/prompt/${prompt._id}`, {
					method: "DELETE",
				});

				const filteredPrompts = myPrompts.filter((p) => {
					p._id !== prompt._id;
				});

				setMyPrompts(filteredPrompts);
			} catch (error) {
				console.log(error);
			}
		}
	};

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
