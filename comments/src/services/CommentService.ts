import { Service } from 'typedi';
import { Comment } from '../models/Comment';
import { CommentRepository } from '../repositories/CommentRepository';

@Service()
class CommentService {
	constructor(private readonly commentRepository: CommentRepository) {}
	async getAllComments(postId: string): Promise<Comment[]> {
		return await this.commentRepository.getAllComments(postId);
	}

	async addComment(postId: string, comment: Comment): Promise<Comment> {
		return await this.commentRepository.addComment(postId, comment);
	}
}

export { CommentService };
