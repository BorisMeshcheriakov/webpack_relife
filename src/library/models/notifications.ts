export interface Notification {
	id: number;
	created: string;
	type: string;
	metadata: string;
	is_readed: boolean;
	is_sended: boolean;
	need_mail: boolean;
	source: string;
	html_body: string;
	text_body: string;
}

export interface NotificationResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Notification[];
}
