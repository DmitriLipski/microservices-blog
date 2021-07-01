import { Service } from 'typedi';
import { Event } from '../types';

@Service()
class EventsRepository {
	private events: Event[] = [];

	async getAllEvents(): Promise<Event[]> {
		return Promise.resolve(this.events);
	}

	async addEvent(event: Event): Promise<Event> {
		this.events.push(event);
		return Promise.resolve(event);
	}
}

export { EventsRepository };
