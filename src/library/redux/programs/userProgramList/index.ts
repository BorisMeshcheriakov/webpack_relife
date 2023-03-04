import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Program, ProgramList } from 'library/models/programs';

interface UserProgramsListState {
	list: ProgramList[];
	status: 'idle' | 'loading';
	page: number;
	hasNext: boolean;
	search: string;
	tags: number[];
}

const initialState: UserProgramsListState = {
	list: [],
	status: 'idle',
	page: 1,
	hasNext: true,
	search: '',
	tags: [],
};

export const userProgramsList = createSlice({
	name: 'programs/userPrograms',
	initialState,
	reducers: {
		resetUserList: (state: UserProgramsListState) => {
			state.list = [];
			state.page = 1;
			state.hasNext = true;
			state.status = 'idle';
		},
		setUserPrograms: (state: UserProgramsListState, action: PayloadAction<ProgramList[]>) => {
			state.list = action.payload;
		},
		setUserProgramListSearch: (state: UserProgramsListState, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setUserProgramListTags: (state: UserProgramsListState, action: PayloadAction<number[]>) => {
			state.tags = action.payload;
		},
		setUserProgramsStatus: (
			state: UserProgramsListState,
			action: PayloadAction<'idle' | 'loading'>
		) => {
			state.status = action.payload;
		},
		setUserProgramsPage: (state: UserProgramsListState, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setUserProgramsNext: (state: UserProgramsListState, action: PayloadAction<boolean>) => {
			state.hasNext = action.payload;
		},
		setUserListTags: (state: UserProgramsListState, action: PayloadAction<number[]>) => {
			state.tags = action.payload;
		},
		updateUserProgram: (state: UserProgramsListState, action: PayloadAction<Program>) => {
			let program = action.payload as ProgramList & Program;
			let programs = [...state.list];
			let idx = programs.findIndex((program) => program.pk === action.payload.pk);
			programs[idx] = program;
			state.list = [...programs];
		},
		addUserProgram: (
			state: UserProgramsListState,
			action: PayloadAction<Program | ProgramList>
		) => {
			let programs = [...state.list];
			let idx = programs.findIndex((program) => program.pk === action.payload.pk);
			if (idx === -1) {
				programs.unshift(action.payload as ProgramList);
			} else {
				programs.splice(idx, 1, action.payload as ProgramList);
			}
			state.list = [...programs];
		},
	},
	extraReducers: {},
});

export * as userProgramListSelectors from './selectors';
