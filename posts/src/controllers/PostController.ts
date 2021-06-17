import { Request, Response } from 'express';
import axios from 'axios';
import { randomBytes } from 'crypto';
import { Service } from 'typedi';

import { PostService, LoggerService, ErrorService, InvalidPropertyError, MethodNotAllowedError } from '../services';
import { Post } from '../models/Post';

import { HttpMethods, HttpStatusCode } from '../types';
import { EventTypes } from '../../../_common/types';

type HttpRequestType<T> = {
	path: string;
	method: string;
	pathParams: Record<string, string | number>;
	queryParams: any;
	body?: T;
}

type HandleRequestResultType<T> = {
	headers?: Record<string, string>;
	statusCode: number;
	data?: T | Error;
	errorMessage?: string;
}

@Service()
class PostController {
	constructor(
		private readonly postService: PostService,
		private readonly logger: LoggerService,
		private readonly errorBuilder: ErrorService
	) {}

	adaptRequest(_req: Request): HttpRequestType<Post> {
		return {
			path: _req.path,
			method: _req.method,
			pathParams: _req.params,
			queryParams: _req.query,
			body: _req.body
		}
	}

	async handlePostRequests(_req: Request, res: Response): Promise<Response> {
		const httpRequest = this.adaptRequest(_req);

		return this.handleRequest(httpRequest)
			.then(({ headers, statusCode, data, errorMessage }) => {
					return res
						.set(headers)
						.status(statusCode)
						.send(errorMessage ? { error: errorMessage } : data);
				}
			)
			.catch((error: Error) => {
				this.logger.logToConsole(error.message);
				return res.status(500).json({ message: 'Internal Server Error' });
			})
	}

	async handleRequest(httpRequest: HttpRequestType<Post>): Promise<HandleRequestResultType<Post[] | Post>> {
		switch (httpRequest.method) {
			case HttpMethods.GET:
				return this.getAllPosts();
			case HttpMethods.POST:
				return this.addPost(httpRequest);
			default:
				return this.errorBuilder.makeHttpError(new MethodNotAllowedError(`${httpRequest.method} method not allowed.`))
		}
	}

	async getAllPosts(): Promise<HandleRequestResultType<Post[]>> {
		try {
			const result = await this.postService.getAllPosts();

			return {
				headers: {
					'Content-Type': 'application/json'
				},
				statusCode: HttpStatusCode.OK,
				data: result
			}
		} catch (error: unknown) {
			return this.errorBuilder.makeHttpError(error)
		}
	}

	async addPost(httpRequest: HttpRequestType<Post>): Promise<HandleRequestResultType<Post>> {
		if (!httpRequest.body) {
			return this.errorBuilder.makeHttpError(new InvalidPropertyError('Bad request. No POST body.'))
		}

		const { title, description } = httpRequest.body;

		const id = randomBytes(8).toString("hex");

		try {
			const post = { id, title, description };
			const result = await this.postService.addPost(post);

			await this.broadcastEvent(post);

			return {
				headers: {
					'Content-Type': 'application/json'
				},
				statusCode: HttpStatusCode.OK,
				data: result
			}
		} catch (error: unknown) {
			return this.errorBuilder.makeHttpError(error)
		}
	}

	async broadcastEvent(post: Post): Promise<Post> {
		try {
			await axios.post("http://localhost:4005/events", {
				type: EventTypes.NEW_POST_CREATED,
				data: post,
			});
			return Promise.resolve(post)

		} catch(e: unknown) {
			if (e instanceof Error) {
				this.logger.logToConsole(e.message, '[Error] Broadcast Event Error:');
			}
			return Promise.resolve(post)
		}
	}
}

export { PostController };
