import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge } from '@mui/material';
import { Notifications } from 'shared/assets';
import { useAppSelector } from 'library/hooks/common';
import { selectSortNotifications } from 'library/redux/notifications';
import { isEqual } from 'lodash';

import st from './ButtonNotifications.module.scss';

const ButtonNotifications: FC = () => {
	const newNotifications = useAppSelector(selectSortNotifications, isEqual);
	return (
		<NavLink to="/notifications" className={st.btn}>
			<Badge
				color="secondary"
				variant="dot"
				invisible={!newNotifications.unread.length}
				classes={{ dot: st.dot }}
			>
				<Notifications />
			</Badge>
		</NavLink>
	);
};

export default memo(ButtonNotifications);
