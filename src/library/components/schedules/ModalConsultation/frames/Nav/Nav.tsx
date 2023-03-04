import React from 'react';
import { useHistory } from 'react-router-dom';
import { User } from 'library/models/users';
import { Consultation } from 'library/models/schedules';

import { IconButton } from '@mui/material';
import { Info } from '@mui/icons-material';

import { User as UserComponent } from 'library/components/schedules';
import { Menu } from './frames';

import st from './Nav.module.scss';
import { useModulePermissions } from 'library/hooks/module';

type Props = {
	user: User | undefined;
	consultation: Consultation;
};

const Nav: React.FC<Props> = ({ user, consultation }) => {
	const { push } = useHistory();
	const { can_sell } = useModulePermissions();

	return (
		<div className={st.nav}>
			<div className={st.nav__left}>
				{user && (
					<div className={st.nav__user}>
						<UserComponent
							photo={user.photo}
							last_name={user.last_name}
							first_name={user.first_name}
							middle_name={user.middle_name}
						/>
						<div className={st.nav__about}>
							<IconButton
								onClick={() => push(can_sell ? `/clients` : `/specialists/specialist/${user.id}`)}
							>
								<Info />
							</IconButton>
						</div>
					</div>
				)}
			</div>
			<div className={st.nav__right}>
				<Menu consultation={consultation} />
			</div>
		</div>
	);
};

export default Nav;
