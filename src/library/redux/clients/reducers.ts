import { PayloadAction } from '@reduxjs/toolkit';
import { ClientList, Note } from 'library/models/clients';
import { Individual } from 'library/models/programs';
import { ClientsState } from 'library/types/clients';

export const changeClients = (
	state: ClientsState,
	action: PayloadAction<{
		search?: string;
		status?: 'loading' | 'idle';
		page?: number;
		hasNext?: boolean;
		list?: ClientList[];
	}>
) => {
	const { search, status, page, hasNext, list } = action.payload;
	if (search !== undefined) state.clients.search = search;
	if (status) state.clients.status = status;
	if (page) state.clients.page = page;
	if (hasNext !== undefined) state.clients.hasNext = hasNext;
	if (list) state.clients.list = list;
};

export const changeClient = (state: ClientsState, action: PayloadAction<ClientList | null>) => {
	state.client = action.payload;
};

export const changeTab = (state: ClientsState, action: PayloadAction<string>) => {
	state.tab = action.payload;

	if (action.payload !== 'notes' && action.payload !== 'schedules') {
		state.programs.list = { page: 1, hasNext: true, status: 'idle', list: [] };
	}
};

export const openNoteModal = (
	state: ClientsState,
	action: PayloadAction<{ isOpen: boolean; note: number | null }>
) => {
	state.notes.noteModal = action.payload;
};

export const changeNoteList = (
	state: ClientsState,
	action: PayloadAction<{
		status?: 'loading' | 'idle';
		page?: number;
		hasNext?: boolean;
		list?: Note[];
	}>
) => {
	const { status, page, hasNext, list } = action.payload;
	if (status) state.notes.list.status = status;
	if (page) state.notes.list.page = page;
	if (hasNext !== undefined) state.notes.list.hasNext = hasNext;
	if (list) state.notes.list.list = list;
};

export const changeClientData = (state: ClientsState, action: PayloadAction<ClientList | null>) => {
	state.client = action.payload;
};

export const changeProgramList = (
	state: ClientsState,
	action: PayloadAction<{
		status?: 'loading' | 'idle';
		page?: number;
		hasNext?: boolean;
		list?: Individual[];
	}>
) => {
	const { status, page, hasNext, list } = action.payload;
	if (status) state.programs.list.status = status;
	if (page) state.programs.list.page = page;
	if (hasNext !== undefined) state.programs.list.hasNext = hasNext;
	if (list) state.programs.list.list = list;
};

export const clearClients = (state: ClientsState) => {
	state.clients = {
		search: '',
		status: 'idle',
		hasNext: true,
		page: 1,
		list: [],
	};
	state.selectedClient = null;
	state.client = null;
	state.tab = 'notes';
};
