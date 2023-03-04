import { PayloadAction } from '@reduxjs/toolkit';
import { Tag } from 'library/models/programs';
import { EventState, GetEventResponse } from 'library/types/events';

export const getTagsPending = (state: EventState) => {
	state.tags.list = [];
	state.tags.status = 'loading';
};

export const getTagsFullfilled = (state: EventState, action: PayloadAction<Tag[]>) => {
	state.tags.list = action.payload;
	state.tags.status = 'loaded';
};

export const getTagsRejected = (state: EventState) => {
	state.tags.list = [];
	state.tags.status = 'error';
};

export const getEventsPending = (state: EventState) => {
	state.events.status = 'loading';
};

export const getEventsFullfilled = (state: EventState, action: PayloadAction<GetEventResponse>) => {
	if (action.payload.previous) {
		state.events.list = [...state.events.list, ...action.payload.results];
	} else {
		state.events.list = action.payload.results;
		// state.events.total = action.payload.count;
	}

	if (action.payload.next) {
		// state.events.page = state.events.page += 1;
	} else {
		// state.events.loadComlete = true;
	}

	state.events.status = 'loaded';
};

export const getEventsRejected = (state: EventState) => {
	state.events.list = [];
	state.events.status = 'error';
	state.events.page = 1;
	// state.events.total = 0;
	// state.events.loadComlete = false;
};
