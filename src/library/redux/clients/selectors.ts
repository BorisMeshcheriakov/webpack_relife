import type { RootState } from 'core/redux/store';

export const selectClients = (state: RootState) => state.clients.clients;

export const selectClient = (state: RootState) => state.clients.client;

export const selectTab = (state: RootState) => state.clients.tab;

export const selectIsNoteOpen = (state: RootState) => state.clients.notes.noteModal;

export const selectNoteList = (state: RootState) => state.clients.notes.list;

export const selectClientPrograms = (state: RootState) => state.clients.programs.list;
