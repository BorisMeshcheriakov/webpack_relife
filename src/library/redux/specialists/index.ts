import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { modes } from 'library/helpers/schedules';
import { ModeCode } from 'library/types/schedules';
import { SpecialistsList, SpecialistsState } from 'library/types/specialists';

const initialState: SpecialistsState = {
	mode: modes['ON'].code,
	specialists: {
		list: [],
		status: 'idle',
		page: 1,
		hasMore: true,
	},
	search: '',
};

export const specialists = createSlice({
	name: 'specialists',
	initialState,
	reducers: {
		setList: (state: SpecialistsState, action: PayloadAction<SpecialistsList>) => {
			state.specialists = action.payload;
		},
		setMode: (state: SpecialistsState, action: PayloadAction<ModeCode>) => {
			state.mode = action.payload;
		},
		setSearch: (state: SpecialistsState, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
	},
	extraReducers: {},
});

export default specialists.reducer;

export const { setList, setMode, setSearch } = specialists.actions;

export * from './selectors';
