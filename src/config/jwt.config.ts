import { registerAs } from "@nestjs/config";

export default registerAs("jwt", () => ({
	secret: process.env.JWT_SECRET_KEY,
	options: {
		issuer: "https://ritiksr25.tech",
		subject: "user_authentication",
		algorithm: "HS512",
		audience: "_authenticated_users_"
	}
}));
