import { Avatar } from '@mui/material';
import { useUser } from 'library/hooks/user';
import { Consultation } from 'library/models/schedules';
import React from 'react';

import st from './Toolbar.module.scss';

type Props = {
	consultation: Consultation;
};

const Toolbar: React.FC<Props> = ({ consultation }) => {
	const { user } = useUser();
	return (
		<div className={st.toolbar}>
			<Avatar
				sx={{ width: 40, height: 40 }}
				src={user?.is_coach ? consultation.user?.photo ?? '' : consultation.coach.photo}
			>
				{user?.is_coach ? consultation.user.last_name : consultation.coach.last_name}
			</Avatar>
			<div className={st.toolbar__name}>
				{`${consultation[user?.is_coach ? 'user' : 'coach'].last_name} ${
					consultation[user?.is_coach ? 'user' : 'coach'].first_name
				}`}
			</div>
		</div>
	);
};

export default Toolbar;
