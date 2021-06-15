import express, { Request, Response } from 'express';
import Container from 'typedi';
import { QueryController } from '../../controllers/QueryController';
const router = express.Router();
const queryController = Container.get(QueryController);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/events', (req: Request, res: Response) => {
	const event = req.body as Event;
	// eslint-disable-next-line no-console
	console.log('Received Event', event);
	return queryController.handleEvent(req, res);
});

export { router as eventRouter };
