import { Service } from 'typedi';
import { Comment } from '../models/Comment';

@Service()
class CommentRepository {
	private commentsById: Record<string, Comment[]> = {
		'111': [
			{ id: 'fwfwf', postId: '111', content: 'Comment #1 content' },
			{ id: 'ghghg', postId: '111', content: 'Comment #2 content' },
		],
	};

	async getAllComments(postId: string): Promise<Comment[]> {
		return Promise.resolve(this.commentsById[postId] || []);
	}

	async addComment(postId: string, comment: Comment): Promise<Comment> {
		this.commentsById[postId].push(comment);
		return Promise.resolve(comment);
	}
}

export { CommentRepository };
