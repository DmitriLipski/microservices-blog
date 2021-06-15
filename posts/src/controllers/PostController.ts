import { Request, Response } from 'express';
import axios from 'axios';
import { randomBytes } from 'crypto';
import { Service } from 'typedi';
import { PostService } from '../services/PostService';
import { Post } from '../models/Post';
import { EventTypes } from '../../../_common/types';

@Service()
class PostController {
	constructor(private readonly postService: PostService) {}
	async getAllPosts(_req: Request, res: Response): Promise<Response> {
		const result = await this.postService.getAllPosts();
		return res.json(result);
	}

	async addPost(_req: Request, res: Response): Promise<Response> {
		const { title, description } = _req.body as Post;
		const id = randomBytes(8).toString("hex");
		const post = { id, title, description };

		const result = await this.postService.addPost(post);

		await axios.post("http://localhost:4005/events", {
			type: EventTypes.NEW_POST_CREATED,
			data: {
				id,
				title,
				description
			},
		});

		return res.status(201).json(result);
	}
}

export { PostController };
