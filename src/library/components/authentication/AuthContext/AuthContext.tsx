import React from 'react';

type Action =
	| { type: 'phone'; payload: string }
	| { type: 'tab'; payload: string | boolean }
	| { type: 'head'; payload: string };
type Dispatch = (action: Action) => void;
type State = { phone: string; tab: string | boolean; head: string };
type AuthProviderProps = { children: React.ReactNode };

const initialState: State = { phone: '', tab: 'login', head: '' };

const AuthStateContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
	undefined
);

function authReducer(state: State, action: Action) {
	const { type, payload } = action;

	switch (type) {
		case 'phone': {
			return { ...state, phone: payload };
		}

		case 'tab': {
			return { ...state, tab: payload };
		}

		case 'head': {
			return { ...state, head: payload };
		}
		default: {
			return state;
		}
	}
}

function AuthProvider({ children }: AuthProviderProps) {
	const [state, dispatch] = React.useReducer(authReducer, initialState);

	const value = { state, dispatch };
	return <AuthStateContext.Provider value={value}>{children}</AuthStateContext.Provider>;
}

function useAuth() {
	const context = React.useContext(AuthStateContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
}

export { AuthProvider, useAuth };
