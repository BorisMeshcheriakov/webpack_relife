import React from 'react';
import { commonService } from 'library/api/commonService';

const useLoadCommonSettings = () => {
	React.useEffect(() => {
		const defaultSettings = {
			moderation: true,
			allow_coach_register: false,
		};

		const getCommonSettings = async () => {
			try {
				const response = await commonService.getCommonSettings();

				if (!response.data) {
					throw response;
				}

				localStorage.setItem('settings', JSON.stringify(response.data));
			} catch (error) {
				console.error(error);
				localStorage.setItem('settings', JSON.stringify(defaultSettings));
			}
		};

		getCommonSettings();
	}, []);
};

export default useLoadCommonSettings;
