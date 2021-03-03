import * as mongoose from "mongoose";
import { Roles } from "src/common/enums";

export const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: Object.values(Roles),
			default: Roles.USER
		}
	},
	{ timestamps: true }
);
