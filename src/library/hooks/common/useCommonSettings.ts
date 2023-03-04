import { CommonSettings } from 'library/models/common';

const useCommonSettings = (): CommonSettings => {
	const defaultSettings = { moderation: true };

	const settings = localStorage.getItem('settings');
	return settings ? JSON.parse(settings) : defaultSettings;
};

export default useCommonSettings;
