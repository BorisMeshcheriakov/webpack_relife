import React from 'react';
import { programsService } from 'library/api/programsService';
import { useModuleSettings } from '../module';
import { useAppDispatch, useCertificateMessage } from 'library/hooks/common';

import { showPopup } from 'library/redux/modal';

const useProgramBuy = () => {
	const dispatch = useAppDispatch();
	const { locationRoot } = useModuleSettings();
	const [isProcessing, setIsProcessing] = React.useState(false);

	const { onRedirect } = useCertificateMessage();

	const buyProgram = async (id: number | string) => {
		setIsProcessing(true);
		try {
			localStorage.setItem('section', locationRoot);
			const response = await programsService.buyProgram(id);

			if (response.data.redirect_url) {
				onRedirect(response.data.redirect_url);
			}
		} catch (error) {
			console.error(error);
			dispatch(showPopup({ text: 'Оплата недоступна в данный момент', type: 'error' }));
		} finally {
			setIsProcessing(false);
		}
	};

	return {
		buyProgram,
		isProcessing,
	};
};

export default useProgramBuy;
