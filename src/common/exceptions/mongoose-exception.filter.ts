import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpStatus
} from "@nestjs/common";
import { Response } from "express";
import { MongoError } from "mongodb";

@Catch(MongoError)
export class MongooseExceptionFilter implements ExceptionFilter {
	catch(exception: MongoError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		console.log(exception.message);
		return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
			statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
			message: "Invalid Data",
			error: true,
			data: null
		});
	}
}
