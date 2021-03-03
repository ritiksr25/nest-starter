import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Errors } from "src/common/enums";
import { Author } from "src/common/interfaces";

@Injectable()
export class Jwt {
	constructor(private readonly jwtService: JwtService) {}
	async sign(payload: Author) {
		const token = await this.jwtService.signAsync(payload);
		return token;
	}

	async verify(token: string) {
		const decodedToken = await this.jwtService.verifyAsync(token);
		if (
			!decodedToken.id ||
			!decodedToken.name ||
			!decodedToken.email ||
			!decodedToken.role
		)
			throw new UnauthorizedException(Errors.access_denied);
		return decodedToken;
	}
}
