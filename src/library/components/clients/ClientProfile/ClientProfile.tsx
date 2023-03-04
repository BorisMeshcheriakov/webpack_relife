import React from 'react';

import { useClient, useMenuClient } from 'library/hooks/clients';

import { Card, Menu, useProfile, ModalCreate } from 'library/components/clients';
import { Avatar } from '@mui/material';
import { Notes, Tabs, ModalProvider, Programs, Schedules } from './frames';
import { AlternateEmail, Call } from '@mui/icons-material';

import { getFullName, getCurrentAge, getGender } from 'library/helpers/user';

import { useAppSelector } from 'library/hooks/common';
import { selectTab } from 'library/redux/clients';

import st from './ClientProfile.module.scss';

const ClientProfile: React.FC = () => {
	const { client } = useClient();
	const { open, anchorEl, handleClick, handleClose, actions } = useMenuClient(client);
	const { state, dispatch } = useProfile();
	const tab = useAppSelector(selectTab);

	return (
		<div className={st.client}>
			<Card className={st.info}>
				{client && (
					<>
						<section className={st.info__photo}>
							<Avatar sx={{ width: 90, height: 90 }} src={client.photo}>
								{client.last_name?.slice(0, 1)}
							</Avatar>
						</section>
						<section className={st.info__data}>
							<h3 className={st.info__name}>{getFullName(client)}</h3>
							<p className={st.info__birthdate}>
								<span>{getCurrentAge(client.birth_date)}, </span>
								<span>{getGender(client.gender)}</span>
							</p>
							{client.email && (
								<p className={st.info__contact}>
									<AlternateEmail sx={{ fontSize: 14 }} />
									<span>{client.email}</span>
								</p>
							)}

							{client.phone && (
								<p className={st.info__contact}>
									<Call sx={{ fontSize: 14 }} />
									<span>{client.phone}</span>
								</p>
							)}
							<div className={st.tags}></div>
						</section>
						<section className={st.info__menu}>
							<Menu
								open={open}
								anchorEl={anchorEl}
								handleClick={handleClick}
								handleClose={handleClose}
								actions={actions}
							/>
						</section>
					</>
				)}
			</Card>

			<Tabs />

			<ModalProvider>
				<Card className={st.tab}>
					{tab === 'notes' && client?.user.id && <Notes id={client?.user.id} />}
					{tab === 'schedules' && client?.user.id && <Schedules id={client?.user.id!} />}
					{tab !== 'schedules' && tab !== 'notes' && <Programs />}
				</Card>

				{state.isEditOpen && (
					<ModalCreate
						client={client}
						onClose={() => dispatch({ type: 'setEditOpen', payload: false })}
						// onSuccess={setClientData}
					/>
				)}
			</ModalProvider>
		</div>
	);
};

export default ClientProfile;
