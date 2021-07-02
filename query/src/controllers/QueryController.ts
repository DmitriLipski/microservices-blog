import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CommentService, PostService } from '../services';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import { EventTypes, Event } from '../types';

@Service()
class QueryController {
	constructor(
		// eslint-disable-next-line no-unused-vars
		private readonly postService: PostService,
		// eslint-disable-next-line no-unused-vars
		private readonly commentService: CommentService,
	) {}

	async handleEvent(_req: Request, res: Response): Promise<Response> {
		const event = _req.body as Event;
		if (event.type === EventTypes.NEW_POST_CREATED) {
			return await this.addPost(_req, res);
		}
		if (event.type === EventTypes.NEW_COMMENT_CREATED) {
			return await this.addComment(_req, res);
		}
		return res.status(400).json({ message: 'Unsupported event type' });
	}

	async getAllPosts(_req: Request, res: Response): Promise<Response> {
		const result = await this.postService.getAllPosts();
		return res.json(result);
	}

	async addPost(_req: Request, res: Response): Promise<Response> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const { id, title, description } = _req.body.data as Post;
		const post = { id, title, description, comments: [] };

		const result = await this.postService.addPost(post);

		return res.status(201).json(result);
	}

	async addComment(_req: Request, res: Response): Promise<Response> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const { id, postId, content } = _req.body.data as Comment;
		const comment = { id, postId, content };

		const result = await this.commentService.addComment(comment);

		return res.status(201).json(result);
	}

	async updateComment(_req: Request, res: Response): Promise<Response> {
		const { id, postId, content } = _req.body as Comment;
		const comment = { id, postId, content };

		const result = await this.commentService.updateComment(comment);

		return res.status(201).json(result);
	}
}

export { QueryController };
