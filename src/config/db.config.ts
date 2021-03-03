import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
	uri: process.env[`MONGO_URI_${process.env.NODE_ENV.toUpperCase()}`],
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
}));
