import React from 'react';
import { CoachAvailablePeriods, OriginSchedule } from 'library/models/schedules';
import { Statuses, Part, Overlap, modes } from 'library/helpers/schedules';
import { ModeCode } from 'library/types/schedules';

import { Icon } from './frames';

import { getCurrentAge, getFullName } from 'library/helpers/user';
import { useAppSelector } from 'library/hooks/common';
import { selectAddresses } from 'library/redux/schedules';

import st from './Data.module.scss';

type Props = {
	consultation?: CoachAvailablePeriods;
	busy?: OriginSchedule;
	part: Part;
	overlap: Overlap;
	status: Statuses;
};

const Data: React.FC<Props> = ({ consultation, busy, part, overlap, status }) => {
	const addressList = useAppSelector(selectAddresses);

	const addressNumber = (id: number) => {
		const idx = addressList.findIndex((address) => address.id === id);
		return idx === -1 ? null : idx + 1;
	};

	const showData = () => {
		return part === Part.start || overlap === Overlap.top || part === Part.single;
	};

	const getIcons = () => {
		let codes: ModeCode[] = [];

		switch (status) {
			case Statuses.busy:
			case Statuses.unconfirmed:
				codes = [busy!.type];
				break;
			case Statuses.open:
				codes = consultation!.status;
				break;
			default:
				break;
		}

		return codes.map((code) => {
			const icon = modes[code].icon;
			return (
				<React.Fragment key={code}>
					<Icon key={code} src={icon} />
					{consultation && code === 'OF' && consultation.address.length > 0 && (
						<span>{addressNumber(consultation?.address[0].id)}</span>
					)}
				</React.Fragment>
			);
		});
	};

	const busyStatus = (busy: OriginSchedule) => {
		const { consultation_cancelled } = busy;
		return consultation_cancelled ? 'Консультация отменена' : 'Запись не подтверждена';
	};

	return (
		<div className={st.data}>
			{showData() && (
				<>
					<div className={st.data__icon}>{getIcons()}</div>
					{busy && (
						<>
							<div className={st.data__name}>{getFullName(busy.user)}, </div>
							<div className={st.data__age}>{getCurrentAge(busy.user.birth_date)}</div>
							{status === Statuses.unconfirmed && (
								<div className={st.data__status}>{busyStatus(busy)}</div>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Data;
