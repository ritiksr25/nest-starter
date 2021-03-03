import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
	NODE_ENV: process.env.NODE_ENV || "development",
	PORT: process.env.PORT || 3000,
	bcryptSaltFactor: 12
}));
