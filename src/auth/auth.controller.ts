import { Body, Controller, HttpCode, Post, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto } from "./dto/index";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("/register")
	@HttpCode(HttpStatus.CREATED)
	register(@Body() registerDto: RegisterDto): Promise<any> {
		return this.authService.register(registerDto);
	}

	@Post("/login")
	@HttpCode(HttpStatus.OK)
	login(@Body() loginDto: LoginDto): Promise<any> {
		return this.authService.login(loginDto);
	}
}
