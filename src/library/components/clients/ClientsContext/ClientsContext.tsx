import React from 'react';
import { ClientList } from 'library/models/clients';

type Action =
	| { type: 'selectClient'; payload: number }
	| {
			type: 'setClient';
			payload: ClientList | null;
	  };
type Dispatch = (action: Action) => void;
type State = {
	selectedClient: number | null;
	clientData: ClientList | null;
};
type ClientsProviderProps = { children: React.ReactNode };
const initialState: State = { selectedClient: null, clientData: null };
const ClientsContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
	undefined
);

function clientsReducer(state: State, action: Action): State {
	const { type, payload } = action;

	switch (type) {
		case 'selectClient': {
			return { ...state, selectedClient: payload as number };
		}
		case 'setClient': {
			return { ...state, clientData: payload as ClientList };
		}
		default: {
			throw new Error(`Unhandled action type: ${type}`);
		}
	}
}

function ClientsProvider({ children }: ClientsProviderProps) {
	const [state, dispatch] = React.useReducer(clientsReducer, initialState);

	const value = { state, dispatch };
	return <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>;
}

function useClients() {
	const context = React.useContext(ClientsContext);

	if (context === undefined) {
		throw new Error('useClients must be used within a ClientsProvider');
	}
	return context;
}

export { ClientsProvider, useClients };
