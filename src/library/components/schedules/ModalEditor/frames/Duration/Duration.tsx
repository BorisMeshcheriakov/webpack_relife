import React from 'react';

import { useAppSelector } from 'library/hooks/common';
import { selectMode } from 'library/redux/schedules';

import { ModalSettings, ModalAddress, Button, Settings, MenuAddress } from './frames';

import st from './Duration.module.scss';

const Duration: React.FC = () => {
	const mode = useAppSelector(selectMode);

	const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
	const [isAddressOpen, setIsAddressOpen] = React.useState(false);

	const toggleSettings = () => {
		setIsSettingsOpen((open) => !open);
	};

	const toggleAddress = () => {
		setIsAddressOpen((open) => !open);
	};

	return (
		<div className={st.duration}>
			{mode === 'OF' && <MenuAddress onSetup={toggleAddress} />}

			<Button onClick={toggleSettings}>
				<Settings />
			</Button>

			{isSettingsOpen && <ModalSettings close={toggleSettings} />}
			{isAddressOpen && <ModalAddress close={toggleAddress} />}
		</div>
	);
};

export default Duration;
