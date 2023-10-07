import mongoose from "mongoose";

let isConnected = false; //check connection status

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	if (isConnected) {
		console.log("<<<<<< MongoDB is already connected >>>>>>");
		return;
	}

	try {
		await mongoose.connect(process.env.CONNECTION_URL, { dbName: "share_prompt", useNewUrlParser: true, useUnifiedTopology: true });

		isConnected = true;
		console.log("<<<<<< MongoDB is connected >>>>>>");
	} catch (error) {
		console.log(error);
	}
};
