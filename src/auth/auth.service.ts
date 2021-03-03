import { Injectable, BadRequestException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { Jwt } from "src/utils/jwt.service";
import { Author } from "src/common/interfaces";
import { Errors } from "src/common/enums";
import { LoginDto, RegisterDto } from "./dto";
import { UserInterface } from "./interfaces";

@Injectable()
export class AuthService {
	constructor(
		@InjectModel("User") private readonly userModel: Model<UserInterface>,
		private readonly configService: ConfigService,
		private readonly jwtService: Jwt
	) {}

	private async _hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(
			this.configService.get("app.bcryptSaltFactor")
		);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	}

	private async _isPasswordMatched(
		password: string,
		hash: string
	): Promise<boolean> {
		const isPasswordMatched = await bcrypt.compare(password, hash);
		return isPasswordMatched;
	}

	private async _generateAuthToken(payload: Author) {
		const token = await this.jwtService.sign(payload);
		return token;
	}

	async login({ email, password }: LoginDto): Promise<any> {
		const user = await this.userModel.findOne({ email }).lean();
		if (!user) throw new BadRequestException(Errors.invalid_user);
		const isMatchPassword = await this._isPasswordMatched(
			password,
			user.password
		);
		if (!isMatchPassword)
			throw new BadRequestException(Errors.invalid_creds);

		const tokenParams = {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role
		};
		const token = await this._generateAuthToken(tokenParams);
		return { token, data: user };
	}

	async register({ name, email, role, password }: RegisterDto): Promise<any> {
		const user = await this.userModel.findOne({ email: email });
		if (user) throw new BadRequestException(Errors.already_registered);
		const hash = await this._hashPassword(password);
		const userObj = { name, email, role, password: hash };
		const _user = await this.userModel.create(userObj);
		return _user;
	}
}
