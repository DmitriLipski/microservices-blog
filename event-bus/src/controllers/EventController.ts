import { Request, Response } from 'express';
import axios from 'axios';
// import axios, { AxiosResponse } from 'axios';
import chalk from 'chalk';
import { randomBytes } from 'crypto';
import { Service } from 'typedi';
import { EventService } from '../services/EventService';

import { Event } from '../types';

@Service()
class EventController {
	constructor(private readonly eventService: EventService) {}
	async getAllEvents(_req: Request, res: Response): Promise<Response> {
		const result = await this.eventService.getAllEvents();
		return res.json(result);
	}

	async addEvent(_req: Request, res: Response): Promise<Response> {
		console.log(`${chalk.blue.bold('New Event')}: `, _req.body);
		const { type, data } = _req.body as Event;

		const id = randomBytes(8).toString('hex');
		const event = { id, type, data };

		const result = await this.eventService.addEvent(event);
		this.broadcastEvent(event);

		return res.status(201).json(result);
	}

	broadcastEvent(event: Event): void {
		//Post service
		axios.post<any, any>(`${process.env.POST_SERVICE_URL || 'localhost:4001'}/events`, event)
			.catch((err: Error) => {
				console.log('Error during Post service notification: ', err.message);
		});
		//Comment service
		axios.post<any, any>(`${process.env.COMMENT_SERVICE_URL || 'localhost:4002'}/events`, event)
			.catch((err: Error) => {
				console.log('Error during Comment service notification: ', err.message);
		});
		//Moderation service
		axios.post<any, any>(`${process.env.MODERATION_SERVICE_URL || 'localhost:4004'}/events`, event)
			.catch((err: Error) => {
				console.log('Error during Moderation service notification: ', err.message);
		});
		//Query service
		axios.post<any, any>(`${process.env.QUERY_SERVICE_URL || 'localhost:4003'}/events`, event)
			.catch((err: Error) => {
				console.log('Error during Query service notification: ', err.message);
		});
	}
}

export { EventController };
