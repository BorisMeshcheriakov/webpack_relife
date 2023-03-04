import { parseISO, format } from 'date-fns';
import { schedulesService } from 'library/api/schedulesService';
import { ChangeTimeRequest } from 'library/models/schedules';
import React from 'react';

type Props = {
	requestId: number;
};

const useChangeTime = ({ requestId }: Props) => {
	const [request, setRequest] = React.useState<ChangeTimeRequest | null>(null);
	React.useEffect(() => {
		const getChangeRequest = async (id: number) => {
			if (!id) return;

			try {
				const response = await schedulesService.getChangeTime(id);
				if (!response.data) throw response;
				setRequest(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		getChangeRequest(requestId);

		return () => {};
	}, [requestId]);

	return {
		requestId,
		request,
		oldTime: request
			? format(parseISO(request.origin_schedule.start_time), 'dd.MM.yyyy, HH:mm')
			: '',
		newTime: request ? format(parseISO(request.start_time), 'dd.MM.yyyy, HH:mm') : '',
	};
};

export default useChangeTime;
