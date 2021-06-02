import express, { Request, Response } from 'express';
import Container from 'typedi';
import { PostController } from '../../controllers/PostController';
const router = express.Router();
const postController = Container.get(PostController);

type Event = {
	type: EventType;
	data: any;
}

enum EventType {
	COMMENT_CREATED = "COMMENT_CREATED",
	COMMENT_UPDATED = "COMMENT_UPDATED",
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/posts', (req: Request, res: Response) => {
	return postController.getAllPosts(req, res);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/posts', (req: Request, res: Response) => {
	return postController.addPost(req, res);
});


router.post("/events", (req: Request, res: Response) => {
	const event = req.body as Event;
	console.log("Received Event", event.type);

	res.send();
});

export { router as postRouter };
