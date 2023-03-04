import xhr from 'core/axios/config';
import { AxiosResponse } from 'axios';

const sendFeedback = async (data: {
	subject: string;
	comment: string;
}): Promise<AxiosResponse<any>> => xhr.post(`/api/v1/feedbacks/`, data);

export const feedbacksService = {
	sendFeedback,
};
