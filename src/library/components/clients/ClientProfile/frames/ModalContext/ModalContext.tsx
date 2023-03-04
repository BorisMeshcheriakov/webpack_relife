import React from 'react';

type Action =
	| { type: 'openNoteModal'; payload: string | number | null | undefined }
	| { type: 'openVideoModal'; payload: boolean }
	| { type: 'openSchedulesModal'; payload: boolean };
type Dispatch = (action: Action) => void;
type State = {
	noteModalOpen: string | number | null | undefined;
	videoModalOpen: boolean;
	schedulesModalOpen: boolean;
};
type ModalProviderProps = { children: React.ReactNode };
const initialState: State = {
	noteModalOpen: null,
	videoModalOpen: false,
	schedulesModalOpen: false,
};
const ModalContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
	undefined
);

function notesReducer(state: State, action: Action): State {
	const { type, payload } = action;

	switch (type) {
		case 'openNoteModal': {
			return { ...state, noteModalOpen: payload };
		}
		case 'openVideoModal': {
			return { ...state, videoModalOpen: payload };
		}
		case 'openSchedulesModal': {
			return { ...state, schedulesModalOpen: payload };
		}
		default: {
			return state;
		}
	}
}

function ModalProvider({ children }: ModalProviderProps) {
	const [state, dispatch] = React.useReducer(notesReducer, initialState);

	const value = { state, dispatch };
	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

function useModal() {
	const context = React.useContext(ModalContext);

	if (context === undefined) {
		throw new Error('useModal must be used within a ModalProvider');
	}
	return context;
}

export { ModalProvider, useModal };
