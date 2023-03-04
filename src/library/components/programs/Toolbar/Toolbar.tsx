import React from 'react';
import { Link, Route, useHistory, useRouteMatch } from 'react-router-dom';

import {
	selectTab,
	setSelectedTab,
	selectTags,
	selectSearch,
	selectProgramsListTags,
	reset,
	setSearch,
	setProgramListTags,
	setProgram,
} from 'library/redux/programs';

import { useModulePermissions, useModuleSettings } from 'library/hooks/module';
import { useAppDispatch, useAppSelector } from 'library/hooks/common';

import { PlaylistAdd, Add } from '@mui/icons-material';
import { Card } from 'library/components/ui';
import { IconButtonGrey, NavTab, Filter } from 'library/components/programs';
import { SelectChangeEvent, Tooltip } from '@mui/material';

import st from './Toolbar.module.scss';
import { useUser } from 'library/hooks/user';
import { ModalManager } from 'modules/Programs/frames';

interface Props {
	section: string;
}

const Toolbar: React.FC<Props> = ({ section }) => {
	const { path } = useRouteMatch();
	const { push } = useHistory();

	const dispatch = useAppDispatch();

	const { moduleSettings } = useModuleSettings(section);
	const { can_sell } = useModulePermissions();

	const { isAuth } = useUser();

	const tags = useAppSelector(selectTags);
	const selectedTab = useAppSelector(selectTab);
	const selectedTags = useAppSelector(selectProgramsListTags);
	const search = useAppSelector(selectSearch);

	const tabs: string[] = ['Все'];

	const onTabChange = (tab: string) => {
		dispatch(setSelectedTab(tab));
		dispatch(reset());
	};

	const onTagChange = React.useCallback(
		(e: SelectChangeEvent<number[]>) => {
			let tags = e.target.value;
			dispatch(setProgramListTags(tags as number[]));
			dispatch(reset());
		},
		[dispatch]
	);

	const onSearch = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			dispatch(setSearch(e.target.value));
			dispatch(reset());
		},
		[dispatch]
	);

	const onAdd = () => {
		dispatch(setProgram(null));
		push(`/${section}/program/new/edit`);
	};

	return (
		<Card className={st.toolbar}>
			<section className={st.toolbar__left}>
				{tabs.map((tab) => (
					<NavTab key={tab} isActive={tab === selectedTab.title} onClick={() => onTabChange(tab)}>
						{tab}
					</NavTab>
				))}

				{isAuth && (
					<NavTab
						isActive={selectedTab.title === 'Избранное'}
						onClick={() => onTabChange('Избранное')}
					>
						Избранное
					</NavTab>
				)}

				{can_sell && (
					<NavTab isActive={selectedTab.title === 'Мои'} onClick={() => onTabChange('Мои')}>
						Мои
					</NavTab>
				)}
			</section>
			<section className={st.toolbar__right}>
				<Filter
					selected={selectedTags}
					onChange={onTagChange}
					onSearch={onSearch}
					search={search}
					tags={tags}
					id="toolbar-filter"
				/>

				{can_sell &&
					selectedTab.title === 'Мои' &&
					(moduleSettings?.library ? (
						<Link to={`/${section}/manager`}>
							<Tooltip title="Управление программами">
								<div>
									<IconButtonGrey>
										<PlaylistAdd fontSize="small" />
									</IconButtonGrey>
								</div>
							</Tooltip>
						</Link>
					) : (
						<Tooltip title="Добавить программу">
							<div>
								<IconButtonGrey onClick={onAdd}>
									<Add fontSize="small" />
								</IconButtonGrey>
							</div>
						</Tooltip>
					))}
			</section>
			{can_sell && moduleSettings?.library && (
				<Route path={`${path}/manager`} render={() => <ModalManager />} />
			)}
		</Card>
	);
};

export default Toolbar;
