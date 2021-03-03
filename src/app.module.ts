import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RolesGuard } from "./common/guards";
import { AuthMiddleware } from "./common/middlewares";

import appConfig from "./config/app.config";
import dbConfig from "./config/db.config";
import jwtConfig from "./config/jwt.config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UtilsModule } from "./utils/utils.module";
@Module({
	imports: [
		ConfigModule.forRoot({
			load: [appConfig, dbConfig, jwtConfig],
			isGlobal: true
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				...configService.get("database")
			})
		}),
		UtilsModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: RolesGuard
		}
	]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthMiddleware)
			.exclude("/", "auth/register", "auth/login")
			.forRoutes("*");
	}
}
