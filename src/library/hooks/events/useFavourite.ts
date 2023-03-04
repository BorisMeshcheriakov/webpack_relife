import { useAppDispatch } from 'library/hooks/common';
import { patchEvent } from 'library/redux/events';

import { eventService } from 'library/api/eventService';
// import { AxiosError } from 'axios';

const useFavourite = () => {
	const dispatch = useAppDispatch();

	const updateEvent = async (id: number, data: { published?: boolean; favorite?: boolean }) => {
		dispatch(patchEvent({ id: id, data }));
	};

	const addFavourite = async (id: number) => {
		updateEvent(id, { favorite: true });
		try {
			const response = await eventService.addEventToFavorites(id);
			if (!response.data) {
				throw response;
			}
		} catch (error) {
			// const err = error as AxiosError;
			// console.log(err);
		}
	};

	const removeFavourite = async (id: number) => {
		updateEvent(id, { favorite: false });
		try {
			const response = await eventService.deleteEventFromFavorites(id);
			if (response.status !== 204) {
				throw response;
			}
		} catch (error) {
			// const err = error as AxiosError;
			// console.log(err);
		}
	};

	return {
		addFavourite,
		removeFavourite,
	};
};

export default useFavourite;
