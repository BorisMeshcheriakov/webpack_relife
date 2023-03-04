import { createSlice } from '@reduxjs/toolkit';

import * as reducers from './reducers';
import * as thunks from './thunks';
import * as extraReducers from './extraReducers';

import { EventState } from 'library/types/events';

const initialState: EventState = {
	tags: {
		list: [],
		status: 'idle',
	},
	tab: {
		code: 'all',
		title: 'Все',
		params: {
			bytime: 'future',
			moderation_status: 'A',
		},
	},
	events: {
		list: [],
		page: 1,
		status: 'idle',
		tags: [],
		search: '',
	},
	event: null,
	share: {
		id: 0,
		isOpen: false,
	},
};

export const events = createSlice({
	name: 'events',
	initialState,
	reducers: {
		changeEvent: reducers.changeEvent,
		patchEvent: reducers.patchEvent,
		removeEvent: reducers.removeEvent,
		shareEvent: reducers.shareEvent,
		resetEvents: reducers.resetEvents,
		addEventToList: reducers.addEventToList,
		setSelectedEvent: reducers.setSelectedEvent,
		setSelectedTab: reducers.setSelectedTab,
		setStatus: reducers.setStatus,
		setEvents: reducers.setEvents,
		setPage: reducers.setPage,
		setSearch: reducers.setSearch,
		setTags: reducers.setTags,
	},
	extraReducers: (builder) => {
		builder.addCase(thunks.getTags.pending, extraReducers.getTagsPending);
		builder.addCase(thunks.getTags.fulfilled, extraReducers.getTagsFullfilled);
		builder.addCase(thunks.getTags.rejected, extraReducers.getTagsRejected);

		builder.addCase(thunks.getEvents.pending, extraReducers.getEventsPending);
		builder.addCase(thunks.getEvents.fulfilled, extraReducers.getEventsFullfilled);
		builder.addCase(thunks.getEvents.rejected, extraReducers.getEventsRejected);
	},
});

export const {
	patchEvent,
	removeEvent,
	shareEvent,
	resetEvents,
	changeEvent,
	addEventToList,
	setSelectedEvent,
	setSelectedTab,
	setStatus,
	setEvents,
	setPage,
	setSearch,
	setTags,
} = events.actions;

export * from './thunks';
export * from './selectors';

export default events.reducer;
