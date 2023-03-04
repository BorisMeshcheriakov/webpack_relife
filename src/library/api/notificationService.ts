import xhr from 'core/axios/config';
import { AxiosResponse } from 'axios';
import { Notification, NotificationResponse } from 'library/models/notifications';

const getNotificationsList = async (query?: string): Promise<AxiosResponse<NotificationResponse>> =>
	xhr.get(`/api/v1/notifications/notification/?${query ?? ''}`);

const changeNotificationsStatus = async (
	id: number,
	data: any
): Promise<AxiosResponse<Notification>> =>
	xhr.patch(`/api/v1/notifications/notification/${id}/read_status/`, data);

const getNotification = async (id: number): Promise<AxiosResponse<Notification>> =>
	xhr.patch(`/api/v1/notifications/notification/${id}/`);

export const notificationService = {
	getNotificationsList,
	changeNotificationsStatus,
	getNotification,
};
