import React from 'react';
import SVG from 'react-inlinesvg';

import { addressToString } from 'library/helpers/common/consultations';

import circle from './resources/circle.svg';

import st from './index.module.scss';

const Offline = ({ Scroller, sessions, onSessionClick }) => {
	const noAddress = sortNoAddress(sessions);
	const hasAddress = sortByAddress(sessions);

	function sortNoAddress(sessions) {
		// сохраняем отдельно сессии без адреса

		if (!sessions) {
			return;
		}

		let allSessions = [...sessions];
		let noAddressSessions = [];

		for (const session of allSessions) {
			if (session.address && session.address.length === 0) {
				noAddressSessions.push(session);
			}
		}

		return noAddressSessions;
	}

	function sortByAddress(sessions) {
		/**
		 * сортируем сессии по адресам, преобразовывая массив
		 * сессий из [{сессия с адресом 1}, {сессия с адресом 2}] в
		 * [
		 *  {
		 *    address: адрес 1,
		 *    sessions:  [{ceccия с адресом 1}]
		 *  },
		 *  {
		 *    address: адрес 2,
		 *    sessions:  [{ceccия с адресом 2}]
		 *  }
		 * ]
		 */
		if (!sessions) {
			return;
		}

		let allSessions = [...sessions];

		let uniqAddress = allSessions
			.filter(
				(session, index, array) =>
					// находим сессии с уникальными адресами
					array.findIndex(
						(s) =>
							s.address.length > 0 &&
							session.address.length > 0 &&
							s.address[0].id === session.address[0].id
					) === index
			)
			.map((session) => ({
				// преобразовываем каждую сессию в объект с пустым массивом сессий
				address: session.address[0],
				sessions: [],
			}))
			.map((address) => {
				// заполняем каждый пустой массив сессиями с подходящими адресами
				let newAddress = { ...address };
				/* eslint-disable-next-line */
				let matchAddress = allSessions.filter((session) => {
					if (session.address.length > 0) {
						return session.address[0].id === newAddress.address.id;
					}
				});

				newAddress = { ...newAddress, sessions: [...matchAddress] };
				return newAddress;
			});

		return uniqAddress;
	}

	return (
		<div className={st.offline}>
			{noAddress.length > 0 && (
				<div className={st.title}>
					<SVG alt="" className={st.icon} src={circle} />
					<span>Без адреса</span>
				</div>
			)}
			{noAddress.length > 0 && (
				<Scroller sessions={noAddress} onSessionClick={onSessionClick} quantity={10} />
			)}
			{hasAddress.length > 0 &&
				hasAddress.map((address) => (
					<React.Fragment key={addressToString(address.address)}>
						<div className={st.title}>
							<SVG alt="" src={circle} className={st.icon} />
							<span>{addressToString(address.address)}</span>
						</div>
						<Scroller sessions={address.sessions} onSessionClick={onSessionClick} quantity={14} />
					</React.Fragment>
				))}
		</div>
	);
};

export default Offline;
