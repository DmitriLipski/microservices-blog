import { Request, Response } from 'express';
import axios from 'axios';
import { Service } from 'typedi';
import { EventService } from '../services/EventService';

import { Event, EventTypes } from '../types';

@Service()
class EventController {
	constructor(private readonly eventService: EventService) {}
	async getAllEvents(_req: Request, res: Response): Promise<Response> {
		const result = await this.eventService.getAllEvents();
		return res.json(result);
	}

	async handleEvent(_req: Request, res: Response): Promise<Response> {
		const event = _req.body as Event;

		const { type } = event;

		if (type === EventTypes.NEW_COMMENT_CREATED) {
			const status = await this.eventService.moderateEvent(event);

			const result = await this.eventService.addEvent({
				...event,
				data: { ...event.data, status },
			});

			await axios.post(
				`${process.env.EVENT_BUS_SERVICE_URL || 'localhost:4005'}/events`,
				{
					type: EventTypes.COMMENT_MODERATED,
					data: {
						...event.data,
						status,
					},
				},
			);

			return res.status(201).json(result);
		}

		return res.status(400).json({ message: 'Wrong event type' });
	}
}

export { EventController };
