import { ModuleRead } from 'library/models/common';

export interface CommonState {
	modules: ModuleRead[];
	modulesLoading: boolean;
	modulesStatus: string;
}

export interface MenuAction {
	[key: string]: {
		title: string;
		action: () => void;
	};
}

export type LoadStatus = 'idle' | 'loading';
