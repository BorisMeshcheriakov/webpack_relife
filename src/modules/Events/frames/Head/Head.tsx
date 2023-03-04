import React from 'react';
import cn from 'classnames';
import { Route, NavLink } from 'react-router-dom';

import { useAppSelector } from 'library/hooks/common';
import { selectTab } from 'library/redux/events';

import { useSearch } from 'library/hooks/events';
import { useTags } from 'library/hooks/events';

import { ButtonTooltip, Search } from 'library/components/common';
import { Tabs, ModalFilter } from './frames';
import { Badge } from '@mui/material';

import { icons } from 'resources/icons/events';
import st from './Head.module.scss';

const Head: React.FC = () => {
	const tab = useAppSelector(selectTab);
	const searchTag = useSearch();
	const tags = useTags();

	return (
		<>
			<section className={st.header}>
				<div className={st.header__tabs}>
					<Tabs />
				</div>
				<div className={st.header__buttons}>
					<div className={cn(st.show, searchTag.isOpen && st.open)}>
						<Search
							value={searchTag.search}
							setValue={searchTag.onChange}
							open={searchTag.open}
							close={searchTag.close}
							isOpen={searchTag.isOpen}
						/>
					</div>

					{tab.code === 'my' && (
						<NavLink to="/events/create" className={st.tab} activeClassName={st.active}>
							<ButtonTooltip icon={icons.plus} tooltip="Создать" />
						</NavLink>
					)}
					<Badge badgeContent={tags.selected.length} color="primary" sx={{ zIndex: 0 }}>
						<ButtonTooltip icon={icons.filterFix} tooltip="Теги" handler={tags.open} />
					</Badge>
				</div>
			</section>

			<section className={cn(st.header, searchTag.isOpen && st.search)}>
				<Search
					value={searchTag.search}
					setValue={searchTag.onChange}
					open={searchTag.open}
					close={searchTag.close}
					isOpen={searchTag.isOpen}
				/>
			</section>
			<Route path="/events">{tags.isOpen && <ModalFilter close={tags.close} />}</Route>
		</>
	);
};

export default Head;
