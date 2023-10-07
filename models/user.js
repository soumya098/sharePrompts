import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, "Username is Required!"],
		match: [
			/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			"Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
		],
	},
	email: { type: String, required: [true, "Email is Required!"], unique: [true, "Email Already Exits!"] },
	image: { type: String },
});

// const UserModel = model("User", userSchema); // in express server which always running

// But in nextjs api routes are serverless routes spin server when they called
// So we use `models` object which provided by mongoose lib and stores all registered model.
// If a model named `User` already exists in the `models` object, it assigns that existing model to the `User` Variable
// This prevents redefining the model and ensures the existing model is reused.

const User = models.User || model("User", userSchema);

export default User;
