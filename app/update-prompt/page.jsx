"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const searchParams = useSearchParams();
	const promptId = searchParams.get("id");
	const [submitting, setSubmitting] = useState(false);
	const [prompt, setPrompt] = useState({ prompt: "", tag: "" });

	useEffect(() => {
		const fetchPrompt = async () => {
			const res = await fetch(`api/prompt/${promptId}`);
			const data = await res.json();
			setPrompt({ prompt: data.prompt, tag: data.tag });
		};

		if (promptId) fetchPrompt();
	}, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!promptId) {
			return alert("Missing Prompt Id!");
		}

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({ prompt: prompt.prompt, tag: prompt.tag }),
			});

			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	return <Form type="Update" post={prompt} setPost={setPrompt} submitting={submitting} handleSubmit={updatePrompt} />;
};

export default EditPrompt;
