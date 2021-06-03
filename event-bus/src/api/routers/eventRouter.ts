import express, { Request, Response } from 'express';
import Container from 'typedi';
import { EventController } from '../../controllers/EventController';
const router = express.Router();
const eventController = Container.get(EventController);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/events', (req: Request, res: Response) => {
	return eventController.getAllEvents(req, res);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/events', (req: Request, res: Response) => {
	return eventController.addEvent(req, res);
});

export { router as eventRouter };
