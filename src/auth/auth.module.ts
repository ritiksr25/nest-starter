import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/users.schema";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UtilsModule } from "src/utils/utils.module";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
		ConfigModule,
		UtilsModule
	],
	controllers: [AuthController],
	providers: [AuthService]
})
export class AuthModule {}
