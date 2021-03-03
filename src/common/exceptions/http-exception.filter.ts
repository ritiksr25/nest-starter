import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException
} from "@nestjs/common";
import { isArray } from "class-validator";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();
		let message = exception.getResponse()["message"];
		if (isArray(message)) {
			message = [...new Set(message)].join(", ");
		}
		if (!message) message = "Oops! Something went wrong.";
		return response
			.status(status)
			.json({ statusCode: status, message, error: true, data: null });
	}
}
