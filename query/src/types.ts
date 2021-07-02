//Event
// eslint-disable-next-line no-shadow
export enum EventTypes {
	// eslint-disable-next-line no-unused-vars
	NEW_POST_CREATED = 'NEW_POST_CREATED',
	// eslint-disable-next-line no-unused-vars
	NEW_COMMENT_CREATED = 'NEW_COMMENT_CREATED',
	// eslint-disable-next-line no-unused-vars
	COMMENT_UPDATED = 'COMMENT_UPDATED',
}

export interface Event {
	id: string;
	type: EventTypes;
	data?: any;
}
