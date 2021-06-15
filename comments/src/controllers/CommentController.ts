import { Request, Response } from 'express';
import axios from 'axios';
import { randomBytes } from 'crypto';
import { Service } from 'typedi';
import { CommentService } from '../services/CommentService';
import { Comment } from '../models/Comment';
import { EventTypes } from '../../../_common/types';

@Service()
class CommentController {
	constructor(private readonly commentService: CommentService) {}
	async getAllComments(_req: Request, res: Response): Promise<Response> {
		const result = await this.commentService.getAllComments(_req.params.id);
		return res.json(result);
	}

	async addComment(_req: Request, res: Response): Promise<Response> {
		const { content } = _req.body as Comment;
		const id = randomBytes(8).toString('hex');
		const postId = _req.params.id;
		const comment = { id, postId, content };

		const result = await this.commentService.addComment(postId, comment);

		await axios.post('http://localhost:4005/events', {
			type: EventTypes.NEW_COMMENT_CREATED,
			data: {
				id,
				postId,
				content,
			},
		});

		return res.status(201).json(result);
	}
}

export { CommentController };
