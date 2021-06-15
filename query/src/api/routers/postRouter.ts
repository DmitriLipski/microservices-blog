import express, { Request, Response } from 'express';
import Container from 'typedi';
import { QueryController } from '../../controllers/QueryController';
const router = express.Router();
const queryController = Container.get(QueryController);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/posts', (req: Request, res: Response) => {
	return queryController.getAllPosts(req, res);
});

export { router as postRouter };
