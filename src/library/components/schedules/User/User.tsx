import React from 'react';

import { Avatar } from '@mui/material';

import st from './User.module.scss';

type Props = {
	photo: string | any;
	last_name: string;
	first_name: string;
	middle_name: string | null | undefined;
};

const User: React.FC<Props> = ({ photo, last_name, first_name, middle_name }) => {
	return (
		<section className={st.user}>
			<Avatar sx={{ width: 40, height: 40, marginRight: '10px' }} src={photo}>
				{last_name.slice(0, 1)}
			</Avatar>
			<span>{`${last_name} ${first_name} ${middle_name ? middle_name : ''}`}</span>
		</section>
	);
};

export default User;
