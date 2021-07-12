import { Request, Response } from 'express';
import axios from 'axios';
import { randomBytes } from 'crypto';
import { Service } from 'typedi';
import { CommentService } from '../services/CommentService';
import { Comment } from '../models/Comment';
import { Event, EventTypes } from '../types';

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
		const comment = { id, postId, content, status: null };

		const result = await this.commentService.addComment(postId, comment);

		await axios.post(`${process.env.EVENT_BUS_SERVICE_URL || 'localhost:4005'}/events`, {
			type: EventTypes.NEW_COMMENT_CREATED,
			data: {
				...comment,
			},
		});

		return res.status(201).json(result);
	}

	async handleEvent(_req: Request, res: Response): Promise<Response> {
		const event =_req.body as Event;
		const { type } = event;

		if (type === EventTypes.COMMENT_MODERATED) {
			const comment: Comment = event.data;
			const { postId } = comment;


			const result = await this.commentService.updateComment(postId, comment);

			await axios.post(`${process.env.EVENT_BUS_SERVICE_URL || 'localhost:4005'}/events`, {
				type: EventTypes.COMMENT_UPDATED,
				data: {
					...result
				},
			});

			return res.status(201).json(result);
		}

		return res.status(400).json({ message: 'Unsupported event type' });
	}
}

export { CommentController };
