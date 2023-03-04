import React from 'react';
import { AxiosError } from 'axios';
import { openNotifyModal, showPopup } from 'library/redux/modal';
import { useAppDispatch } from './reduxTypedHooks';

const useErrorHandler = () => {
	const dispatch = useAppDispatch();
	const handleError = React.useCallback(
		(error: any) => {
			console.error(error);
			try {
				const err = error as AxiosError;
				let message = '';
				if (err.response?.status === 400) {
					let errMessage = JSON.parse(err.response?.data);
					message = errMessage.status_text;

					dispatch(
						openNotifyModal({
							title: 'error',
							text: `400: ${message}`,
							confirmText: 'Ок',
						})
					);
					return;
				}
			} catch (error) {
				let message = error;
				dispatch(
					showPopup({
						type: 'error',
						text: `400: ${message}`,
					})
				);
			}

			return;
		},
		[dispatch]
	);

	return {
		handleError,
	};
};

export default useErrorHandler;
