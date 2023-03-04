import type { RootState } from 'core/redux/store';
import { Event } from 'library/models/events';

export const selectTags = (state: RootState) => state.events.tags;
export const selectEvents = (state: RootState) => state.events.events;
export const selectEventById = (state: RootState, id: number) =>
	state.events.events.list.find((event: Event) => event.id === id);
export const selectEvent = (state: RootState) => state.events.event;

export const selectShareOpen = (state: RootState) => state.events.share.isOpen;
export const selectShareId = (state: RootState) => state.events.share.id;
export const selectTab = (state: RootState) => state.events.tab;


