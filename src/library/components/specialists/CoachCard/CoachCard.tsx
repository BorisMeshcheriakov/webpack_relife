import React from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';

import { Coach } from 'library/models/users';
import { CoachAvailablePeriods } from 'library/models/schedules';
import { ModeCode } from 'library/types/schedules';

import { modes } from 'library/helpers/schedules';

import { selectMode } from 'library/redux/specialists';

import { useAppSelector } from 'library/hooks/common';

import Avatar from './frames/Avatar';
import Tags from './frames/Tags';
import Experience from './frames/Experience';
import ButtonType from './frames/ButtonType';

import { Name, Schedule } from './frames';

import { useModuleSettings } from 'library/hooks/module';
import { ModalAssign } from 'library/components/schedules';

import st from './CoachCard.module.scss';

type Props = {
	coach: Coach;
	schedule?: CoachAvailablePeriods | null;
	inModal?: boolean;
	onScheduleClick: (schedule: CoachAvailablePeriods) => void;
};

const CoachCard: React.FC<Props> = ({ coach, inModal, schedule, onScheduleClick }) => {
	const { path, url } = useRouteMatch();
	const { push } = useHistory();
	const mode = useAppSelector(selectMode);
	const { locationRoot } = useModuleSettings();
	const [type, setType] = React.useState<ModeCode>('ON');

	const handleSwitchType = (newType: ModeCode) => {
		if (locationRoot === 'specialists') setType(newType);
	};

	React.useEffect(() => {
		setType(mode);
	}, [mode]);

	return (
		<div className={st.card}>
			<div className={st.card__avatar}>
				<Avatar image={coach.photo} />
			</div>
			<div className={st.card__info}>
				<Name
					last={coach.last_name}
					middle={coach.middle_name}
					first={coach.first_name}
					id={coach.id}
					inModal={inModal}
				/>

				<Tags tags={coach.specialization} />
				<Experience experience={coach.experience} />
				<div className={st.card__buttons}>
					{Object.keys(modes).map((key) => (
						<ButtonType
							key={key}
							type={modes[key].code}
							isActive={type === modes[key].code}
							handler={() => handleSwitchType(modes[key].code)}
							duration={coach[modes[key].coachDurationKey as keyof Coach]}
							price={coach[modes[key].coachPriceKey as keyof Coach]}
						/>
					))}
				</div>
			</div>
			<div className={st.card__schedule}>
				<Schedule coach={coach} mode={type} onScheduleClick={onScheduleClick} />
			</div>
			{schedule && (
				<Route
					path={`${path}/buy-consultation/:coachId/:scheduleId`}
					render={() => <ModalAssign close={() => push(url)} />}
				/>
			)}
		</div>
	);
};

export default CoachCard;
