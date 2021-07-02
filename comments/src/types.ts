//Event
export enum EventTypes {
	NEW_POST_CREATED = 'NEW_POST_CREATED',
	NEW_COMMENT_CREATED = 'NEW_COMMENT_CREATED',
	COMMENT_UPDATED = 'COMMENT_UPDATED'
}

export interface Event {
	id: string;
	type: EventTypes;
	data?: any;
}
