import { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { Service } from 'typedi';
import { EventService } from '../services/EventService';
import { Event } from '../models/Event';

@Service()
class EventController {
	constructor(private readonly eventService: EventService) {}
	async getAllEvents(_req: Request, res: Response): Promise<Response> {
		const result = await this.eventService.getAllEvents();
		return res.json(result);
	}

	async addEvent(_req: Request, res: Response): Promise<Response> {
		const { type } = _req.body as Event;
		const id = randomBytes(8).toString('hex');

		const event = { id, type };
		const result = await this.eventService.addEvent(event);
		return res.status(201).json(result);
	}
}

export { EventController };
