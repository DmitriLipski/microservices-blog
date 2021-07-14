//Event
import { SerializeErrorsReturnType } from './services/common/errors';

export enum EventTypes {
	NEW_POST_CREATED = 'NEW_POST_CREATED',
	NEW_COMMENT_CREATED = 'NEW_COMMENT_CREATED',
	COMMENT_UPDATED = 'COMMENT_UPDATED'
}

export interface Event {
	id: string;
	type: EventTypes;
	data?: any;
}

//Http
export enum HttpStatusCode {
	OK = 200,
	BAD_REQUEST = 400,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	CONFLICT = 409,
	INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorResponseMessages {
	INTERNAL_SERVER_ERROR = 'Internal Server Error'
}

export enum HttpMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH'
}

export type HandleRequestResultType<T = unknown> = {
	headers?: Record<string, string>;
	statusCode: number;
	data?: T | Error;
	errorMessage?: SerializeErrorsReturnType;
}
