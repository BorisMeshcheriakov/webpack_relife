import React from 'react';

type Action = { type: 'setEditOpen'; payload: boolean };
type Dispatch = (action: Action) => void;
type State = {
	isEditOpen: boolean;
};
type ProfileProviderProps = { children: React.ReactNode };
const initialState: State = { isEditOpen: false };
const ProfileContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
	undefined
);

function notesReducer(state: State, action: Action): State {
	const { type, payload } = action;

	switch (type) {
		case 'setEditOpen': {
			return { ...state, isEditOpen: payload };
		}
		default: {
			return state;
		}
	}
}

function ProfileProvider({ children }: ProfileProviderProps) {
	const [state, dispatch] = React.useReducer(notesReducer, initialState);

	const value = { state, dispatch };
	return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

function useProfile() {
	const context = React.useContext(ProfileContext);

	if (context === undefined) {
		throw new Error('useProfile must be used within a ProfileProvider');
	}
	return context;
}

export { ProfileProvider, useProfile };
