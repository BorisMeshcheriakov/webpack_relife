import { Note } from 'library/models/clients';
import React from 'react';

type Action =
	| { type: 'setNotes'; payload: Note[] }
	| { type: 'reset'; payload: any }
	| { type: 'setStatus'; payload: 'idle' | 'loading' }
	| { type: 'setPage'; payload: number }
	| { type: 'setHasNext'; payload: boolean };
type Dispatch = (action: Action) => void;
type State = {
	notes: Note[];
	page: number;
	hasNext: boolean;
	status: 'loading' | 'idle';
};
type NotesProviderProps = { children: React.ReactNode };
const initialState: State = { notes: [], page: 1, hasNext: true, status: 'idle' };
const NotesContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
	undefined
);

function notesReducer(state: State, action: Action): State {
	const { type, payload } = action;

	switch (type) {
		case 'setNotes': {
			return { ...state, notes: payload };
		}
		case 'reset': {
			return { ...state, notes: [], page: 1, hasNext: true, status: 'idle' };
		}
		case 'setStatus': {
			return { ...state, status: action.payload };
		}
		case 'setPage': {
			return { ...state, page: action.payload };
		}
		case 'setHasNext': {
			return { ...state, hasNext: action.payload };
		}
		default: {
			return state;
		}
	}
}

function NotesProvider({ children }: NotesProviderProps) {
	const [state, dispatch] = React.useReducer(notesReducer, initialState);

	const value = { state, dispatch };
	return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

function useNotes() {
	const context = React.useContext(NotesContext);

	if (context === undefined) {
		throw new Error('useNotes must be used within a NotesProvider');
	}
	return context;
}

export { NotesProvider, useNotes };
