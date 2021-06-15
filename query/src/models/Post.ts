import { Comment } from './Comment';

interface Post {
	id: string;
	title: string;
	description: string;
	comments: Comment[];
}

export { Post };
