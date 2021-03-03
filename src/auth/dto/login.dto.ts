import { IsString, IsEmail, MinLength } from "class-validator";
import { Errors } from "src/common/enums";
import { getMissingFieldError } from "src/utils/utils.helper";

export class LoginDto {
	@IsString({ message: getMissingFieldError("email") })
	@IsEmail({}, { message: getMissingFieldError("email") })
	readonly email: string;

	@IsString({ message: Errors.invalid_pwd })
	@MinLength(8, { message: Errors.invalid_pwd })
	readonly password: string;
}
