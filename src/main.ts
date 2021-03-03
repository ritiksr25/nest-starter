import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as helmet from "helmet";
import * as compression from "compression";
import { TransformInterceptor } from "./common/interceptors/";
import {
	HttpExceptionFilter,
	MongooseExceptionFilter
} from "./common/exceptions";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: true,
		logger: true
	});
	app.use(helmet());
	app.use(compression());
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true
		})
	);
	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalFilters(new MongooseExceptionFilter());
	app.useGlobalInterceptors(new TransformInterceptor());
	await app.listen(app.get("ConfigService").get("PORT"));
	console.log(`Server ready for ${app.get("ConfigService").get("NODE_ENV")}`);
	console.log(`Listening on ${app.get("ConfigService").get("PORT")}`);
}
bootstrap();
