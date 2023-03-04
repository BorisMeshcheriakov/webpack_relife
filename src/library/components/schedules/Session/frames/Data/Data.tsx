import React from 'react';

import { modes, Statuses } from 'library/helpers/schedules';
import { CoachAvailablePeriods, OriginSchedule } from 'library/models/schedules';
import { Calendar, ModeCode } from 'library/types/schedules';

import { Icon } from 'library/components/schedules';
import { useAppSelector } from 'library/hooks/common';
import { selectAddresses } from 'library/redux/schedules';

type Props = {
	calendar: Calendar;
	status: Statuses;
	mode: ModeCode;
	busy?: OriginSchedule;
	consultation?: CoachAvailablePeriods;
	mock?: CoachAvailablePeriods;
};

const Data: React.FC<Props> = ({ calendar, status, mode, busy, consultation, mock }) => {
	const addressList = useAppSelector(selectAddresses);

	const isActive = (code: ModeCode) => {
		return (
			code === mode &&
			calendar === 'editor' &&
			status !== Statuses.busy &&
			status !== Statuses.unconfirmed
		);
	};

	const addressNumber = (id: number) => {
		const idx = addressList.findIndex((address) => address.id === id);
		return idx === -1 ? null : idx + 1;
	};

	const getIcons = () => {
		let codes: ModeCode[] = [];

		switch (status) {
			case Statuses.busy:
			case Statuses.unconfirmed:
				codes = [busy!.type];
				break;
			case Statuses.update:
			case Statuses.create:
			case Statuses.remove:
				codes = mock!.status;
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
					<Icon src={icon} isActive={isActive(code)} isRemove={status === Statuses.remove} />
					{code === 'OF' && consultation && consultation.address.length > 0 && (
						<span style={{ color: isActive(code) ? '#4198c5' : '#616f82' }}>
							{addressNumber(consultation?.address[0].id)}
						</span>
					)}
				</React.Fragment>
			);
		});
	};

	return <>{status !== Statuses.empty && <>{getIcons()}</>}</>;
};

export default Data;
