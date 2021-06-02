import { Service } from 'typedi';
import { Post } from '../models/Post';
import { PostRepository } from '../repositories/PostRepository';

@Service()
class PostService {
	constructor(private readonly postRepository: PostRepository) {}
	async getAllPosts(): Promise<Post[]> {
		return await this.postRepository.getAllPosts();
	}

	async addPost(post: Post): Promise<Post> {
		return await this.postRepository.addPost(post);
	}
}

export { PostService };
