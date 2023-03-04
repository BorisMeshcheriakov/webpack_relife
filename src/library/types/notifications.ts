import { Notification } from 'library/models/notifications';

export interface NotificationsState {
	notificationsList: {
		list: Notification[];
		page: number;
		status: 'idle' | 'loading';
		hasMore: boolean;
		count: number;
	};
}

export interface GetNotificationsResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Notification[];
}
