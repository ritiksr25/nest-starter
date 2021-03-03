import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Jwt } from "./jwt.service";
@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get("jwt.secret"),
				verifyOptions: configService.get("jwt.options"),
				signOptions: configService.get("jwt.options")
			})
		})
	],
	providers: [Jwt],
	exports: [Jwt]
})
export class UtilsModule {}
