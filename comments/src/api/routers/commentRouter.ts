import express, { Request, Response } from 'express';
import Container from 'typedi';
import { CommentController } from '../../controllers/CommentController';
const router = express.Router();
const commentController = Container.get(CommentController);

type Event = {
	type: EventType;
	data: any;
};

//TODO: Replace with _common event type
enum EventType {
	COMMENT_CREATED = 'COMMENT_CREATED',
	COMMENT_UPDATED = 'COMMENT_UPDATED',
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/posts/:id/comments', (req: Request, res: Response) => {
	return commentController.getAllComments(req, res);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/posts/:id/comments', (req: Request, res: Response) => {
	return commentController.addComment(req, res);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/events', (req: Request, res: Response) => {
	const event = req.body as Event;
	console.log('Received Event', event);

	return commentController.handleEvent(req, res);
});

export { router as commentRouter };
