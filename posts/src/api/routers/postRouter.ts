import express, { Request, Response } from 'express';
import Container from 'typedi';
import { PostController } from '../../controllers/PostController';
const router = express.Router();
const postController = Container.get(PostController);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.all('/posts', (req: Request, res: Response) => {
	return postController.handlePostRequests(req, res);
});

router.post("/events", (req: Request, res: Response) => {
	const event = req.body as Event;
	console.log("Received Event", event);

	res.send();
});

export { router as postRouter };
