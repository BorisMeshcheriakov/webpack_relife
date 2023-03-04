import React from 'react';
import { ClientList } from 'library/models/clients';

import { User } from 'library/components/schedules';

import st from './Nav.module.scss';
import { IconButton } from '@mui/material';
import { Info } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { Coach } from 'library/models/users';
import { useUser } from 'library/hooks/user';

type Props = {
	user: ClientList | Coach | undefined | null;
};

const Nav: React.FC<Props> = ({ user }) => {
	const { push } = useHistory();
	const currentUser = useUser();

	return (
		<div className={st.nav}>
			<div className={st.nav__left}>
				{user && (
					<div className={st.nav__user}>
						<User
							photo={user.photo}
							last_name={user.last_name}
							first_name={user.first_name}
							middle_name={user.middle_name}
						/>
						<div className={st.nav__about}>
							<IconButton
								onClick={() =>
									push(
										currentUser.user?.is_coach
											? `/clients/${user.id}`
											: `/specialists/specialist/${user.id}`
									)
								}
							>
								<Info />
							</IconButton>
						</div>
					</div>
				)}
			</div>
			<div className={st.nav__right}></div>
		</div>
	);
};

export default Nav;
