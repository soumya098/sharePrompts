import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// Create a new prompt
export const POST = async (req) => {
	const { prompt, userId, tag } = await req.json();

	try {
		await connectToDB();

		const newPrompt = new Prompt({ creator: userId, prompt, tag });
		await newPrompt.save();
		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		return new Response("Failed To Create New Prompt", { status: 500 });
	}
};
