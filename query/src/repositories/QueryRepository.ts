import { Service } from 'typedi';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';

@Service()
class QueryRepository {
	private posts: Post[] = [
		{
			id: '111',
			title: 'Post #1',
			description: 'post 1 description',
			comments: [
				{ id: 'fdfdf', postId: '111', content: 'comment content' },
				{ id: 'asasa', postId: '111', content: 'comment content' },
			],
		},
		{
			id: '222',
			title: 'Post #2',
			description: 'post 2 description',
			comments: [
				{ id: 'fdfdf', postId: '222', content: 'comment content' },
				{ id: 'asasa', postId: '222', content: 'comment content' },
			],
		},
	];

	async getAllPosts(): Promise<Post[]> {
		return Promise.resolve(this.posts);
	}

	async addPost(post: Post): Promise<Post> {
		this.posts.push(post);
		return Promise.resolve(post);
	}

	async addComment(comment: Comment): Promise<Comment> {
		const postId = comment.postId;
		const commentedPost = this.posts.find(post => post.id === postId);
		if (commentedPost) {
			commentedPost.comments.push(comment);
		}
		return Promise.resolve(comment);
	}

	async updateComment(comment: Comment): Promise<Comment | Error> {
		const { id, postId, content } = comment;
		const commentedPost = this.posts.find(post => post.id === postId);
		if (commentedPost) {
			const currentComment = commentedPost.comments.find(item => {
				return item.id === id;
			});
			if (!currentComment) {
				return Promise.reject(new Error('Comment not found'));
			}
			currentComment.content = content;
			return Promise.resolve(currentComment);
		}

		return Promise.reject(new Error('No related post'));
	}
}

export { QueryRepository };
