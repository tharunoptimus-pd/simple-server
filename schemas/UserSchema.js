import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema(
	{
		userId: { type: String, required: true },
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
	},
	{ timestamps: true }
)

let User = mongoose.model("User", UserSchema)
export default User
