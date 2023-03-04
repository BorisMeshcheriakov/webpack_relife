import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Program, ProgramDay, ProgramList } from 'library/models/programs';
import { ProgramVideo } from 'library/models/video';
import { Recommendation } from 'library/types/programs';

interface ProgramState {
	program: Program | null;
	exercises: ProgramVideo[];
	selectedVideos: ProgramVideo[];
	excludedVideos: number[][];
	recommendation: Recommendation | null;
}

const initialState: ProgramState = {
	program: null,
	exercises: [],
	selectedVideos: [],
	excludedVideos: [[], [], [], [], [], [], []],
	recommendation: null,
};

export const program = createSlice({
	name: 'programs/program',
	initialState,
	reducers: {
		setProgram: (state: ProgramState, action: PayloadAction<Program | null>) => {
			state.program = action.payload;

			if (action.payload?.periodicity) {
				/**
				 * При открытии программы с периодичностью нам приходит массив дней с вложенным массивом видео.
				 * Достаем из него уникальные видео и располагаем по порядку
				 */
				let allDays: ProgramDay[] = action.payload.videos as ProgramDay[];
				let allVideos: ProgramVideo[][] = allDays.map((video) => video.exercises);
				let flattenVideos: ProgramVideo[] = [];
				flattenVideos = flattenVideos.concat(...allVideos);
				let uniqueVideos = flattenVideos.filter(
					(video, index, arr) => arr.map((x) => x.id).indexOf(video.id) === index
				);
				state.exercises = uniqueVideos;
			} else {
				// В программе без периодичности приходит просто массив видео
				state.exercises = action.payload ? (action.payload?.videos as ProgramVideo[]) : [];
			}
			state.excludedVideos = action.payload
				? action.payload?.excluded_videos_period
				: [[], [], [], [], [], [], []];
		},
		clearSelected: (state: ProgramState) => {
			// Убрать данные программы для просмотра (например, при выходе их редактора)
			state.program = null;
			state.selectedVideos = [];
			state.exercises = [];
			state.excludedVideos = [[], [], [], [], [], [], []];
		},
		setProgramVideoList: (state: ProgramState, action: PayloadAction<ProgramVideo[]>) => {
			// Изменить список видео в редакторе программы
			state.exercises = action.payload;

			// корректируем периодичность
			let allVideos = action.payload.map((video) => video.id);
			let newExcluded = [];
			for (const day of state.excludedVideos) {
				let excludedVideos = allVideos.filter((video) => day.includes(video));
				newExcluded.push(excludedVideos);
			}
			state.excludedVideos = newExcluded;
		},
		setSelectedVideoList: (state: ProgramState, action: PayloadAction<ProgramVideo[]>) => {
			// Изменить список выбранных программ для редактора
			state.selectedVideos = action.payload ?? [];
		},
		setExcluded: (state: ProgramState, action: PayloadAction<number[][]>) => {
			// Изменить периодичность в программе
			state.excludedVideos = action.payload;
		},
		changeProgram: (state: ProgramState, action: PayloadAction<Program | ProgramList>) => {
			// TODO Разбить хук по спискам
			// let userPrograms = [...state.userPrograms.list];
			// let idx = userPrograms.findIndex((program) => program.pk === action.payload.pk);
			// if (idx !== -1) {
			// 	userPrograms.splice(idx, 1, action.payload as ProgramList);
			// 	state.userPrograms.list = [...userPrograms];
			// }
			// let programs = [...state.programs.list];
			// const mainIdx = state.programs.list.findIndex((program) => program.pk === action.payload.pk);
			// if (mainIdx !== -1) {
			// 	programs.splice(mainIdx, 1, action.payload as ProgramList);
			// 	state.programs.list = [...programs];
			// }
			// if (state.program) {
			// 	state.program = action.payload as Program;
			// }
		},
		setRecommendation: (state: ProgramState, action: PayloadAction<Recommendation | null>) => {
			state.recommendation = action.payload;
		},
	},
	extraReducers: {},
});

export * as programSelectors from './selectors';
