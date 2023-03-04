import { Statistics } from 'library/models/statistics';

export interface StatisticsState {
	tab: Tab;
	date: string;
	graphicsType: GraphType;
	statistics: {
		tab: Tab;
		date: string;
		graphicsType: GraphType;
		list: List;
	};
	statisticsLists: {
		[key: string]: List;
	};
}

export interface List {
	title: Title;
	status: Status;
	list: Statistics[];
}

export interface reqStatistics {
	mode: Mode;
	date: string;
}

export interface Tab {
	code: Mode;
	title: string;
}

export type Status = 'idle' | 'loading';

export type Title = 'events' | 'programs' | 'tickets' | 'consultations' | 'orders' | null;

export type Mode = 'year' | 'month';

export type BntType = 'add' | 'rem';

export type GraphType = 'histogram' | 'graphic';
