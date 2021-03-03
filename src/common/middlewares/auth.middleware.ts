import {
	Injectable,
	NestMiddleware,
	UnauthorizedException
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { Jwt } from "src/utils/jwt.service";
import { Errors } from "src/common/enums";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private readonly jwtService: Jwt) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.authorization;
		if (!token) throw new UnauthorizedException(Errors.access_denied);
		try {
			const { id, name, email, role } = await this.jwtService.verify(
				token
			);

			const userObj = {
				id,
				name,
				email,
				role
			};
			req["user"] = userObj;
			next();
		} catch (error) {
			console.log(error);
			throw new UnauthorizedException(Errors.access_denied);
		}
	}
}
