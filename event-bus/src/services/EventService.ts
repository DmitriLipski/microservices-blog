import { Service } from 'typedi';
import { Event } from '../models/Event';
import { EventsRepository } from '../repositories/PostRepository';

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
