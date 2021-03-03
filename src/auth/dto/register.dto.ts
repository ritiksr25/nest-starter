import {
	IsString,
	IsEmail,
	IsOptional,
	MinLength,
	IsEnum
} from "class-validator";
import { Errors, Roles } from "src/common/enums";
import { getMissingFieldError } from "src/utils/utils.helper";

export class RegisterDto {
	@IsString({ message: getMissingFieldError("email") })
	@IsEmail({}, { message: getMissingFieldError("email") })
	readonly email: string;

	@IsString({ message: getMissingFieldError("name") })
	readonly name: string;

	@IsString({ message: Errors.invalid_pwd })
	@MinLength(8, { message: Errors.invalid_pwd })
	readonly password: string;

	@IsOptional()
	@IsEnum(Roles, { message: getMissingFieldError("role") })
	readonly role?: string;
}
