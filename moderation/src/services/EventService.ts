import { Service } from 'typedi';
import { EventsRepository } from '../repositories/EventRepository';

import { Event, EventTypes } from '../types';

@Service()
class EventService {
	constructor(private readonly eventRepository: EventsRepository) {}
	async getAllEvents(): Promise<Event[]> {
		return await this.eventRepository.getAllEvents();
	}

	async addEvent(event: Event): Promise<Event> {
		return await this.eventRepository.addEvent(event);
	}

	moderateEvent(event: Event): Promise<string | null> {
		if (event.type !== EventTypes.NEW_COMMENT_CREATED)
			return Promise.resolve(null);
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(
					event.data.content.includes('orange') ? 'rejected' : 'approved',
				);
			}, 15000);
		});
	}
}

export { EventService };
