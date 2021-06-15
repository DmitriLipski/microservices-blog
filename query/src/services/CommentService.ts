import { Service } from 'typedi';
import { QueryRepository } from '../repositories/QueryRepository';
import { Comment } from '../models/Comment';

@Service()
class CommentService {
	// eslint-disable-next-line no-unused-vars
	constructor(private readonly queryRepository: QueryRepository) {}

	async addComment(comment: Comment): Promise<Comment> {
		return await this.queryRepository.addComment(comment);
	}

	async updateComment(comment: Comment): Promise<Comment | Error> {
		return await this.queryRepository.updateComment(comment);
	}
}

export { CommentService };
