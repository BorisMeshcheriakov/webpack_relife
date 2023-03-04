import { ClientList, Note } from 'library/models/clients';
import { Individual } from 'library/models/programs';

export interface ClientsState {
	clients: {
		search: string;
		status: 'idle' | 'loading';
		hasNext: boolean;
		page: number;
		list: ClientList[];
	};
	selectedClient: number | null;
	client: ClientList | null;
	tab: string;
	notes: {
		noteModal: { isOpen: boolean; note: number | null };
		list: {
			status: 'idle' | 'loading';
			hasNext: boolean;
			page: number;
			list: Note[];
		};
	};
	programs: {
		list: {
			status: 'idle' | 'loading';
			hasNext: boolean;
			page: number;
			list: Individual[];
		};
	};
}
