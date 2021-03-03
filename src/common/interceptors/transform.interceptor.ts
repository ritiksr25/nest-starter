import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as _ from "lodash";

export interface Response<T> {
	statusCode: number;
	error: boolean;
	message: string;
	data: T;
}

@Injectable()
export class TransformInterceptor<T>
	implements NestInterceptor<T, Response<T>> {
	private _serialisableFields = ["password"];
	private _serialiseResponseData(data: any) {
		if (
			!data ||
			typeof data !== "object" ||
			!Object.keys(data).length ||
			Array.isArray(data)
		)
			return data;
		return _.omit(data, this._serialisableFields);
	}

	intercept(
		context: ExecutionContext,
		next: CallHandler
	): Observable<Response<T>> {
		return next.handle().pipe(
			map(data => {
				let dataToSend = data;
				if (data?.token) {
					const response = context.switchToHttp().getResponse();
					response.header("Authorization", data.token);
					dataToSend = data.data;
				}
				return {
					statusCode: context.switchToHttp().getResponse().statusCode,
					message: "success",
					error: false,
					data: this._serialiseResponseData(dataToSend)
				};
			})
		);
	}
}
