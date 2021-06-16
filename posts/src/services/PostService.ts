import { Service } from 'typedi';
import { Post } from '../models/Post';
import { PostRepository } from '../repositories/PostRepository';

@Service()
class PostService {
	constructor(private readonly postRepository: PostRepository) {}
	async getAllPosts(): Promise<Post[] | Error> {
		return await this.postRepository.getAllPosts();
		// TODO
		// return Promise.reject(new Error('Some error'));
	}

	async addPost(post: Post): Promise<Post> {
		return await this.postRepository.addPost(post);
	}

	// TODO
	validatePost(post: Post): boolean {
		console.log(post);
		return true
	}
}

export { PostService };
