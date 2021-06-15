import { Service } from 'typedi';
import { Post } from '../models/Post';
import { QueryRepository } from '../repositories/QueryRepository';

@Service()
class PostService {
	// eslint-disable-next-line no-unused-vars
	constructor(private readonly queryRepository: QueryRepository) {}
	async getAllPosts(): Promise<Post[]> {
		return await this.queryRepository.getAllPosts();
	}

	async addPost(post: Post): Promise<Post> {
		return await this.queryRepository.addPost(post);
	}
}

export { PostService };
