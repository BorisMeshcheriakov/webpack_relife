import React from 'react';
import SVG from 'react-inlinesvg';
import { useAppSelector } from 'library/hooks/common';
import { selectMode } from 'library/redux/schedules';
import { selectConsultationSettings } from 'library/redux/users/selectors';

import { icons } from 'resources/icons/schedules';
import { verboseDuration } from 'library/helpers/schedules';

const Settings: React.FC = () => {
	const mode = useAppSelector(selectMode);
	const settings = useAppSelector(selectConsultationSettings);
	const getSettings = (settings: { cost: number; duration: number; prepayment: number } | null) => {
		let text = `-- / --`;
		if (settings) {
			const { duration, cost } = settings;
			let dateDuration = verboseDuration(duration);

			text = `${dateDuration} / ${cost / 100} ₽`;
		}
		return text;
	};

	return (
		<>
			<SVG src={icons.clock} />
			<span style={{ marginLeft: 5 }}>{getSettings(settings ? settings[mode] : null)}</span>
		</>
	);
};

export default Settings;
