import { Service } from 'typedi';
import { Comment } from '../models/Comment';

@Service()
class CommentRepository {
	private commentsById: Record<string, Comment[]> = {
		'111': [
			{ id: 'fwfwf', postId: '111', content: 'Comment #1 content', status: null },
			{ id: 'ghghg', postId: '111', content: 'Comment #2 content', status: null },
		],
	};

	async getAllComments(postId: string): Promise<Comment[]> {
		return Promise.resolve(this.commentsById[postId] || []);
	}

	async addComment(postId: string, comment: Comment): Promise<Comment> {
		if (!this.commentsById[postId]) {
			this.commentsById[postId] = [];
		}

		this.commentsById[postId].push(comment);
		return Promise.resolve(comment);
	}

	async updateComment(postId: string, comment: Comment): Promise<Comment> {
		const postComments = this.commentsById[postId];
		const commentIndex = postComments.findIndex((comm) => comm.id === comment.id);
		console.log('commentIndex', commentIndex)
		this.commentsById[postId] = [...postComments.slice(0, commentIndex), comment, ...postComments.slice(commentIndex + 1)];
		return Promise.resolve(comment);
	}
}

export { CommentRepository };
