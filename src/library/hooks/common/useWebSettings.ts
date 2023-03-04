import { WebSettings } from 'library/models/common';

const useWebSettings = () => {
	const savedSettings = localStorage.getItem('webSettings');
	const settings: WebSettings = savedSettings
		? JSON.parse(savedSettings)
		: ({
				favicon: null,
				resource_name: null,
				logo: null,
				logo_url: null,
		  } as WebSettings);

	return {
		...settings,
	};
};

export default useWebSettings;
