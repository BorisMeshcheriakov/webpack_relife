import React from 'react';
import { Tabs as MuiTabs, Tab, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

import { useModuleSettings } from 'library/hooks/module';

import { useHistory, useRouteMatch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { changeTab, openNoteModal, selectTab } from 'library/redux/clients';

import st from './Tabs.module.scss';

const Tabs: React.FC = () => {
	const dispatch = useAppDispatch();
	const { modules } = useModuleSettings();
	const { url } = useRouteMatch();
	const { push } = useHistory();

	const tab = useAppSelector(selectTab);

	// const { dispatch } = useModal();

	const buttons: {
		[x: string]: {
			title: string;
			action: () => void;
		};
	} = {
		notes: {
			title: 'Новая заметка',
			action: () => dispatch(openNoteModal({ isOpen: true, note: null })),
		},
		video: {
			title: 'Рекомендовать',
			action: () => push(`${url}/recommend-program`),
		},
		schedules: {
			title: 'Записать',
			action: () => push(`${url}/assign-consultation`),
		},
	};

	const onChange = (tab: string) => dispatch(changeTab(tab));

	const getTabKey = (tab: string) => (isNaN(parseInt(tab)) ? tab : 'video');

	return (
		<section className={st.tabs}>
			<div className={st.tabs__tabs}>
				<MuiTabs
					value={tab}
					variant="scrollable"
					scrollButtons="auto"
					allowScrollButtonsMobile
					onChange={(event: React.SyntheticEvent, newValue: string) => onChange(newValue)}
				>
					<Tab label="Заметки" value={'notes'} sx={{ height: 60 }} />
					{modules
						?.filter(
							(module) => module.settings.type === 'video' || module.settings.type === 'schedules'
						)
						.map((module) => (
							<Tab
								key={module.id}
								label={module.verbose_name}
								value={module.code}
								sx={{ height: 60 }}
							/>
						))}
				</MuiTabs>
			</div>
			<div className={st.tabs__add} onClick={buttons[getTabKey(tab)].action}>
				<span>{buttons[getTabKey(tab)].title}</span>
				<IconButton
					sx={{ width: 34, height: 34, border: '1px solid #616f82', color: '#616f82', padding: 0 }}
				>
					<Add fontSize="small" />
				</IconButton>
			</div>
		</section>
	);
};

export default Tabs;
