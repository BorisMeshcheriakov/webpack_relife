import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import { useModuleSettings } from 'library/hooks/module';
import { useAppDispatch, useAppSelector } from 'library/hooks/common';

import {
	selectUserProgramsListData,
	resetUserList,
	setUserListTags,
	setUserProgramListSearch,
	resetVideoList,
	setVideoListTags,
	setVideoListSearch,
	selectVideoListData,
	selectTags,
	setProgram,
} from 'library/redux/programs';

import { ModalLarge } from 'library/components/common';
import {
	Filter,
	Videos,
	NavTab,
	ModalProgram,
	ModalProgramEditor,
	ModalRecommend,
} from 'library/components/programs';
import { Card } from 'library/components/ui';
import { Programs, AddNew } from './frames';
import { SelectChangeEvent } from '@mui/material';

import st from './ModalManager.module.scss';

type Tab = 'Программы' | 'Видео' | string;

const ModalManager: React.FC = () => {
	const dispatch = useAppDispatch();
	const { push } = useHistory();
	const { url } = useRouteMatch();
	const { locationRoot } = useModuleSettings();
	const [selectedTab, setSelectedTab] = React.useState<Tab>('programs');

	const tagList = useAppSelector(selectTags);
	const { tags, search } = useAppSelector(selectUserProgramsListData);

	const { videoTags, videoSearch } = useAppSelector(selectVideoListData);

	const tabs = [
		{ title: 'Программы', code: 'programs' },
		{ title: 'Видео', code: 'video' },
	];

	const onTabChange = (tab: string) => {
		setSelectedTab(tab);
	};

	const onTagChange = (e: SelectChangeEvent<number[]>) => {
		if (selectedTab === 'programs') {
			dispatch(setUserListTags(e.target.value as number[]));
			dispatch(resetUserList());
		}

		if (selectedTab === 'video') {
			dispatch(setVideoListTags(e.target.value as number[]));
			dispatch(resetVideoList());
		}
	};

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (selectedTab === 'programs') {
			dispatch(setUserProgramListSearch(e.target.value));
			dispatch(resetUserList());
		}

		if (selectedTab === 'video') {
			dispatch(setVideoListSearch(e.target.value));
			dispatch(resetVideoList());
		}
	};

	const onProgramEditorClose = () => {
		push(`${url}`);
		setSelectedTab('programs');
		dispatch(setProgram(null));
	};

	const close = () => {
		push(`/${locationRoot}`);
		dispatch(resetVideoList());
		dispatch(resetUserList());
	};

	return (
		<ModalLarge title="Управление программами" onRequestClose={close} isOpen close={close}>
			<Card className={st.toolbar}>
				<div className={st.toolbar__tabs}>
					{tabs.map((tab) => (
						<NavTab
							key={tab.code}
							onClick={() => onTabChange(tab.code)}
							isActive={tab.code === selectedTab}
						>
							{tab.title}
						</NavTab>
					))}
				</div>
				<div className={st.toolbar__buttons}>
					<Filter
						onChange={onTagChange}
						onSearch={onSearch}
						search={selectedTab === 'programs' ? search : videoSearch}
						tags={tagList}
						selected={selectedTab === 'programs' ? tags : videoTags}
					/>

					<AddNew tab={selectedTab} onTabChange={onTabChange} />
				</div>
			</Card>

			{selectedTab === 'programs' && <Programs />}
			{selectedTab === 'video' && <Videos mode="view" />}

			<Switch>
				<Route
					path={`${url}/program/:id/edit`}
					render={() => <ModalProgramEditor close={onProgramEditorClose} />}
				/>
				<Route
					path={`${url}/program/:id`}
					render={() => <ModalProgram close={() => push(url)} />}
				/>
				<Route
					path={`${url}/recommend/:recommendId`}
					render={() => <ModalRecommend close={() => push(url)} />}
				/>
			</Switch>
		</ModalLarge>
	);
};

export default ModalManager;
