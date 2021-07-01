import { Service } from 'typedi';
import { EventsRepository } from '../repositories/PostRepository';

import { Event } from '../types';

@Service()
class EventService {
	constructor(private readonly eventRepository: EventsRepository) {}
	async getAllEvents(): Promise<Event[]> {
		return await this.eventRepository.getAllEvents();
	}

	async addEvent(event: Event): Promise<Event> {
		return await this.eventRepository.addEvent(event);
	}
}

export { EventService };
