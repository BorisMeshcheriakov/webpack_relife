import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { programsService } from 'library/api/programsService';
import { Tab } from 'library/types/programs';

interface TabState {
	tab: Tab;
}

const initialState: TabState = {
	tab: {
		title: 'Все',
		request: programsService.getPrograms,
	},
};

export const tabs = createSlice({
	name: 'program/tabs',
	initialState,
	reducers: {
		setSelectedTab: (state: TabState, action: PayloadAction<string>) => {
			switch (action.payload) {
				case 'Все':
					state.tab = { title: 'Все', request: programsService.getPrograms };
					break;
				case 'Избранное':
					state.tab = {
						title: 'Избранное',
						request: programsService.getPrograms,
						params: { favorite: 1 },
					};
					break;
				case 'Мои':
					state.tab = {
						title: 'Мои',
						request: programsService.getMyPrograms,
					};
					break;
				default:
					state.tab = { title: 'Все', request: programsService.getPrograms };
					break;
			}
		},
	},
	extraReducers: {},
});

export * as tabsSelectors from './selectors';
