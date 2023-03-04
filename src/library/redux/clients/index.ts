import { createSlice } from '@reduxjs/toolkit';
import { ClientsState } from 'library/types/clients';

import * as reducers from './reducers';

const initialState: ClientsState = {
	clients: {
		search: '',
		status: 'idle',
		hasNext: true,
		page: 1,
		list: [],
	},
	selectedClient: null,
	client: null,
	tab: 'notes',
	notes: {
		noteModal: { isOpen: false, note: null },
		list: {
			status: 'idle',
			hasNext: true,
			page: 1,
			list: [],
		},
	},
	programs: {
		list: {
			status: 'idle',
			hasNext: true,
			page: 1,
			list: [],
		},
	},
};

export const clients = createSlice({
	name: 'clients',
	initialState,
	reducers: {
		changeClients: reducers.changeClients,
		changeClient: reducers.changeClient,
		changeClientData: reducers.changeClientData,
		changeTab: reducers.changeTab,
		openNoteModal: reducers.openNoteModal,
		changeNoteList: reducers.changeNoteList,
		changeProgramList: reducers.changeProgramList,
		clearClients: reducers.clearClients,
	},
	extraReducers: (builder) => {},
});

export const {
	changeClients,
	changeClient,
	changeTab,
	openNoteModal,
	changeNoteList,
	changeProgramList,
	clearClients,
} = clients.actions;

export * from './selectors';

export default clients.reducer;
