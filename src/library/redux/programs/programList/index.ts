import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Program, ProgramList } from 'library/models/programs';

interface ProgramListState {
	list: ProgramList[];
	status: 'idle' | 'loading';
	page: number;
	hasNext: boolean;
	search: string;
	tags: number[];
}

const initialState: ProgramListState = {
	list: [],
	status: 'idle',
	page: 1,
	hasNext: true,
	search: '',
	tags: [],
};

export const programList = createSlice({
	name: 'programs/programs',
	initialState,
	reducers: {
		reset: (state: ProgramListState) => {
			state.list = [];
			state.page = 1;
			state.hasNext = true;
			state.status = 'idle';
		},
		setPrograms: (state: ProgramListState, action: PayloadAction<ProgramList[]>) => {
			state.list = action.payload;
		},
		setSearch: (state: ProgramListState, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setProgramListTags: (state: ProgramListState, action: PayloadAction<number[]>) => {
			state.tags = action.payload;
		},
		setStatus: (state: ProgramListState, action: PayloadAction<'idle' | 'loading'>) => {
			state.status = action.payload;
		},
		setPage: (state: ProgramListState, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setHasNext: (state: ProgramListState, action: PayloadAction<boolean>) => {
			state.hasNext = action.payload;
		},
		updateProgram: (state: ProgramListState, action: PayloadAction<Program>) => {
			let program = action.payload as ProgramList & Program;
			let programs = [...state.list];
			let idx = programs.findIndex((program) => program.pk === action.payload.pk);
			programs[idx] = program;
			state.list = [...programs];
		},
		addProgram: (state: ProgramListState, action: PayloadAction<Program | ProgramList>) => {
			let programs = [...state.list];
			let idx = programs.findIndex((program) => program.pk === action.payload.pk);
			if (idx === -1) {
				programs.unshift(action.payload as ProgramList);
			} else {
				programs.splice(idx, 1, action.payload as ProgramList);
			}
			state.list = [...programs];
		},
		removeProgram: (state: ProgramListState, action: PayloadAction<number | string>) => {
			let programs = [...state.list];
			let idx = programs.findIndex((program) => program.pk === action.payload);
			if (idx !== -1) {
				programs.splice(idx, 1);
			}
			state.list = [...programs];
		},
		setProgramList: (state: ProgramListState, action: PayloadAction<Partial<ProgramListState>>) => {
			const { list, page, status, hasNext } = action.payload;
			if (Array.isArray(list)) state.list = list;
			if (page) state.page = page;
			if (status) state.status = status;
			if (hasNext !== undefined) state.hasNext = hasNext;
		},
	},
	extraReducers: {},
});

export * as programListSelectors from './selectors';
