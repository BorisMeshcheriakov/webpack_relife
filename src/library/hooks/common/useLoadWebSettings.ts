import { commonService } from 'library/api/commonService';
import { WebSettings } from 'library/models/common';
import React from 'react';

const useLoadWebSettings = () => {
	const loadSavedSettings = () => {
		const favicon = document.getElementById('favicon-platform') as any;
		const storedSettings = localStorage.getItem('webSettings');

		if (favicon && storedSettings) {
			const webSettings: WebSettings = JSON.parse(storedSettings);
			favicon.href = `${window.location.origin}${webSettings.favicon}`;
			document.title = webSettings.resource_name ?? '';
		}
	};

	React.useEffect(() => {
		const getWebSettings = async () => {
			loadSavedSettings();

			try {
				const response = await commonService.getWebSettings();

				if (!response.data) {
					throw response;
				}

				localStorage.setItem('webSettings', JSON.stringify(response.data));

				const favicon = document.getElementById('favicon-platform') as any;
				favicon.href = `${window.location.origin}${response.data.favicon}`;
				document.title = response.data.resource_name ?? '';
			} catch (error) {
				console.error(error);
			}
		};

		getWebSettings();
	}, []);
};

export default useLoadWebSettings;
