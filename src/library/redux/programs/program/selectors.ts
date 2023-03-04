import { RootState } from 'core/redux/store';

export const selectProgram = (state: RootState) => state.programs.program.program;

// упражнения, добавленные в программу в редакторе
export const selectProgramVideos = (state: RootState) => state.programs.program.exercises;

// исключенные из периодичности упражнения
export const selectExcludedVideos = (state: RootState) => state.programs.program.excludedVideos;

// упражнения, добавляемые в программу в отдельном окне
export const selectedVideosList = (state: RootState) => state.programs.program.selectedVideos;

// комментарий к рекомендации программы и его автор
export const selectRecommendation = (state: RootState) => state.programs.program.recommendation;
