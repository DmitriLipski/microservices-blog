import { Service } from 'typedi';
import { Event } from '../models/Event';

@Service()
class EventsRepository {
	private events: Event[] = [{ id: 'bfccd1b38422094d', type: 'POST_CREATED' }];

	async getAllEvents(): Promise<Event[]> {
		return Promise.resolve(this.events);
	}

	async addEvent(event: Event): Promise<Event> {
		this.events.push(event);
		return Promise.resolve(event);
	}
}

export { EventsRepository };
