import { PayloadAction } from '@reduxjs/toolkit';
import { Event } from 'library/models/events';
import { EventState } from 'library/types/events';
import { Tag } from 'library/models/programs';
import { tabs } from 'library/helpers/events';

export const patchEvent = (
	state: EventState,
	action: PayloadAction<{ id: number; data: { published?: boolean; favorite?: boolean } }>
) => {
	const idx = state.events.list.findIndex((event) => event.id === action.payload.id);
	const data = { ...action.payload.data };

	state.events.list[idx] = { ...state.events.list[idx], ...data };

	// if (state.events.selected) {
	// 	state.events.selected = { ...state.events.selected, ...data };
	// }
};

export const changeEvent = (state: EventState, action: PayloadAction<Event>) => {
	const idx = state.events.list.findIndex((event) => event.id === action.payload.id);
	state.events.list[idx] = { ...state.events.list[idx], ...action.payload };
};

export const removeEvent = (state: EventState, action: PayloadAction<number>) => {
	const idx = state.events.list.findIndex((event) => event.id === action.payload);
	let events = [...state.events.list];
	events.splice(idx, 1);
	state.events.list = [...events];
};

export const shareEvent = (
	state: EventState,
	action: PayloadAction<{ id: number; isOpen: boolean }>
) => {
	state.share = action.payload;
};

export const resetEvents = (state: EventState) => {
	state.events = {
		...state.events,
		list: [],
		page: 1,
		status: 'idle',
	};
	state.tab = tabs['all'];
};

export const addEventToList = (state: EventState, action: PayloadAction<Event>) => {
	let events = [...state.events.list];
	events.push(action.payload);
	state.events.list = [...events];
};

export const setSelectedEvent = (state: EventState, action: PayloadAction<Event>) => {
	state.event = action.payload;
};

export const setSelectedTab = (state: EventState, action: PayloadAction<string>) => {
	state.tab = tabs[action.payload];
};

export const setStatus = (state: EventState, action: PayloadAction<'loading' | 'idle'>) => {
	state.events.status = action.payload;
};

export const setEvents = (state: EventState, action: PayloadAction<Event[]>) => {
	state.events.list = action.payload;
};

export const setPage = (state: EventState, action: PayloadAction<number | null>) => {
	state.events.page = action.payload;
};

export const setSearch = (state: EventState, action: PayloadAction<string>) => {
	state.events.search = action.payload;
};

export const setTags = (state: EventState, action: PayloadAction<Tag[]>) => {
	state.events.tags = action.payload;
};
